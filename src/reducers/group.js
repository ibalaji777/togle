//@flow

import update from "immutability-helper";
import type { GroupAction } from "../actions/group";
import type { GroupState } from "../types/State";

/* For testing in simulator without Camera */
const initialState: GroupState = {
  groups: [
    {
      id: "1",
      title: "LIVING ROOM",
image:require('../../src/assets/group/other.jpg'),
group:'living_room',
top_icon_bg_color:'green'
    },
    {
      id: "2",
      title: "BED ROOM 1",
image:require('../../src/assets/group/bed.jpg'),
group:'bed_room',
top_icon_bg_color:'lightblue'

    },
        {
      id: "2",
      title: "BED ROOM 2",
image:require('../../src/assets/group/bed.jpg'),
group:'kids_room',
top_icon_bg_color:'yellow'

    },

    
    {
      id: "3",
      title: "KICHEN",
image:require('../../src/assets/group/Kitchen2.jpg'),
group:'kitchen',
top_icon_bg_color:'red'
    },
    {
      id: "4",
      title: "Balcony",
image:require('../../src/assets/group/balcony.jpg'),
group:'boilder_room',
top_icon_bg_color:'orange'
    },
  ]
};
  


export default function group(
  state: GroupState = initialState,
  action: GroupAction
) {
  switch (action.type) {
    case "GROUP_ADD":
          state.groups.push(action.new_group);
          console.log("-------group reducer-------")
          console.log(state)
          console.log(action)
      return {
        ...state
      };
    case "GROUP_REMOVE":
   state.groups.splice(action.remove_index, 1);
    return {
...state


    }

    default:
      return  state ;
  }
}
