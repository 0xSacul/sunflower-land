import { SceneId } from "features/world/mmoMachine";
import { BaseScene } from "features/world/scenes/BaseScene";
import { NPC } from "./lib/types";
import { BumpkinContainer } from "features/world/containers/BumpkinContainer";
import { creativiaModalsManager } from "./components/ModalsManager";

// Import Maps
import map_main from "./assets/maps/main.json";
import { NPC_WEARABLES } from "lib/npcs";
import { OBJECTS } from "./lib/objects";

/* import map_normal_1 from "./assets/maps/normal_1.json";
import map_normal_2 from "./assets/maps/normal_2.json";
import map_normal_3 from "./assets/maps/normal_3.json";
import map_normal_4 from "./assets/maps/normal_4.json"; */

type ObjectT = {
  name: string;
  image: string;
  size: { w: number; h: number };
  x: number;
  y: number;
};

export const CREATIVIA_NPCS: NPC[] = [
  {
    x: 232,
    y: 410,
    name: "Sacul",
  },
  {
    x: 175,
    y: 445,
    name: "Bill",
  },
];

export class CreativiaScene extends BaseScene {
  sceneId: SceneId = "creativia";

  buildGrid: Phaser.GameObjects.Grid | undefined;

  selectedObject: ObjectT | undefined;
  placedObjects: ObjectT[] = [];
  objectPreview: Phaser.GameObjects.Image | undefined;

  placeObjectListener: any;

  constructor() {
    super({
      name: "creativia",
      map: {
        json: map_main,
      },
      audio: { fx: { walk_key: "dirt_footstep" } },
    });
  }

  preload() {
    super.preload();

    if (!this.sound.get("nature_1")) {
      const nature1 = this.sound.add("nature_1");
      nature1.play({ loop: true, volume: 0.01 });
    }

    this.events.once("shutdown", () => {
      this.sound.getAllPlaying().forEach((sound) => {
        sound.destroy();
      });
    });
  }

  create() {
    this.map = this.make.tilemap({ key: "creativia" });

    super.create();

    // Init NPCs
    this.initNPCs(CREATIVIA_NPCS);

    // Preload All Objects
    this.preloadObjects();

    // Place Objects from server state
    this.mmoServer?.state.objects.forEach((object) => {
      if (!object.x || !object.y) return;

      this.placeObject(object.name, object.x, object.y);
    });

    // Create Grid
    //this.createGrid();
  }

  update() {
    //this.currentTick++;

    //this.updateOtherPlayers();
    super.update();

    // Render object below mouse
    this.renderObjectBelowMouse();

    // Listen for object placed event from server
    if (!this.placeObjectListener) {
      this.placeObjectListener = this.mmoServer.onMessage(
        "OBJECT_PLACED",
        (data) => {
          // eslint-disable-next-line no-console
          console.log("[SERVER] OBJECT_PLACED", data);
          this.placeObject(data.name, data.x, data.y);
        }
      );
    }
  }

  initNPCs(npcs: NPC[]) {
    npcs.forEach((npc) => {
      const defaultClick = () => {
        const distance = Phaser.Math.Distance.BetweenPoints(
          container,
          this.currentPlayer as BumpkinContainer
        );

        if (distance > 50) {
          container.speak("You are too far away");
          return;
        }
        creativiaModalsManager.open(npc.name);
      };

      const container = new BumpkinContainer({
        scene: this,
        x: npc.x,
        y: npc.y,
        clothing: {
          ...(npc.clothing ?? NPC_WEARABLES[npc.name]),
          updatedAt: 0,
        },
        onClick: npc.onClick ?? defaultClick,
        name: npc.name,
        direction: npc.direction ?? "right",
      });

      container.setDepth(npc.y);
      (container.body as Phaser.Physics.Arcade.Body)
        .setSize(16, 20)
        .setOffset(0, 0)
        .setImmovable(true)
        .setCollideWorldBounds(true);

      this.physics.world.enable(container);
      this.colliders?.add(container);
      this.triggerColliders?.add(container);
    });
  }

  preloadObjects() {
    OBJECTS.fences.stone.forEach((object) => {
      this.load.image(object.name, object.image);
    });
  }

