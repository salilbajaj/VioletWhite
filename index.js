// // /**
// //  * Sample React Native App
// //  * https://github.com/facebook/react-native
// //  * @flow
// //  */

// // import React, { Component } from "react";

// // import App from "./app/App";
// // import Social from "./app/components/Social";
// // export default class GoVioletWhite extends Component {
// //   render() {
// //     return <App />;
// //   }
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     backgroundColor: "#fff"
// //   },
// //   welcome: {
// //     fontSize: 20,
// //     textAlign: "center",
// //     margin: 10
// //   },
// //   instructions: {
// //     textAlign: "center",
// //     color: "#333333",
// //     marginBottom: 5
// //   }
// // });

// // AppRegistry.registerComponent("GoVioletWhite", () => GoVioletWhite);


// import App from "./app/App";




var React = require("react");
var ReactNative = require("react-native");
var { Component } = React;
var {
  StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    ActivityIndicator
} = ReactNative;
import { Navigation } from "react-native-navigation";
import { registerScreens } from "./app/screens";
import menuIcon from "./app/assets/images/icon-home.png";
import Constants from "./app/common/Constants";
var Tabs = require("./app/components/Tabs");
var Menu = require("./app/components/Menu");
var Social = require("./app/components/Social");
var Events = require("./app/components/Events");
var Menu = require("./app/components/Menu");
import Icon from "react-native-vector-icons/FontAwesome";
registerScreens();
Navigation.startTabBasedApp({
    tabs: [
        {
            label: "Social", // tab label as appears under the icon in iOS (optional)
            screen: "GoVioletWhite.Social", // unique ID registered with Navigation.registerScreen
            icon: require("./app/assets/images/home.png"),
            title: "VioletWhite", // title of the screen as appears in the nav bar (optional)
            navigatorStyle: {
                navBarTranslucent: true,
                navBarButtonColor: "white"
            }, // override the navigator style for the tab screen, see "Styling the navigator" below (optional),
            navigatorButtons: {} // override the nav buttons for the tab screen, see "Adding buttons to the navigator" below (optional)
        },
        {
            label: "Upload",
            screen: "GoVioletWhite.Upload", // unique ID registered with Navigation.registerScreen
            icon: require("./app/assets/images/plus.png"),
            navigatorStyle: {
                navBarHidden: true
            }, // override the navigator style for the tab screen, see "Styling the navigator" below (optional),
            navigatorButtons: {} // override the nav buttons for the tab screen, see "Adding buttons to the navigator" below (optional)
        },
        {
            label: "Events",
            screen: "GoVioletWhite.Events",
            navigatorStyle: {
                navBarTranslucent: true
            },
            icon: require("./app/assets/images/events.png"),
            title: "VioletWhite"
        },
        {
            label: "Profile",
            screen: "GoVioletWhite.Menu",
            navigatorStyle: {
                navBarTranslucent: true
            },
            icon: require("./app/assets/images/profile.png"),
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
