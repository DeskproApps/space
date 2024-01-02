import { useMemo, useState, useEffect } from "react";
import get from "lodash/get";
import find from "lodash/find";
import size from "lodash/size";
import split from "lodash/split";
import { useDebounce } from "use-debounce";
import { Select, Search, useQueryWithClient } from "@deskpro/app-sdk";
import { getProjectsService, getCommitsService } from "../../../../services/space";
import { getOption } from "../../../../utils";
import { QueryKey } from "../../../../query";
import type { FC } from "react";
import type { CustomFieldProps } from "../../types";

const CommitCustomField: FC<CustomFieldProps> = ({ field, formControl, projectId }) => {
  const { field: formControlField } = formControl;
  const [, selectedRepo, selectedCommit] = split(formControlField.value, "/");
  const [query, setQuery] = useState<string>("");
  const [searchCommit] = useDebounce(query, 1000);
  const [repo, setRepo] = useState<string>(selectedRepo || "");
  const { data: projects } = useQueryWithClient([QueryKey.PROJECTS], getProjectsService);
  const { data: commits, isLoading } = useQueryWithClient(
    ["commits", projectId, repo, searchCommit],
    (client) => getCommitsService(client, projectId, repo, searchCommit),
    { enabled: Boolean(projectId) && Boolean(repo) },
  );

  const repoOptions = useMemo(() => {
    const project = find(projects?.data, { id: projectId });
    const repos = get(project, ["repos"]);
    return (Array.isArray(repos) ? repos : []).map(({ name }) => getOption(name, name));
  }, [projectId, projects]);

  const commitOptions = useMemo(() => {
    if (!Array.isArray(commits?.data) || !size(commits?.data)) {
      return [];
    }

    return (commits?.data || []).map(({ id: hash, message }) => {
      return getOption(`${projectId}/${repo}/${hash}`, message);
    });
  }, [projectId, repo, commits?.data]);

  useEffect(() => {
    const commit = find(commits?.data, { id: selectedCommit });
    setQuery(`${commit?.message || ""}`);
  }, [commits?.data, selectedCommit]);

  return (
    <>
      <Select
        id={field.name}
        initValue={repo}
        options={repoOptions}
        placeholder="Select repository"
        onChange={(value) => {
          setQuery("");
          setRepo(value as string);
        }}
      />
      <Select
        initValue={""}
        id={field.name}
        options={commitOptions}
        placeholder="Select commit"
        onChange={(value) => {
          const [, , hash] = split(`${value}`, "/");
          const commit = find(commits?.data, { id: hash });
          formControlField.onChange(value);
          setQuery(`${commit?.message}`);
        }}
      >
        <Search
          marginBottom={0}
          isFetching={isLoading && Boolean(query)}
          onChange={setQuery}
          inputProps={{
            variant: "inline",
            value: query,
            placeholder: "Search commit"
          }}
        />
      </Select>
    </>
  );
};

export { CommitCustomField };
