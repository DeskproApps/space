import get from "lodash/get";
import { Search, Select } from "@deskpro/app-sdk";
import { getOptions } from "../../../utils";
import { Label } from "../../common";
import type { FC } from 'react';
import type { Project } from "../../../services/space/types";

export type Props = {
  isLoading: boolean,
  projects: Project[],
  onChangeSearchQuery: (search: string) => void,
  onChangeProject: (projectId: Project["id"]) => void,
};

const Filters: FC<Props> = ({
  projects,
  isLoading,
  onChangeProject,
  onChangeSearchQuery,
}) => {
  return (
    <>
      <Search
        isFetching={isLoading}
        onChange={onChangeSearchQuery}
      />
      <Label label="Project" required>
        <Select<Project["id"]>
          initValue={get(projects, [0, "id"], "") || ""}
          options={getOptions(projects)}
          onChange={onChangeProject as () => void}
        />
      </Label>
    </>
  );
};

export { Filters };
