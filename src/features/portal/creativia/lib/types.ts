import { SceneId } from "features/world/mmoMachine";
import { NPCName } from "lib/npcs";
import { BumpkinParts } from "lib/utils/tokenUriBuilder";
import { Schema, MapSchema, ArraySchema } from "@colyseus/schema";
import { Message } from "../components/Chat";
import { FactionName } from "features/game/types/game";

export type NPC = {
  x: number;
  y: number;
  direction?: "left" | "right";
  clothing?: BumpkinParts;
  onClick?: () => void;
  name: NPCName;
};

export interface InputData {
  x: number;
  y: number;
  tick: number;
  text: string;
}

export type Island = {
  name: string;
  slug: string;
  description: string;
  image: string;
  id: number;
  ownerId: number;
  objects: string[];
  visits: number;
};

export type CreativiaState = {
  id: number;
  username: string;
  islands: Island[];
  friends: string[];
};

export type OnlineIsland = {
  clients: number;
  createdAt: Date;
  locked: boolean;
  maxClients: number;
  name: string;
  private: boolean;
  processId: string;
  roomId: string;
  unListed: boolean;
  metadata: {
    ownerId: number;
    name: string;
    description: string;
  };
};

export type Player = {
  playerId: string;
  username: string;
  farmId: number;
  clothing: BumpkinParts;
  x: number;
  y: number;
  //moderation?: Moderation;
  experience: number;
  sceneId: SceneId;
  faction?: FactionName;
};

export interface CreativiaRoomState extends Schema {
  mapWidth: number;
  mapHeight: number;

  players: MapSchema<Player>;

  messages: ArraySchema<Message>;
}
