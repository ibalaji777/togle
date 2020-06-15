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
image:require('../../src/assets/group/bg.png'),
group:'living_room',
top_icon_bg_color:'green'
    },
    {
      id: "2",
      title: "BED ROOM",
image:require('../../src/assets/group/bg.png'),
group:'bed_room',
top_icon_bg_color:'lightblue'

    },
        {
      id: "2",
      title: "KIDS ROOM",
image:require('../../src/assets/group/bg.png'),
group:'kids_room',
top_icon_bg_color:'yellow'

    },

    
    {
      id: "3",
      title: "KICHEN",
image:require('../../src/assets/group/bg.png'),
group:'kitchen',
top_icon_bg_color:'red'
    },
//     {
//       id: "4",
//       title: "BOILER ROOM",
// image:require('../../assets/group/bg.png'),
// group:'boilder_room',
// top_icon_bg_color:'orange'
//     },
//     {
//       id: "5",
//       title: "GARDEN",
// image:require('../../assets/group/bg.png'),
// group:'garden',
// top_icon_bg_color:'darkgreen'
//     },
//     {
//       id: "6",
//       title: "SABOR MORENO",
// image:require('../../assets/group/bg.png')
//     },
//     {
//       id: "7",
//       title: "0 MESTRE PUB",
// image:require('../../assets/group/bg.png')
//     },
//     {
//       id: "8",
//       title: "GRILL 54 CHEF",
// image:require('../../assets/group/bg.png')
//     }
  ]
};
  

// const initialState: GroupState = initialStateTest;

export default function group(
  state: GroupState = initialState,
  action: GroupAction
) {
  switch (action.type) {
    case "GROUP_ADD":
          state.groups.push(action.new_group);
      return {
        ...state
      };
    case "GROUP_REMOVE":
   state.groups.splice(index, action.remove_index);
    return {
...state


    }

    default:
      return  { ...state };
  }
}
