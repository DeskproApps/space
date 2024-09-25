import { size } from "lodash-es";
import { P5, Stack } from "@deskpro/deskpro-ui";
import { Member } from "@deskpro/app-sdk";
import { getFullName } from "../../../../../utils";
import type { FC } from "react";
import type { components } from "../../../../../services/space/schema";

type Props = components["schemas"]["ProfileListCFValue"];

const ProfileMultiCustomField: FC<Props> = ({ profiles }) => {
  if (!Array.isArray(profiles) || !size(profiles)) {
    return (
      <P5>-</P5>
    );
  }

  return (
    <Stack gap={10} wrap="wrap">
      {profiles.map((profile, index) => {
        const fullName = getFullName(profile);

        return (
          <Member key={index} name={fullName} />
        );
      })}
    </Stack>
  );
};

export { ProfileMultiCustomField };