  renderObjectBelowMouse() {
    if (this.buildGrid && this.selectedObject) {
      const activePointer = this.input.activePointer;
      const { x, y } = this.getGrideTilePosition(
        activePointer.worldX,
        activePointer.worldY
      );

      const objectX = x * 16 + 8;
      const objectY = y * 16 + 8;

      const objectExists = this.placedObjects.find(
        (o) => o.x === x && o.y === y
      );

      // If the object is not placed in the same position, update the object position
      if (!objectExists) {
        if (this.objectPreview) {
          this.objectPreview.destroy();
        }

        this.objectPreview = this.add
          .image(objectX, objectY, this.selectedObject.name)
          .setDepth(999);
      } else {
        // If the object is already placed in the same position, destroy the object preview
        this.objectPreview?.destroy();
        this.objectPreview = undefined;
      }
    }
  }

  placeObject(object: string, x: number, y: number) {
    const objectData = OBJECTS.fences.stone.find((o) => o.name === object);

    if (!objectData) {
      // eslint-disable-next-line no-console
      console.error(`Object ${object} not found`);
      return;
    }

    if (this.placedObjects.find((o) => o.x === x && o.y === y)) {
      // eslint-disable-next-line no-console
      console.error(`Object already placed at x: ${x}, y: ${y}`);
      return;
    }

    this.placedObjects.push({ ...objectData, x, y });
    // eslint-disable-next-line no-console
    console.log(`Placing Object: ${object} at x: ${x}, y: ${y}`);

    // Calculate the object position based on the cell position and place the object
    const objectX = x * 16 + 8; // 16 is the tile width and 8 is half of it to center the object
    const objectY = y * 16 + 8; // same as above are you still reading this?
    const Object = this.add.image(objectX, objectY, object).setDepth(y * 16);

    // Some harry potter magic to make the object collidable
    this.physics.add.existing(
      this.add.image(objectX, objectY, object).setDepth(y * 16)
    );

    // Prevent player from walking through the object
    if (this.currentPlayer) {
      this.physics.add.collider(this.currentPlayer, Object);
      this.colliders?.add(Object);
    }

    // Destroy the object preview
    this.objectPreview?.destroy();
    this.objectPreview = undefined;

    // Send to server for live update
    this.mmoServer?.send("OBJECT_PLACED", { ...objectData, x, y });
  }

  getGrideTilePosition(x: number, y: number) {
    const tileWidth = 16;
    const tileHeight = 16;

    const cellX = Math.floor(x / tileWidth);
    const cellY = Math.floor(y / tileHeight);

    return { x: cellX, y: cellY };
  }

  createGrid() {
    const tileWidth = 16;
    const tileHeight = 16;
    const mapWidth = this.map.widthInPixels;
    const mapHeight = this.map.heightInPixels;

    this.buildGrid = this.add.grid(
      mapWidth / 2,
      mapHeight / 2,
      mapWidth,
      mapHeight,
      tileWidth,
      tileHeight,
      0x000000,
      0,
      0x000000,
      0.1
    );

    this.buildGrid.setOrigin(0.5, 0.5);
    this.buildGrid.setDepth(1000);
    this.buildGrid.setInteractive();

    this.buildGrid.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (this.selectedObject) {
        const { x, y } = this.getGrideTilePosition(
          pointer.worldX,
          pointer.worldY
        );
        this.placeObject(this.selectedObject.name, x, y);
      }
    });
  }

  destoyGrid() {
    if (this.buildGrid) {
      this.buildGrid.destroy();
      this.buildGrid = undefined;
    }
  }

  public toggleDesignMode() {
    if (this.buildGrid) {
      // eslint-disable-next-line no-console
      console.log("Destroying Grid");
      this.destoyGrid();
      this.selectedObject = undefined;
      this.objectPreview?.destroy();
      this.objectPreview = undefined;
    } else {
      // eslint-disable-next-line no-console
      console.log("Creating Grid");
      this.createGrid();
    }
  }

  public objectSelected(object: ObjectT) {
    // eslint-disable-next-line no-console
    console.log("Object Selected: ", object);
    this.selectedObject = object;
  }
}
