
import type { Group } from "../types/group";

type ADD = { type: "GROUP_ADD", group: Group };
type REMOVE = { type: "GROUP_REMOVE", group: string };

type GroupDialogControlOn={ type:'GroupDialogControlOn'}
type GroupDialogControlOff={ type:'GroupDialogControlOff'}

type GroupDialogRemoveOn={ type:'GroupDialogRemoveOn'}
type GroupDialogRemoveOff={ type:'GroupDialogRemoveOff'}

type GroupDialogItemIndex={ type:'GroupDialogItemIndex',index:number}

export type GroupDialogControlAction=
| GroupDialogControlOn
| GroupDialogControlOff
| GroupDialogRemoveOn
| GroupDialogRemoveOff
|GroupDialogItemIndex
;

export type GroupAction =
| ADD
| REMOVE
;
