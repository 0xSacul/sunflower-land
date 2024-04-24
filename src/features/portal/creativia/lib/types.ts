import { NPCName } from "lib/npcs";
import { BumpkinParts } from "lib/utils/tokenUriBuilder";

export type NPC = {
  x: number;
  y: number;
  direction?: "left" | "right";
  clothing?: BumpkinParts;
  onClick?: () => void;
  name: NPCName;
};

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
