import React, { useState } from "react";

import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { OuterPanel } from "components/ui/Panel";
import { Button } from "components/ui/Button";
import { Label } from "components/ui/Label";

import { SUNNYSIDE } from "assets/sunnyside";
import { ISLANDS } from "../../lib/islands";
import CoinsIcon from "assets/icons/coins.webp";

interface Props {
  id: number;
  username?: string;
  onClose: () => void;
  // TODO: Add server data
}

export const BillModal: React.FC<Props> = ({ id, username, onClose }) => {
  const [tab, setTab] = useState<number>(0);

  // DEBUG
  const CoinsBalance = 10;

  const IslandsTab: React.FC = () => {
    return (
      <div className="flex flex-col gap-1 w-full h-96 overflow-y-auto scrollable">
        {ISLANDS.map((island) => {
          return (
            <OuterPanel
              key={island.slug}
              className="flex flex-col items-center"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <img
                    src={island.image}
                    alt="Island"
                    className="w-32 h-28 object-cover rounded-lg"
                  />
                  <div className="flex flex-col items-start h-fit ml-1">
                    <h2 className="flex items-center justify-between w-full mb-2">
                      {island.name}
                      <Label type="warning" icon={CoinsIcon}>
                        {island.price + " Coins"}
                      </Label>
                    </h2>
                    <p className="text-xs">{island.description}</p>
                    <div className="flex justify-between w-full mt-2">
                      <div className="flex items-center gap-2 ml-1">
                        {island.supply !== -1 && (
                          <Label
                            type="success"
                            icon={SUNNYSIDE.icons.stopwatch}
                          >
                            {island.supply + " left"}
                          </Label>
                        )}
                      </div>
                      <Button
                        onClick={() => {
                          // eslint-disable-next-line no-console
                          console.log("Buy island", island.slug);
                        }}
                        className="w-fit px-4 py-0"
                        disabled={CoinsBalance < island.price}
                      >
                        {CoinsBalance >= island.price
                          ? "Buy"
                          : "Not enough coins"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </OuterPanel>
          );
        })}
      </div>
    );
  };

  return (
    <CloseButtonPanel
      onClose={onClose}
      currentTab={tab}
      setCurrentTab={setTab}
      tabs={[
        {
          icon: SUNNYSIDE.tools.gold_pickaxe,
          name: "Islands",
        },
        {
          icon: SUNNYSIDE.icons.search,
          name: "Browse",
        },
      ]}
    >
      {tab === 0 && <IslandsTab />}
    </CloseButtonPanel>
  );
};
