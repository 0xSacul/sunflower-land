import Decimal from "decimal.js-light";
import {
  CHICKEN_TIME_TO_EGG,
  MUTANT_CHICKEN_BOOST_AMOUNT,
} from "features/game/lib/constants";
import { GameState, Inventory } from "features/game/types/game";
import cloneDeep from "lodash.clonedeep";

export type LandExpansionFeedChickenAction = {
  type: "chicken.fed";
  index: number;
};

type Options = {
  state: Readonly<GameState>;
  action: LandExpansionFeedChickenAction;
  createdAt?: number;
};

const makeFedAt = (inventory: Inventory, createdAt: number) => {
  if (inventory["Wrangler"]?.gt(0) && inventory["Speed Chicken"]?.gt(0)) {
    return (
      createdAt - CHICKEN_TIME_TO_EGG * (0.1 + MUTANT_CHICKEN_BOOST_AMOUNT)
    );
  }

  if (inventory["Wrangler"]?.gt(0)) {
    return createdAt - CHICKEN_TIME_TO_EGG * 0.1;
  }

  if (inventory["Speed Chicken"]?.gt(0)) {
    return createdAt - CHICKEN_TIME_TO_EGG * MUTANT_CHICKEN_BOOST_AMOUNT;
  }

  return createdAt;
};

export const getWheatRequiredToFeed = (inventory: Inventory) => {
  const hasFatChicken = inventory["Fat Chicken"]?.gt(0);
  const defaultAmount = new Decimal(1);

  if (hasFatChicken) {
    return defaultAmount.minus(defaultAmount.mul(MUTANT_CHICKEN_BOOST_AMOUNT));
  }

  return defaultAmount;
};

export function getMaxChickens(inventory: Inventory) {
  if (inventory["Chicken Coop"]) {
    return 15;
  }

  return 10;
}

export function feedChicken({
  state,
  action,
  createdAt = Date.now(),
}: Options): GameState {
  const stateCopy = cloneDeep(state);
  const { bumpkin } = stateCopy;
  const inventory = stateCopy.inventory;

  if (!bumpkin) {
    throw new Error("You do not have a Bumpkin");
  }

  const maxChickens = getMaxChickens(inventory);

  const chickens = stateCopy.chickens || {};
  const chicken = chickens[action.index];

  if (
    !chicken &&
    (!stateCopy.inventory?.Chicken ||
      stateCopy.inventory.Chicken?.lt(action.index))
  ) {
    throw new Error("This chicken does not exist");
  }

  if (action.index > maxChickens - 1) {
    throw new Error(`Cannot have more than ${maxChickens} chickens`);
  }

  const isChickenHungry =
    chicken?.fedAt && createdAt - chicken.fedAt < CHICKEN_TIME_TO_EGG;

  if (isChickenHungry) {
    throw new Error("This chicken is not hungry");
  }

  const wheatRequired = getWheatRequiredToFeed(stateCopy.inventory);

  if (!inventory.Wheat || inventory.Wheat.lt(wheatRequired)) {
    throw new Error("No wheat to feed chickens");
  }

  const currentWheat = inventory.Wheat || new Decimal(0);
  inventory.Wheat = currentWheat.minus(wheatRequired);
  chickens[action.index] = {
    fedAt: makeFedAt(stateCopy.inventory, createdAt),
    multiplier: 1,
  };

  return stateCopy;
}
