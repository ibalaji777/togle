//@flow

import update from "immutability-helper";
import type { GroupAction } from "../actions/group";
import type { GroupDialogState } from "../types/State";

/* For testing in simulator without Camera */
const initialState: GroupDialogState = {

    groupDialogControl:false
}

// const initialState: GroupState = initialStateTest;

export default function group(
  state: GroupDialogState = initialState,
  action: GroupAction
) {
  switch (action.type) {
    case "GroupDialogControlOn":

      return {
        ...state,groupDialogControl:true
      };
    case "GroupDialogControlOff":
    return {
...state,groupDialogControl:false


    }

    default:
      return  { ...state };
  }
}
