import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { useCheckAuth } from "./hooks";
import type { FC } from "react";

const LoadingAppPage: FC = () => {
  useCheckAuth();

  useSetTitle("Space");

  return (
    <LoadingSpinner/>
  );
};

export { LoadingAppPage };
