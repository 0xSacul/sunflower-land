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
}

export type CreativiaEvent =
  | { type: "START" }
  | { type: "BUY" }
  | { type: "RETRY" }
  | { type: "CONTINUE" };

export type MachineState = {
  value:
    | "initialising"
    | "error"
    | "idle"
    | "ready"
    | "unauthorised"
    | "loading"
    | "buying"
    | "completed";
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
          if (!CONFIG.API_URL) {
            return OFFLINE_FARM;
          }

          const { farmId } = decodeToken(context.jwt as string);
          const { game } = await initPortal({
            portalId: CONFIG.PORTAL_APP,
            token: context.jwt as string,
          });

          let Server: Room<PlazaRoomState> | undefined;
          const ServerURL = CONFIG.ROOM_URL;

          if (ServerURL) {
            const client = new Client(ServerURL);

            Server = await client?.joinOrCreate<PlazaRoomState>(
              "sunflorea_bliss",
              {
                jwt: context.jwt,
                bumpkin: game?.bumpkin,
                farmId,
                x: SPAWNS().creativia.default.x,
                y: SPAWNS().creativia.default.y,
                sceneId: "creativia",
                experience: game.bumpkin?.experience ?? 0,
              }
            );
          }

          return { game, Server, farmId };
        },
        onDone: [
          {
            target: "ready",
            actions: assign({
              state: (_: any, event) => event.data.game,
              server: (_: any, event) => event.data.Server,
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
