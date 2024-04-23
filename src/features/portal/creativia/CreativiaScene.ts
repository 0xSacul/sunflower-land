import { SceneId } from "features/world/mmoMachine";
import { BaseScene } from "features/world/scenes/BaseScene";

// Import Maps
import map_normal_1 from "assets/map/creativia/normal_1.json";
/* import map_normal_2 from "assets/map/creativia/normal_2.json";
import map_normal_3 from "assets/map/creativia/normal_3.json";
import map_normal_4 from "assets/map/creativia/normal_4.json"; */

export class CreativiaScene extends BaseScene {
  sceneId: SceneId = "creativia";

  private debugTextPosition: Phaser.GameObjects.Text | undefined;
  private debugTextFPS: Phaser.GameObjects.Text | undefined;

  constructor() {
    super({
      name: "creativia",
      map: {
        json: map_normal_1,
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
}
