import React, { useEffect, useState } from "react";

import { SpeakingModal } from "features/game/components/SpeakingModal";
import { NPCName, NPC_WEARABLES } from "lib/npcs";
import { Modal } from "components/ui/Modal";
import { SceneId } from "features/world/mmoMachine";
import { BillModal } from "./Modals/Bill";
import { Client } from "colyseus.js";

class CreativiaModalsManager {
  private listener?: (npc: NPCName, isOpen: boolean) => void;

  public open(npc: NPCName) {
    if (this.listener) {
      this.listener(npc, true);
    }
  }

  public listen(cb: (npc: NPCName, isOpen: boolean) => void) {
    this.listener = cb;
  }
}

export const creativiaModalsManager = new CreativiaModalsManager();

interface Props {
  scene: SceneId;
  id: number;
  username?: string;
  client?: Client;
}

export const CreativiaModals: React.FC<Props> = ({
  scene,
  id,
  username,
  client,
}) => {
  const [npc, setNpc] = useState<NPCName | undefined>(undefined);

  useEffect(() => {
    creativiaModalsManager.listen((npc) => {
      setNpc(npc);
    });
  }, []);

  const closeModal = () => {
    setNpc(undefined);
  };

  return (
    <>
      <Modal show={!!npc} onHide={closeModal}>
        {npc === "Sacul" && (
          <SpeakingModal
            bumpkinParts={NPC_WEARABLES.Sacul}
            onClose={closeModal}
            message={[
              {
                text: `Howdy, ${username ?? "Bumpkin"}! I'm Sacul,
                the mayor of this here town.`,
              },
              {
                text: "You probable wonderin' what's goin' on here.",
              },
              {
                text: "Well, this island is Creativia, and it's a place where you can buy an island and build your own world.",
              },
              {
                text: "You can also visit other people's islands and see what they've built.",
              },
              {
                text: "If you need any help, just ask me. But if you are ready, you should go and talk to Bill! He's the one who can help you get started.",
                actions: [
                  {
                    text: "About Creativia",
                    cb: () =>
                      window.open("https://creativia.sacul.cloud", "_blank"),
                  },
                ],
              },
            ]}
          />
        )}

        {npc === "Bill" && (
          <BillModal
            id={id}
            username={username}
            onClose={closeModal}
            client={client}
          />
        )}
      </Modal>
    </>
  );
};
