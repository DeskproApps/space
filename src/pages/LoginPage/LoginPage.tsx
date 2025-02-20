import { useSetTitle, useRegisterElements } from "../../hooks";
import { useLogin } from "./hooks";
import { Login } from "../../components";
import type { FC } from "react";

const LoginPage: FC = () => {
  const { onSignIn, authUrl, isLoading, error } = useLogin();

  useSetTitle("Space");

  useRegisterElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
  });

  return (
    <Login
      error={error}
      onLogin={onSignIn}
      authUrl={authUrl}
      isLoading={isLoading}
    />
  );
};

export { LoginPage };
