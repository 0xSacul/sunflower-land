import { OFFLINE_FARM } from "features/game/lib/landData";
import { GameState } from "features/game/types/game";
import { assign, createMachine, Interpreter, State } from "xstate";
import { initPortal } from "./init";
import { CONFIG } from "lib/config";
import { Client, Room } from "colyseus.js";
import { PlazaRoomState } from "features/world/types/Room";
import { SPAWNS } from "features/world/lib/spawn";
import { decodeToken } from "features/auth/actions/login";
import { CreativiaState } from "./types";

const getJWT = () => {
  const URLCode = new URLSearchParams(window.location.search).get("jwt");
  const localStorageCode = localStorage.getItem("creativia_jwt");

  if (URLCode) {
    localStorage.setItem("creativia_jwt", URLCode);
    window.history.replaceState({}, document.title, window.location.pathname);

    return URLCode;
  } else if (localStorageCode) {
    return localStorageCode;
  } else {
    return null;
  }
};

export interface Context {
  id: number;
  jwt: string;
  state: GameState;
  creativia: CreativiaState;
  server?: Room<PlazaRoomState>;
  client?: Client;
}

export type CreativiaEvent =
  | { type: "START" }
  | { type: "BUY" }
  | { type: "RETRY" }
  | { type: "CONTINUE" }
  | { type: "VISIT" };

export type MachineState = {
  value:
    | "initialising"
    | "error"
    | "idle"
    | "ready"
    | "unauthorised"
    | "loading"
    | "buying"
    | "completed"
    | "visit";
  context: Context;
};

export type MachineInterpreter = Interpreter<
  Context,
  any,
  CreativiaEvent,
  MachineState
>;

export type CreativiaMachineState = State<
  Context,
  CreativiaEvent,
  MachineState
>;

export const creativiaMachine = createMachine({
  id: "creativiaMachine",
  initial: "initialising",
  context: {
    id: 0,
    jwt: getJWT(),
    state: CONFIG.API_URL ? undefined : OFFLINE_FARM,
    creativia: {
      id: 0,
      username: "",
      islands: [],
      friends: [],
    },
  },
  states: {
    // Initialising state
    initialising: {
      always: [
        {
          target: "unauthorised",
          cond: (context) => !!CONFIG.API_URL && !context.jwt,
        },
        {
          target: "loading",
        },
      ],
    },

    // Loading state
    loading: {
      id: "loading",
      invoke: {
        src: async (context) => {
          if (!CONFIG.API_URL || !CONFIG.ROOM_URL) {
            return OFFLINE_FARM;
          }

          const { farmId } = decodeToken(context.jwt as string);
          const { game } = await initPortal({
            portalId: CONFIG.PORTAL_APP,
            token: context.jwt as string,
          });

          const client = new Client(CONFIG.ROOM_URL);
          const server: Room<PlazaRoomState> | undefined =
            await client?.joinOrCreate<PlazaRoomState>("creativia", {
              jwt: context.jwt,
              bumpkin: game?.bumpkin,
              farmId,
              username: game?.username,
              faction: "Sunflorians",
              x: SPAWNS().creativia.default.x,
              y: SPAWNS().creativia.default.y,
              sceneId: "creativia",
              experience: game.bumpkin?.experience ?? 0,
            });

          return { game, server, farmId, client };
        },
        onDone: [
          {
            target: "ready",
            actions: assign({
              state: (_: any, event) => event.data.game,
              server: (_: any, event) => event.data.server,
              client: (_: any, event) => event.data.client,
              id: (_: any, event) => event.data.farmId,
            }),
          },
        ],
        onError: {
          target: "error",
        },
      },
    },

    // Visit a player's land
    visit: {
      id: "visit",
      invoke: {
        src: async (context) => {
          // TODO: Handle server change
        },
        onDone: [
          {
            target: "ready",
            actions: assign({
              state: (_: any, event) => event.data.game,
              server: (_: any, event) => event.data.server,
              client: (_: any, event) => event.data.client,
              id: (_: any, event) => event.data.farmId,
            }),
          },
        ],
        onError: {
          target: "error",
        },
      },
    },

    // Ready state
    ready: {
      on: {
        BUY: {
          target: "buying",
        },
      },
    },

    // Buying state
    buying: {
      on: {
        RETRY: {
          target: "loading",
        },
        CONTINUE: {
          target: "completed",
        },
      },
    },

    // Completed state
    completed: {
      on: {
        CONTINUE: {
          target: "ready",
        },
      },
    },

    // Error state
    error: {
      on: {
        RETRY: {
          target: "initialising",
        },
      },
    },

    // Unauthorised state
    unauthorised: {},
  },
});
