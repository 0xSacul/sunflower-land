import React, { useState } from "react";

import { OBJECTS } from "../lib/objects";
import { InnerPanel, OuterPanel } from "components/ui/Panel";

interface Props {
  scene?: any;
}

export type ObjectT = {
  name: string;
  image: string;
  size: { w: number; h: number };
  x?: number;
  y?: number;
};

export const CreativiaHUD: React.FC<Props> = ({ scene }) => {
  const [designMode, setDesignMode] = useState<boolean>(false);

  if (!scene) {
    // eslint-disable-next-line no-console
    console.error("CreativiaHUD: scene is required");
    return null;
  }

  const toggleDesignMode = () => {
    setDesignMode(!designMode);
    scene.toggleDesignMode();
  };

  const handleObjectClick = (e: React.MouseEvent, object: ObjectT) => {
    if (!designMode) return;
    e.stopPropagation();
    scene.objectSelected(object);
  };

  return (
    <>
      <div className="fixed right-0 top-0 p-4">
        <button
          onClick={toggleDesignMode}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          {designMode ? "Exit Design Mode" : "Enter Design Mode"}
        </button>
      </div>

      {designMode && (
        <div className="fixed right-0 top-16 p-4">
          <OuterPanel className="flex flex-col flex-wrap gap-2">
            {OBJECTS.fences.stone.map((object) => (
              <InnerPanel
                key={object.name}
                onClick={(e) => handleObjectClick(e, object)}
                className="p-2 cursor-pointer hover:img-highlight"
              >
                <img src={object.image} alt={object.name} className="w-8 h-8" />
              </InnerPanel>
            ))}
          </OuterPanel>
        </div>
      )}
    </>
  );
};
