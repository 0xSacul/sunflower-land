import React, { useContext } from "react";
import { useActor } from "@xstate/react";
import { CreativiaContext, CreativiaProvider } from "./lib/CreativiaProvider";

import { Ocean } from "features/world/ui/Ocean";
import { Modal } from "components/ui/Modal";
import { Panel } from "components/ui/Panel";
import { Button } from "components/ui/Button";
import { Label } from "components/ui/Label";
import { useAppTranslation } from "lib/i18n/useAppTranslations";
import { CreativiaContent } from "./CreativiaContent";
import { CONFIG } from "lib/config";

export const CreativiaApp: React.FC = () => {
  return (
    <CreativiaProvider>
      <Ocean>
        <Creativia />
      </Ocean>
    </CreativiaProvider>
  );
};

export const Creativia: React.FC = () => {
  const { creativiaService } = useContext(CreativiaContext);
  const [creativiaState] = useActor(creativiaService);

  const { t } = useAppTranslation();

  const authCreativia = () => {
    if (window.self !== window.top) {
      window.parent.postMessage("closePortal", "*");
    } else {
      window.location.href = `${CONFIG.PORTAL_GAME_URL}?portal=${CONFIG.PORTAL_APP}&redirect=${window.location.origin}`;
    }
  };

  return (
    <div>
      {creativiaState.matches("error") && (
        <Modal show>
          <Panel>
            <div className="p-2">
              <Label type="danger">{t("error")}</Label>
              <span className="text-sm my-2">{t("error.wentWrong")}</span>
            </div>
            <Button onClick={() => creativiaService.send("RETRY")}>
              {t("retry")}
            </Button>
          </Panel>
        </Modal>
      )}

      {creativiaState.matches("loading") && (
        <Modal show>
          <Panel>
            <span className="loading">{t("loading")}</span>
          </Panel>
        </Modal>
      )}

      {creativiaState.matches("unauthorised") && (
        <Modal show>
          <Panel>
            <div className="p-2">
              <Label type="danger">{t("error")}</Label>
              <span className="text-sm my-2">{t("session.expired")}</span>
            </div>
            <Button onClick={authCreativia}>{t("welcome.login")}</Button>
          </Panel>
        </Modal>
      )}

      {creativiaState.matches("idle") && (
        <Modal show>
          <Panel>
            <Button onClick={() => creativiaService.send("START")}>
              {t("start")}
            </Button>
          </Panel>
        </Modal>
      )}

      {creativiaState.context.state && (
        <>
          <CreativiaContent />
        </>
      )}
    </div>
  );
};
