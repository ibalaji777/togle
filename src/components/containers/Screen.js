//@flow

import * as React from "react";
import { StyleSheet, View,Text } from "react-native";
import NavigationBar from "../navigation/NavigationBar";
import TabBar from "../navigation/TabBar";
import { COLOR_BACKGROUND } from "../../constants/ThingerColors";

type Props = {
  navigationBar?: React.Element<typeof NavigationBar>,
  children: React.Node,
  tabBar?: React.Element<typeof TabBar>
};

export default class Screen extends React.Component<Props> {
  render() {
    const { navigationBar, tabBar } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {/* <Text>T</Text> */}
        {navigationBar}
        <View style={styles.container}>{this.props.children}</View>
        {tabBar}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND
  }
});
