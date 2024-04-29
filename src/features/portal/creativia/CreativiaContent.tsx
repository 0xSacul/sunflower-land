import React, { useContext, useEffect, useRef, useState } from "react";

import { Game, AUTO } from "phaser";
import NinePatchPlugin from "phaser3-rex-plugins/plugins/ninepatch-plugin.js";
import VirtualJoystickPlugin from "phaser3-rex-plugins/plugins/virtualjoystick-plugin.js";

import { Preloader } from "features/world/scenes/Preloader";
import { OFFLINE_FARM } from "features/game/lib/landData";
import { CreativiaScene } from "./CreativiaScene";
import { CreativiaModals } from "./components/ModalsManager";
import { useActor } from "@xstate/react";
import { CreativiaContext } from "./lib/CreativiaProvider";
import { Chat, Message } from "./components/Chat";
import { HudContainer } from "components/ui/HudContainer";
import { Player } from "./lib/types";

export const CreativiaContent: React.FC = () => {
  const game = useRef<Game>();
  const scene = "creativia";
  const scenes = [Preloader, CreativiaScene];

  const { creativiaService } = useContext(CreativiaContext);
  const [creativiaState] = useActor(creativiaService);

  const [messages, setMessages] = useState<Message[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

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
    game.current.registry.set("gameState", creativiaState.context.state);
    game.current.registry.set("client", creativiaState.context.client);
    game.current.registry.set("mmoServer", creativiaState.context.server);

    return () => {
      game.current?.destroy(true);
    };
  }, []);

  useEffect(() => {
    // Listen for messages
    creativiaService.state.context.server?.state.messages.onChange(() => {
      const scene = game.current?.scene.getScenes(true)[0]?.scene.key ?? "";

      const sceneMessages =
        creativiaService.state.context.server?.state.messages.filter(
          (m) => m.sceneId === scene
        ) as Message[];

      setMessages(
        sceneMessages.map((m) => ({
          id: m.id,
          username: m.username,
          faction: m.faction,
          text: m.text,
          sessionId: m.sessionId,
          sceneId: m.sceneId,
          sentAt: m.sentAt,
        }))
      );
    });

    // Listen for players updates
    creativiaService.state.context.server?.state.players.onChange(() => {
      const playersMap = creativiaService.state.context.server?.state.players;

      if (playersMap) {
        setPlayers((currentPlayers) => {
          const updatedPlayers: Player[] = [];

          playersMap.forEach((player, playerId) => {
            const existingPlayer = currentPlayers.find(
              (p) => p.playerId === playerId
            );

            if (existingPlayer) {
              updatedPlayers.push({
                ...existingPlayer,
                x: player.x,
                y: player.y,
                clothing: player.clothing,
                sceneId: player.sceneId,
              });
            } else {
              updatedPlayers.push({
                playerId,
                farmId: player.farmId,
                username: player.username,
                x: player.x,
                y: player.y,
                clothing: player.clothing,
                experience: player.experience,
                sceneId: player.sceneId,
              });
            }
          });

          // Remove players who left the server
          return updatedPlayers.filter((updatedPlayer) =>
            playersMap.has(updatedPlayer.playerId)
          );
        });
      }
    });
  }, [creativiaService.state.context.server]);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div id="game-content" ref={ref} />

      <HudContainer>
        <Chat
          id={1}
          gameState={creativiaState.context.state}
          scene={scene}
          messages={messages}
          onMessage={(text) =>
            creativiaService.state.context.server?.send(0, {
              text,
            })
          }
        />
      </HudContainer>

      <CreativiaModals
        id={1}
        scene={scene}
        username={OFFLINE_FARM.username}
        client={creativiaState.context.client}
      />
    </div>
  );
};
