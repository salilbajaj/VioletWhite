var React = require("react");
var ReactNative = require("react-native");
var { Component } = React;
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} = ReactNative;
import { Navigation } from "react-native-navigation";
import { registerLoginScreens } from "./loginscreens";

import Constants from "./common/Constants";

var Login = require("./components/Login");
import Icon from "react-native-vector-icons/FontAwesome";
registerLoginScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: "GoVioletWhite.Login", // unique ID registered with Navigation.registerScreen
    title: "Login", // title of the screen as appears in the nav bar (optional)
    navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
  },
  passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
  animationType: "slide-down" // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

Navigation.registerComponent("AppLogin", () => AppLogin);
export let rootNavigator = null;
