import React, { useEffect, useRef, useState } from "react";
import { Game, AUTO } from "phaser";
import NinePatchPlugin from "phaser3-rex-plugins/plugins/ninepatch-plugin.js";
import VirtualJoystickPlugin from "phaser3-rex-plugins/plugins/virtualjoystick-plugin.js";

import { Preloader } from "features/world/scenes/Preloader";
import { OFFLINE_FARM } from "features/game/lib/landData";
import { CreativiaScene } from "./CreativiaScene";

export const Creativia: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const game = useRef<Game>();

  const scene = "creativia";
  const scenes = [Preloader, CreativiaScene];

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: AUTO,
      fps: {
        min: 30,
        target: 60,
        limit: 120,
        smoothStep: true,
      },
      backgroundColor: "#000000",
      parent: "portal-content",

      autoRound: true,
      pixelArt: true,
      plugins: {
        global: [
          {
            key: "rexNinePatchPlugin",
            plugin: NinePatchPlugin,
            start: true,
          },
          {
            key: "rexVirtualJoystick",
            plugin: VirtualJoystickPlugin,
            start: true,
          },
        ],
      },
      width: window.innerWidth,
      height: window.innerHeight,

      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
        },
      },
      scene: scenes,
      loader: {
        crossOrigin: "anonymous",
      },
      fullscreenTarget: document.getElementById("portal-content"),

      // Meta
      title: "Creativia",
      version: "0.1",
      url: "https://creativia.sunflower-land.com",
    };

    game.current = new Game({
      ...config,
      parent: "game-content",
    });

    game.current.registry.set("initialScene", scene);

    game.current.registry.set("initialScene", scene);
    game.current.registry.set("gameState", OFFLINE_FARM);

    setLoaded(true);

    return () => {
      game.current?.destroy(true);
    };
  }, []);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div id="portal-content">
      <div id="game-content" ref={ref} />
    </div>
  );
};
