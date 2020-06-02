//@flow

import type { DeviceAction } from "../actions/device";
import type { SelectedGroupState } from "../types/State";

const initialState: SelectedGroupState = "";

export default function selectedDevice(
  state: SelectedGroupState = initialState,
  action: DeviceAction
) {
  switch (action.type) {
    case "GROUP_SELECT":
      return action.device;
     
    default:
      return state;
  }
}
