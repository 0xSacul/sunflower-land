import { NPCName } from "lib/npcs";
import { translate } from "lib/i18n/translate";

interface DeliveryNPCDialogue {
  intro: string[];
  positiveDelivery: string[];
  negativeDelivery: string[];
  noOrder: string[];
}

export const npcDialogues: Partial<Record<NPCName, DeliveryNPCDialogue>> = {
  blacksmith: {
    intro: [
      translate("npcDialogues.blacksmith.intro1"),
      translate("npcDialogues.blacksmith.intro2"),
      translate("npcDialogues.blacksmith.intro3"),
      translate("npcDialogues.blacksmith.intro4"),
    ],
    positiveDelivery: [
      translate("npcDialogues.blacksmith.positiveDelivery1"),
      translate("npcDialogues.blacksmith.positiveDelivery2"),
      translate("npcDialogues.blacksmith.positiveDelivery3"),
      translate("npcDialogues.blacksmith.positiveDelivery4"),
      translate("npcDialogues.blacksmith.positiveDelivery5"),
    ],
    negativeDelivery: [
      translate("npcDialogues.blacksmith.negativeDelivery1"),
      translate("npcDialogues.blacksmith.negativeDelivery2"),
      translate("npcDialogues.blacksmith.negativeDelivery3"),
      translate("npcDialogues.blacksmith.negativeDelivery4"),
      translate("npcDialogues.blacksmith.negativeDelivery5"),
    ],
    noOrder: [
      translate("npcDialogues.blacksmith.noOrder1"),
      translate("npcDialogues.blacksmith.noOrder2"),
    ],
  },
  betty: {
    intro: [
      translate("npcDialogues.betty.intro1"),
      translate("npcDialogues.betty.intro2"),
      translate("npcDialogues.betty.intro3"),
      translate("npcDialogues.betty.intro4"),
      translate("npcDialogues.betty.intro5"),
    ],
    positiveDelivery: [
      translate("npcDialogues.betty.positiveDelivery1"),
      translate("npcDialogues.betty.positiveDelivery2"),
      translate("npcDialogues.betty.positiveDelivery3"),
      translate("npcDialogues.betty.positiveDelivery4"),
      translate("npcDialogues.betty.positiveDelivery5"),
    ],
    negativeDelivery: [
      translate("npcDialogues.betty.negativeDelivery1"),
      translate("npcDialogues.betty.negativeDelivery2"),
      translate("npcDialogues.betty.negativeDelivery3"),
      translate("npcDialogues.betty.negativeDelivery4"),
      translate("npcDialogues.betty.negativeDelivery5"),
    ],
    noOrder: [
      translate("npcDialogues.betty.noOrder1"),
      translate("npcDialogues.betty.noOrder2"),
    ],
  },
  grimbly: {
    intro: [
      translate("npcDialogues.grimbly.intro1"),
      translate("npcDialogues.grimbly.intro2"),
      translate("npcDialogues.grimbly.intro3"),
      translate("npcDialogues.grimbly.intro4"),
    ],
    positiveDelivery: [
      translate("npcDialogues.grimbly.positiveDelivery1"),
      translate("npcDialogues.grimbly.positiveDelivery2"),
      translate("npcDialogues.grimbly.positiveDelivery3"),
      translate("npcDialogues.grimbly.positiveDelivery4"),
    ],
    negativeDelivery: [
      translate("npcDialogues.grimbly.positiveDelivery1"),
      translate("npcDialogues.grimbly.positiveDelivery2"),
      translate("npcDialogues.grimbly.positiveDelivery3"),
      translate("npcDialogues.grimbly.positiveDelivery4"),
    ],
    noOrder: [
      translate("npcDialogues.grimbly.noOrder1"),
      translate("npcDialogues.grimbly.noOrder2"),
    ],
  },
  grimtooth: {
    intro: [
      translate("npcDialogues.grimtooth.intro1"),
      translate("npcDialogues.grimtooth.intro2"),
      translate("npcDialogues.grimtooth.intro3"),
      translate("npcDialogues.grimtooth.intro4"),
    ],
    positiveDelivery: [
      translate("npcDialogues.grimtooth.positiveDelivery1"),
      translate("npcDialogues.grimtooth.positiveDelivery2"),
      translate("npcDialogues.grimtooth.positiveDelivery3"),
      translate("npcDialogues.grimtooth.positiveDelivery4"),
    ],
    negativeDelivery: [
      translate("npcDialogues.grimtooth.negativeDelivery1"),
      translate("npcDialogues.grimtooth.negativeDelivery2"),
      translate("npcDialogues.grimtooth.negativeDelivery3"),
      translate("npcDialogues.grimtooth.negativeDelivery4"),
    ],
    noOrder: [
      translate("npcDialogues.grimtooth.noOrder1"),
      translate("npcDialogues.grimtooth.noOrder2"),
    ],
  },
  // Food
  "old salty": {
    intro: [
      translate("npcDialogues.oldSalty.intro1"),
      translate("npcDialogues.oldSalty.intro2"),
      translate("npcDialogues.oldSalty.intro3"),
    ],
    positiveDelivery: [
      translate("npcDialogues.oldSalty.positiveDelivery1"),
      translate("npcDialogues.oldSalty.positiveDelivery2"),
      translate("npcDialogues.oldSalty.positiveDelivery3"),
    ],
    negativeDelivery: [
      translate("npcDialogues.oldSalty.negativeDelivery1"),
      translate("npcDialogues.oldSalty.negativeDelivery2"),
      translate("npcDialogues.oldSalty.negativeDelivery3"),
    ],
    noOrder: [
      translate("npcDialogues.oldSalty.noOrder1"),
      translate("npcDialogues.oldSalty.noOrder2"),
    ],
  },
  raven: {
    intro: [
      translate("npcDialogues.raven.intro1"),
      translate("npcDialogues.raven.intro2"),
      translate("npcDialogues.raven.intro3"),
      translate("npcDialogues.raven.intro4"),
    ],
    positiveDelivery: [
      translate("npcDialogues.raven.positiveDelivery1"),
      translate("npcDialogues.raven.positiveDelivery2"),
      translate("npcDialogues.raven.positiveDelivery3"),
      translate("npcDialogues.raven.positiveDelivery4"),
    ],
    negativeDelivery: [
      translate("npcDialogues.raven.negativeDelivery1"),
      translate("npcDialogues.raven.negativeDelivery2"),
      translate("npcDialogues.raven.negativeDelivery3"),
    ],
    noOrder: [
      translate("npcDialogues.raven.noOrder1"),
      translate("npcDialogues.raven.noOrder2"),
    ],
  },
  tywin: {
    intro: [
      translate("npcDialogues.tywin.intro1"),
      translate("npcDialogues.tywin.intro2"),
      translate("npcDialogues.tywin.intro3"),
      translate("npcDialogues.tywin.intro4"),
    ],
    positiveDelivery: [
      translate("npcDialogues.tywin.positiveDelivery1"),
      translate("npcDialogues.tywin.positiveDelivery2"),
      translate("npcDialogues.tywin.positiveDelivery3"),
      translate("npcDialogues.tywin.positiveDelivery4"),
    ],
    negativeDelivery: [
      translate("npcDialogues.tywin.negativeDelivery1"),
      translate("npcDialogues.tywin.negativeDelivery2"),
      translate("npcDialogues.tywin.negativeDelivery3"),
      translate("npcDialogues.tywin.negativeDelivery4"),
    ],
    noOrder: [
      translate("npcDialogues.tywin.noOrder1"),
      translate("npcDialogues.tywin.noOrder2"),
    ],
  },
  bert: {
    intro: [
      translate("npcDialogues.bert.intro1"),
      translate("npcDialogues.bert.intro2"),
      translate("npcDialogues.bert.intro3"),
      translate("npcDialogues.bert.intro4"),
    ],
    positiveDelivery: [
      translate("npcDialogues.bert.positiveDelivery1"),
      translate("npcDialogues.bert.positiveDelivery2"),
      translate("npcDialogues.bert.positiveDelivery3"),
      translate("npcDialogues.bert.positiveDelivery4"),
    ],
    negativeDelivery: [
      translate("npcDialogues.bert.negativeDelivery1"),
      translate("npcDialogues.bert.negativeDelivery2"),
      translate("npcDialogues.bert.negativeDelivery3"),
      translate("npcDialogues.bert.negativeDelivery4"),
    ],
    noOrder: [
      translate("npcDialogues.bert.noOrder1"),
      translate("npcDialogues.bert.noOrder2"),
    ],
  },
  timmy: {
    intro: [
      translate("npcDialogues.timmy.intro1"),
      translate("npcDialogues.timmy.intro2"),
      translate("npcDialogues.timmy.intro3"),
      translate("npcDialogues.timmy.intro4"),
      translate("npcDialogues.timmy.intro5"),
    ],
    positiveDelivery: [
      translate("npcDialogues.timmy.positiveDelivery1"),
      translate("npcDialogues.timmy.positiveDelivery2"),
      translate("npcDialogues.timmy.positiveDelivery3"),
      translate("npcDialogues.timmy.positiveDelivery4"),
      translate("npcDialogues.timmy.positiveDelivery5"),
    ],
    negativeDelivery: [
      translate("npcDialogues.timmy.negativeDelivery1"),
      translate("npcDialogues.timmy.negativeDelivery2"),
      translate("npcDialogues.timmy.negativeDelivery3"),
      translate("npcDialogues.timmy.negativeDelivery4"),
      translate("npcDialogues.timmy.negativeDelivery5"),
    ],
    noOrder: [
      translate("npcDialogues.timmy.noOrder1"),
      translate("npcDialogues.timmy.noOrder2"),
    ],
  },
  cornwell: {
    intro: [
      translate("npcDialogues.cornwell.intro1"),
      translate("npcDialogues.cornwell.intro2"),
      translate("npcDialogues.cornwell.intro3"),
      translate("npcDialogues.cornwell.intro4"),
      translate("npcDialogues.cornwell.intro5"),
    ],
    positiveDelivery: [
      translate("npcDialogues.cornwell.positiveDelivery1"),
      translate("npcDialogues.cornwell.positiveDelivery2"),
      translate("npcDialogues.cornwell.positiveDelivery3"),
      translate("npcDialogues.cornwell.positiveDelivery4"),
      translate("npcDialogues.cornwell.positiveDelivery5"),
    ],
    negativeDelivery: [
      translate("npcDialogues.cornwell.negativeDelivery1"),
      translate("npcDialogues.cornwell.negativeDelivery2"),
      translate("npcDialogues.cornwell.negativeDelivery3"),
      translate("npcDialogues.cornwell.negativeDelivery4"),
      translate("npcDialogues.cornwell.negativeDelivery5"),
    ],
    noOrder: [
      translate("npcDialogues.cornwell.noOrder1"),
      translate("npcDialogues.cornwell.noOrder2"),
      translate("npcDialogues.cornwell.noOrder3"),
      translate("npcDialogues.cornwell.noOrder4"),
    ],
  },
  "pumpkin' pete": {
    intro: [
      translate("npcDialogues.pumpkinPete.intro1"),
      translate("npcDialogues.pumpkinPete.intro2"),
      translate("npcDialogues.pumpkinPete.intro3"),
      translate("npcDialogues.pumpkinPete.intro4"),
      translate("npcDialogues.pumpkinPete.intro5"),
    ],
    positiveDelivery: [
      translate("npcDialogues.pumpkinPete.positiveDelivery1"),
      translate("npcDialogues.pumpkinPete.positiveDelivery2"),
      translate("npcDialogues.pumpkinPete.positiveDelivery3"),
      translate("npcDialogues.pumpkinPete.positiveDelivery4"),
      translate("npcDialogues.pumpkinPete.positiveDelivery5"),
    ],
    negativeDelivery: [
      translate("npcDialogues.pumpkinPete.negativeDelivery1"),
      translate("npcDialogues.pumpkinPete.negativeDelivery2"),
      translate("npcDialogues.pumpkinPete.negativeDelivery3"),
      translate("npcDialogues.pumpkinPete.negativeDelivery4"),
      translate("npcDialogues.pumpkinPete.negativeDelivery5"),
    ],
    noOrder: [
      translate("npcDialogues.pumpkinPete.noOrder1"),
      translate("npcDialogues.pumpkinPete.noOrder2"),
    ],
  },
};

export const defaultDialogue: DeliveryNPCDialogue = {
  intro: [translate("defaultDialogue.intro")],
  positiveDelivery: [translate("defaultDialogue.positiveDelivery")],
  negativeDelivery: [translate("defaultDialogue.negativeDelivery")],
  noOrder: [translate("defaultDialogue.noOrder")],
};
