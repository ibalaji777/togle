import { connect } from "react-redux";
import Modal from 'react-native-modal';
import {
  FlatList,
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  Clipboard,
  Text,
  TouchableWithoutFeedback ,
  TouchableOpacity,
  TextInput  
} from "react-native";
import DeviceComponent from "../devices/DeviceComponent";
import React from "react";
import { MARGIN } from "../../constants/ThingerStyles";
import Screen from "../containers/Screen";
import { navigate } from "../../actions/nav";
import { getResourcesFromApi } from "../../actions/fetch";
import { addDevice, selectDevice,selectGroup,addGroup ,groupDialogOff} from "../../actions/device";
import { removeAllResources } from "../../actions/resource";
import type { Dispatch } from "../../types/Dispatch";
import NavigationBar from "../navigation/NavigationBar";
import type { Device } from "../../types/Device";
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
import ID from "../../constants/GoogleAnalytics";
import H1Text from "../texts/H1";
import H2Text from "../texts/H2";
import { DARK_BLUE } from "../../constants/ThingerColors";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/MaterialIcons";
import { parseJWT } from "../../utils/jwt";
import { ToastActionsCreators } from "react-native-redux-toast";


class Groupdialog extends React.Component<Props,State> {
    constructor(props) {
      super(props);
      this.state={
        group_image:'',
        group_name:'',
        group_dialog:false,

randomImages:[
  {
    image:require('../../../src/assets/group/kids_room.png')
  }
  ,
  {
    image:require('../../../src/assets/group/kids_room.png')
  },
  {
    image:require('../../../src/assets/group/living_room.png')
  },
  {
    image:require('../../../src/assets/group/bedroom.png')
  }
]
      };
      // (this: any).GroupName=this.GroupName.bind(this);
      console.log("--------groupDialog constructor detailed--------")
      console.log(props);
    }

 

addGroup=()=>{


  if(this.state.group_name!=''){
let id = new Date().getUTCMilliseconds();
let title=(this.state.group_name).toUpperCase();
let group_field = (this.state.group_name).replace(/[ ]+/g, "");


let image=this.state.randomImages[Math.floor(Math.random() * 3)].image;
// let image=require('../../../src/assets/group/'+select_image[2]+'');
let color=['green','blue','yellow','red','orange','lightblue','lightgreen','aliceblue','antiquewhite','aqua','beige','bisque','blueviolet','coral','cornflowerblue'];

let checkExistorNot=obj=>obj.group==group_field;
if(!(this.props.group).some(checkExistorNot))
{
  this.props.addGroup({
    id: id,
    title: title,
  
  group:group_field,
  top_icon_bg_color:color[Math.floor(Math.random() * 15)],
  image:image
  })
  
  this.props.groupDialogOff();
}else{
  alert("group already exist")
}


  }
  else{
    alert("Name field must contain");
  }
    console.log(this.state.group_name)

    this.setState({
      group_name:'',
    })
  }
  
cancelGroup=()=>{

this.props.groupDialogOff();

  }

GroupName=(input)=>{
  this.setState({
   group_name:input
  })
  console.log(this.state.group_name)
 }
 
 render() {

 const {group}=this.props;
  return (
    <View>
      <Modal isVisible={this.props.groupDialog} >
        <View style={{ flex: 1 }}>
          {/* <Text>I am the modal content!</Text> */}

          <View style={{flex:1,justifyContent:"center"}}>
            <View style={{backgroundColor:"white",padding:10,height:200}}>
  <Text>Add New Group</Text>
            <TextInput
      style={{ height: 40}}
      onChangeText={this.GroupName}
      value={this.state.group_name}  
    />
<View style={{flex:1}}></View>
<View style={{flexDirection:'row'}}>
<View style={{flex:1 }}></View>

<TouchableOpacity 
style={{marginRight:20}}
          onPress={this.cancelGroup} 
        > 
          <Text>Cancel</Text> 
        </TouchableOpacity>
<TouchableOpacity 
          onPress={this.addGroup} 
        > 
          <Text>Add</Text> 
        </TouchableOpacity> 
        </View> 
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
 }
}

const mapStateToProps = state => {
    console.log("-----------group dialog devices------------");
    console.log(state);
    // const { routes: tabs, index: selectedTab } = state.nav.routes[0];
    // const currentTab = tabs[selectedTab].routeName;
    // const isUserDevices: boolean = currentTab === "UserDevices";
    const isUserDevices: boolean = true;
  
    return {
      group:state.group.groups,
      groupDialog:state.groupDialogControl.groupDialogControl,
      ids: Object.keys(state.devices),
      devices: isUserDevices
        ? (Object.values(state.devices): any).filter(device =>
            state.userDevices.includes(device.id)
          )
        : (Object.values(state.devices): any).filter(
            device => !state.userDevices.includes(device.id)
          ),
      isUserDevices,
      isFetching: state.login.isFetching
  
    };
  };
  
  

const mapDispatchToProps = dispatch => {
    return {

       addGroup:(group)=>{
        dispatch(addGroup(group));
       },
        groupDialogOff:()=>{
            dispatch(groupDialogOff("off"));
            console.log("working..");
        },
      onGroupClick: group => {
        console.log("----------group id---------------");
        dispatch(removeAllResources());
        dispatch(selectGroup(group));
        dispatch(navigate("Device2step"));
  
      },
      onDeviceClick: device => {
        console.log("----------device info---------------");
        console.log(removeAllResources());
        dispatch(removeAllResources());
        console.log(selectDevice(device.id));
        dispatch(selectDevice(device.id));
        console.log(getResourcesFromApi(device));
        dispatch(getResourcesFromApi(device));
        console.log(navigate("Device"));
        dispatch(navigate("Device"));
      },
      onSettingsPress: () => dispatch(navigate("Settings")),
      onQRScannerPress: () => dispatch(navigate("Scanner")),
      onAddDevice: (device: Device) => dispatch(addDevice(device, false)),
      displayMessage: (message: string) =>
        dispatch(ToastActionsCreators.displayInfo(message, 1000)),
      displayError: (message: string) =>
        dispatch(ToastActionsCreators.displayError(message, 1000))
    };
  };
  

export default connect(mapStateToProps, mapDispatchToProps)(Groupdialog);
