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
  //currentTick: number = 0;

  /* public get server() {
    return this.registry.get("server") as Room<CreativiaRoomState>;
  } */

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
  }

  update() {
    //this.currentTick++;

    //this.updateOtherPlayers();
    super.update();
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

  /* syncPlayers() {
    const server = this.server;
    if (!server) return;

    Object.keys(this.playerEntities).forEach((sessionId) => {
      if (
        !server.state.players.get(sessionId) ||
        server.state.players.get(sessionId)?.sceneId !== this.scene.key
      )
        this.destroyPlayer(sessionId);
      if (!this.playerEntities[sessionId]?.active)
        this.destroyPlayer(sessionId);
    });

    server.state.players.forEach((player, sessionId) => {
      if (sessionId === server.sessionId) return;

      if (player.sceneId !== this.scene.key) return;

      if (!this.playerEntities[sessionId]) {
        this.playerEntities[sessionId] = this.createPlayer({
          x: player.x,
          y: player.y,
          farmId: player.farmId,
          username: player.username,
          faction: player.faction,
          clothing: {
            updatedAt: 0,
            ...player.clothing,
          },
          isCurrentPlayer: sessionId === server.sessionId,
          experience: player.experience,
        });
      }
    });
  }

  renderPlayers() {
    const server = this.server;
    if (!server) return;

    // Render current players
    server.state.players.forEach((player, sessionId) => {
      if (sessionId === server.sessionId) return;

      const entity = this.playerEntities[sessionId];
      if (!entity?.active) return;

      if (player.x > entity.x) {
        entity.faceRight();
      } else if (player.x < entity.x) {
        entity.faceLeft();
      }

      const distance = Phaser.Math.Distance.BetweenPoints(player, entity);

      if (distance < 2) {
        entity.idle();
      } else {
        entity.walk();
      }

      entity.x = Phaser.Math.Linear(entity.x, player.x, 0.05);
      entity.y = Phaser.Math.Linear(entity.y, player.y, 0.05);

      entity.setDepth(entity.y);
    });
  }

  updateOtherPlayers() {
    const server = this.server;
    if (!server) return;

    this.syncPlayers();
    this.renderPlayers();
  } */
}
