//@flow

import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { PADDING } from "../../constants/ThingerStyles";
import { parseJWT } from "../../utils/jwt";
import Screen from "../containers/Screen";
import type { Dispatch } from "../../types/Dispatch";
import { addDevice } from "../../actions/device";
import { goBack } from "../../actions/nav";
import NavigationBar from "../navigation/NavigationBar";
import { RNCamera } from "react-native-camera";
import { DARK_BLUE } from "../../constants/ThingerColors";
import { ToastActionsCreators } from "react-native-redux-toast";
import type { Device } from "../../types/Device";

type Props = {
  devices: Array<string>,
  addDevice: (device: Device) => Dispatch,
  displayError: (message: string) => Dispatch
};

type State = {
  scanning: boolean
};

class QRScanner extends React.Component<Props, State> {
  state = {
    scanning: false
  };

  handleOnBarCodeRead(data) {
    const { devices, displayError, addDevice,group } = this.props;

    this.setState({ scanning: true });

    
    console.debug("++++++++++++++++++++++++++++++device added 1st*************************");
    console.debug(this.props)
    console.debug(group)
    console.log(group.group)
    //device already exist or not (validation)
    let  group_name=String(group.group);
    try {
      console.debug("------------------ qr data---------------")
      // console.debug(data);
      const device = parseJWT(data.data);
      //add group manually here
      const id = Object.keys(device)[0];
      if (devices.includes(id)) {
        // console.debug(device)
        displayError("This device already exists");
      } else {
        console.debug("****************************device added 1st*************************");
        // console.debug(group_name)
        var keys = Object.keys( device );
      device[keys[0]]["group"]=group_name;

        addDevice(device);
      }
      setTimeout(() => this.setState({ scanning: false }), 1000);
    } catch (e) {
      console.debug("-------------qr is not a device---------------")
      console.debug(e)
      // console.debug(this.props)
       
      displayError("This QR isn't a device");
      setTimeout(() => this.setState({ scanning: false }), 1000);
    }
  }

  renderCamera() {
    return (
      <RNCamera
        style={{
          flex: 1,
          backgroundColor: "transparent"
        }}
        type={RNCamera.Constants.Type.back}
        permissionDialogTitle={"Permission to use camera"}
        permissionDialogMessage={
          "We need your permission to use your camera phone"
        }
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        onBarCodeRead={data => {
          if (!this.state.scanning) this.handleOnBarCodeRead(data);
        }}
      />
    );
  }

  render() {
    return (
      <Screen navigationBar={<NavigationBar title="QR Scanner" />}>
        {this.renderCamera()}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            padding: PADDING,
            backgroundColor: DARK_BLUE
          }}
        >
          <Text style={{ color: "white" }}>Scan your device token QR</Text>
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = state => {
  console.log("------------ from QR scanner-------------")
  console.log(state);
  return {
    devices: Object.keys(state.devices),
    group:state.selectedGroup
  };
};

const mapDispatchToProps = dispatch => {
  console.log("---------from dispatch qr scanner----------")
  return {
    addDevice: (device) => {
      console.debug("****************************device added*************************");
      // console.debug(device)
      // console.debug(typeof device)
      // console.debug(device[0])
      // console.debug(device[0].dev)
      
      // var set_group=device[keys[0]]
      // console.debug(keys[0])
      // console.debug(device[keys[0]])
      // console.log(dispatch)
  // console.debug(this.props)
      // console.debug(device[keys[0]]["group"])
      // console.debug(device[keys[0]])
      // console.debug(device[keys[0]]["group"])
      console.debug("///////////////////////////////////////////////////////////////");
    //  device[0]['group']=this.props.group.group;

      dispatch(addDevice(device, false));
      dispatch(ToastActionsCreators.displayInfo("Added!", 1000));
      return dispatch(goBack());
    },
    displayError: (message: string) =>
      dispatch(ToastActionsCreators.displayError(message, 1000))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QRScanner);
