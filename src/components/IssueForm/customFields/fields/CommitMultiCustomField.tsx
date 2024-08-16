import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { Select, useQueryWithClient } from "@deskpro/app-sdk";
import { getProjectsService, getCommitsService } from "../../../../services/space";
import { getOption } from "../../../../utils";
import { QueryKey } from "../../../../query";
import type { FC } from "react";
import type { CustomFieldProps } from "../../types";

const CommitMultiCustomField: FC<CustomFieldProps> = ({ field, formControl, projectId }) => {
  const { field: formControlField } = formControl;
  const [query, setQuery] = useState<string>("");
  const [searchCommit] = useDebounce(query, 1000);
  const [repo, setRepo] = useState<string>("");
  const { data: projects } = useQueryWithClient([QueryKey.PROJECTS], getProjectsService);
  const { data: commits } = useQueryWithClient(
    ["commits", projectId, repo, searchCommit],
    (client) => getCommitsService(client, projectId, repo, searchCommit),
    { enabled: Boolean(projectId) && Boolean(repo) },
  );

  const repoOptions = useMemo(() => {
    const project = (Array.isArray(projects?.data) ? projects?.data ?? [] : [])
      .find(({ id }) => id === projectId);
    const repos = project?.repos;
    return (Array.isArray(repos) ? repos : []).map(({ name }) => getOption(name, name));
  }, [projectId, projects]);

  const commitOptions = useMemo(() => {
    if (!Array.isArray(commits?.data) || !commits?.data?.length) {
      return [];
    }

    return (commits?.data || []).map(({ id: hash, message }) => {
      return getOption(`${projectId}/${repo}/${hash}`, message);
    });
  }, [projectId, repo, commits?.data]);

  return (
    <>
      <Select
        id={field.name}
        initValue={""}
        options={repoOptions}
        placeholder="Select repository"
        onChange={(value) => {
          setQuery("");
          setRepo(value as string);
        }}
      />
      <Select
        initValue={[]}
        id={field.name}
        closeOnSelect={false}
        options={commitOptions}
        placeholder="Select commits"
        onChange={formControlField.onChange}
      />
    </>
  );
};

export { CommitMultiCustomField };
