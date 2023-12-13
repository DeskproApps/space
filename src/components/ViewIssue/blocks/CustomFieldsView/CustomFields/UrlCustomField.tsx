import { P5 } from "@deskpro/deskpro-ui";
import { Link } from "@deskpro/app-sdk";
import { Overflow } from "../../../../common";
import { NoValue } from "./NoValue";
import type { FC } from "react";
import type { components } from "../../../../../services/space/schema";

type Props = components["schemas"]["UrlCFValue"];

const UrlCustomField: FC<Props> = ({ href }) => {
  if (!href) {
    return (
      <NoValue/>
    );
  }

  return (
    <Overflow as={P5}>
      <Link target="_blank" href={href}>{href}</Link>
    </Overflow>
  );
};

export { UrlCustomField };
