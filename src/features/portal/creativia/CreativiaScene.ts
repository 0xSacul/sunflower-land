import { SceneId } from "features/world/mmoMachine";
import { BaseScene } from "features/world/scenes/BaseScene";
import { NPC } from "./lib/types";
import { BumpkinContainer } from "features/world/containers/BumpkinContainer";
import { creativiaModalsManager } from "./components/ModalsManager";

// Import Maps
import map_main from "./assets/maps/main.json";
import { NPC_WEARABLES } from "lib/npcs";

/* import map_normal_1 from "./assets/maps/normal_1.json";
import map_normal_2 from "./assets/maps/normal_2.json";
import map_normal_3 from "./assets/maps/normal_3.json";
import map_normal_4 from "./assets/maps/normal_4.json"; */

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

  private debugTextPosition: Phaser.GameObjects.Text | undefined;
  private debugTextFPS: Phaser.GameObjects.Text | undefined;

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

    // DEBUG
    this.debugTextPosition = this.add.text(10, 10, "", {
      fontSize: "120px",
      fontFamily: "Press Start 2P",
      color: "#ffffff",
      backgroundColor: "#000000",
    });
    this.debugTextFPS = this.add.text(10, 30, "", {
      fontSize: "120px",
      fontFamily: "Press Start 2P",
      color: "#ffffff",
      backgroundColor: "#000000",
    });

    // Init NPCs
    this.initNPCs(CREATIVIA_NPCS);
  }

  async update() {
    super.update();

    if (this.debugTextPosition && this.currentPlayer) {
      this.debugTextPosition.setText(
        `X: ${this.currentPlayer?.x.toFixed(
          2
        )} Y: ${this.currentPlayer?.y.toFixed(2)}`
      );

      this.debugTextPosition.x = this.currentPlayer.x + 150;
      this.debugTextPosition.y = this.currentPlayer.y + 100;
    }

    if (this.debugTextFPS && this.currentPlayer) {
      this.debugTextFPS.setText(`FPS: ${this.game.loop.actualFps.toFixed(2)}`);

      this.debugTextFPS.x = this.currentPlayer.x + 90;
      this.debugTextFPS.y = this.currentPlayer.y + 100;
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
}
