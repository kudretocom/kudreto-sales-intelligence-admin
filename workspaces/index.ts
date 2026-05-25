import { kudretoWorkspace } from "./kudreto";
import { tarlabilWorkspace } from "./tarlabil";

export const workspaces = [kudretoWorkspace, tarlabilWorkspace];

export function getWorkspace(id: string) {
  return workspaces.find((workspace) => workspace.id === id) ?? workspaces[0];
}

export type { ResearchSection, WorkspaceCard, WorkspaceConfig, WorkspaceFilter, WorkspaceFilters } from "./types";
