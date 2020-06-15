
import type { Group } from "../types/group";

type ADD = { type: "GROUP_ADD", group: Group };
type REMOVE = { type: "GROUP_REMOVE", group: string };





export type GroupAction =
| ADD
| REMOVE
;
