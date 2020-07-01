/**
 * Mobile App for the Thinger.io Internet of Things Platform
 * https://thinger.io
 * @flow
 */
import { connect } from "react-redux";
// import {useRoute} from '@react-navigation/native';
import React, { Component } from "react";
import {Text, Alert,StatusBar, Dimensions, StyleSheet,BackHandler  } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./configs/Store";
import { PersistGate } from "redux-persist/es/integration/react";
import Navigator from "./components/navigation/Navigator";
import { setOrientation } from "./actions/orientation";
import { DARK_BLUE } from "./constants/ThingerColors";
import { useRoute,SafeAreaView,withNavigation  } from "react-navigation";
import { Toast } from "react-native-redux-toast";

const { store, persistor } = configureStore();

type Props = {};
 class App extends Component<Props> {
  onChangeOrientation = (event: any) => {
    const { width, height } = event.window;
    const orientation = width > height ? "LANDSCAPE" : "PORTRAIT";
    if (store.orientation !== orientation)
      store.dispatch(setOrientation(orientation));
  };



  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // then navigate
    navigate('NewScreen');
  }
  
  handleBackButton = () => {
    // this.props.navigation.goBack()
    store.dispatch({type:'Navigation/BACK'});
    // const route = useRoute();
// alert(route.name);
    // alert(JSON.stringify(store.dispatch({type:'Navigation/BACK'})))
  //  Alert.alert(
  //      'Exit Togle App',
  //      'Exiting the Togle application?', [{
  //          text: 'Cancel',
  //          onPress:function(){ console.log('Cancel Pressed')},
  //          style: 'cancel'
  //      }, {
  //          text: 'OK',
  //          onPress: function(){ BackHandler.exitApp()}
  //      }, ], {
  //          cancelable: false
  //      }
  //   )
    return true;
  } 
  
  // componentDidMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  // }
  
  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  // }
  
  render() {
    this.onChangeOrientation({ window: Dimensions.get("window") });
    Dimensions.addEventListener("change", this.onChangeOrientation);

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaView style={styles.safeArea}>
    {/* <Text>{JSON.stringify(this.props)}</Text> */}
            <StatusBar barStyle="light-content" />
            <Navigator />
            <Toast messageStyle={{ color: "white" }} />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: DARK_BLUE
  }
});

// const mapStateToProps = state => {
//   console.log("-----------group dialog devices------------");
//   console.log(state);
//   // const { routes: tabs, index: selectedTab } = state.nav.routes[0];
//   // const currentTab = tabs[selectedTab].routeName;
//   // const isUserDevices: boolean = currentTab === "UserDevices";
//   const isUserDevices: boolean = true;

//   return {
//     state:state,
//     groupName:state.selectedGroup,
//     group:state.group.groups,
//     groupDialog:state.groupDialogControl.groupDialogControl,
//     groupDialogRemove:state.groupDialogControl.groupDialogRemove,
//     groupIndex:state.groupDialogControl.GroupDialogItemIndex,
//     ids: Object.keys(state.devices),
//     devices: isUserDevices
//       ? (Object.values(state.devices): any).filter(device =>
//           state.userDevices.includes(device.id)
//         )
//       : (Object.values(state.devices): any).filter(
//           device => !state.userDevices.includes(device.id)
//         ),
//     isUserDevices,
//     isFetching: state.login.isFetching

//   };
// };




// const mapDispatchToProps = dispatch => {
//   return {
//     removeDevice:(key)=>{
    
//       dispatch({type:"DEVICE_REMOVE_SPLICE",key:key})
//     },

//      addGroup:(group)=>{
//       dispatch(addGroup(group));
//      },
//      RemoveGroup:(ind)=>{
//   dispatch({type:"GROUP_REMOVE",remove_index:ind})
//      },
//      cancelRemoveGroup:()=>{
// dispatch({type:"GroupDialogRemoveOff"})
//      },
//       groupDialogOff:()=>{
//           dispatch(groupDialogOff("off"));
//           console.log("working..");
//       },
//     onGroupClick: group => {
//       console.log("----------group id---------------");
//       dispatch(removeAllResources());
//       dispatch(selectGroup(group));
//       dispatch(navigate("Device2step"));

//     },
//     onDeviceClick: device => {
//       console.log("----------device info---------------");
//       console.log(removeAllResources());
//       dispatch(removeAllResources());
//       console.log(selectDevice(device.id));
//       dispatch(selectDevice(device.id));
//       console.log(getResourcesFromApi(device));
//       dispatch(getResourcesFromApi(device));
//       console.log(navigate("Device"));
//       dispatch(navigate("Device"));
//     },
//     onSettingsPress: () => dispatch(navigate("Settings")),
//     onQRScannerPress: () => dispatch(navigate("Scanner")),
//     onAddDevice: (device: Device) => dispatch(addDevice(device, false)),
//     displayMessage: (message: string) =>
//       dispatch(ToastActionsCreators.displayInfo(message, 1000)),
//     displayError: (message: string) =>
//       dispatch(ToastActionsCreators.displayError(message, 1000))
//   };
// };


// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default withNavigation (App);