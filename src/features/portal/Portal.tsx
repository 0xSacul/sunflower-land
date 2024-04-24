/**
 * Entry Point to Portal App
 * Include any initialisation logic, stylesheets + more here.
 */
import React from "react";
import "src/styles.css";

import { initialise } from "lib/utils/init";
import { CreativiaApp } from "./creativia/Creativia";

initialise();

export const PortalApp: React.FC = () => {
  return <CreativiaApp />;
};
