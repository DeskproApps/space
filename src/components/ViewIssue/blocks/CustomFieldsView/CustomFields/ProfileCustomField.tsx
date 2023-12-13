import { Member } from "@deskpro/app-sdk";
import { getFullName } from "../../../../../utils";
import { NoValue } from "./NoValue";
import type { FC } from "react";
import type { components } from "../../../../../services/space/schema";

type Props = components["schemas"]["ProfileCFValue"];

const ProfileCustomField: FC<Props> = ({ profile }) => {
  const fullName = getFullName(profile);

  return !fullName ? (<NoValue/>) : (<Member name={fullName} />);
};

export { ProfileCustomField };
