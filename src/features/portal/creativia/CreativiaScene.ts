import { SceneId } from "features/world/mmoMachine";
import { BaseScene } from "features/world/scenes/BaseScene";

// Import Maps
import map_normal_1 from "assets/map/creativia/normal_1.json";

export class CreativiaScene extends BaseScene {
  sceneId: SceneId = "creativia";

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

    // Ambience SFX
    if (!this.sound.get("nature_1")) {
      const nature1 = this.sound.add("nature_1");
      nature1.play({ loop: true, volume: 0.01 });
    }

    // Shut down the sound when the scene changes
    this.events.once("shutdown", () => {
      this.sound.getAllPlaying().forEach((sound) => {
        sound.destroy();
      });
    });
  }

  async create() {
    this.map = this.make.tilemap({
      key: "creativia",
    });

    super.create();
  }

  public update() {
    super.update();
  }
}
