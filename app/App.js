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
import { registerScreens } from "./screens";
import menuIcon from "./assets/images/icon-home.png";
import Constants from './common/Constants';
var Tabs = require("./components/Tabs");
var Menu = require("./components/Menu");
var Social = require("./components/Social");
var Events = require("./components/Events");
var Menu = require("./components/Menu");
import Icon from 'react-native-vector-icons/FontAwesome';
registerScreens();

Navigation.startTabBasedApp({
  tabs: [
    {
      label: "Social", // tab label as appears under the icon in iOS (optional)
      screen: "AwesomeProject.Social", // unique ID registered with Navigation.registerScreen

      icon: require("./assets/images/icon-nav.png"),
      title: "VioletWhite", // title of the screen as appears in the nav bar (optional)
      navigatorStyle: {
        drawUnderNavBar: true,
        navBarTranslucent: true,
          navBarButtonColor:'white',


      }, // override the navigator style for the tab screen, see "Styling the navigator" below (optional),
      navigatorButtons: {} // override the nav buttons for the tab screen, see "Adding buttons to the navigator" below (optional)
    },
    {
      
      screen: "AwesomeProject.Upload", // unique ID registered with Navigation.registerScreen
      icon: require("./assets/images/plus.png"),
     
      navigatorStyle: {

        navBarHidden:true,

      }, // override the navigator style for the tab screen, see "Styling the navigator" below (optional),
      navigatorButtons: {} // override the nav buttons for the tab screen, see "Adding buttons to the navigator" below (optional)
    },
    {
      label: "Events",
      screen: "AwesomeProject.Events",
      navigatorStyle: {
        drawUnderNavBar: true,
        navBarTranslucent: true,

      },
      icon: require("./assets/images/events.png"),
      title: "VioletWhite"
    }
  ],
  tabsStyle: {
    // optional, add this if you want to style the tab bar beyond the defaults
    tabBarButtonColor: "#000", // optional, change the color of the tab icons and text (also unselected)
    tabBarSelectedButtonColor: "#fff", // optional, change the color of the selected tab icon and text (only selected)
    tabBarBackgroundColor: Constants.appColor, // optional, change the background color of the tab bar
    initialTabIndex: 0,
    tabBarTranslucent: true,
    tabBarLabelColor: "#000",
    tabBarSelectedLabelColor: "#fff",
    tabBarTextFontSize: 11
  },
  appStyle: {
    orientation: "portrait"
  },
  drawer: {
    // optional, add this if you want a side menu drawer in your app
    left: {
      // optional, define if you want a drawer from the left
      screen: "AwesomeProject.Menu", // unique ID registered with Navigation.registerScreen
      passProps: {} // simple serializable object that will pass as props to all top screens (optional)
    },
    animationType: "parallax",
    icon: require("./assets/images/icon-nav.png"),
    disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
  },
  passProps: {},
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

Navigation.registerComponent("App", () => App);
export let rootNavigator = null;
