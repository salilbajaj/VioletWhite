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
  TabBarIOS,
  TouchableHighlight,
  ActivityIndicator,
  Animated
} = ReactNative;
import Social from "./Social";

import Login from "./Login";
import Ideas from "./Ideas";
import menuIcon from "../assets/images/icon-nav.png";

class SideButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <View style={{ marginLeft: 5, width: 30, height: 20 }} />;
  }
}

module.exports = SideButton;
