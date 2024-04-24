import { Equipped } from "features/game/types/bumpkin";

export type NPCName = "Sacul" | "Bill";

// Ol Salty

export const NPC_WEARABLES: Record<NPCName, Equipped> = {
  Sacul: {
    body: "Beige Farmer Potion",
    hair: "Buzz Cut",
    pants: "Fancy Pants",
    shirt: "Fancy Top",
    tool: "Sword",
    background: "Farm Background",
    shoes: "Brown Boots",
    hat: "Halo",
  },
  Bill: {
    body: "Light Brown Farmer Potion",
    hair: "Blacksmith Hair",
    pants: "Lumberjack Overalls",
    shirt: "SFL T-Shirt",
    tool: "Hammer",
    background: "Farm Background",
    shoes: "Brown Boots",
  },
};
