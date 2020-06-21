
import type { Group } from "../types/group";

type ADD = { type: "GROUP_ADD", group: Group };
type REMOVE = { type: "GROUP_REMOVE", group: string };

type GroupDialogControlOn={ type:'GroupDialogControlOn'}
type GroupDialogControlOff={ type:'GroupDialogControlOff'}


export type GroupDialogControlAction=
| GroupDialogControlOn
| GroupDialogControlOff
;

export type GroupAction =
| ADD
| REMOVE
;
