var React = require("react");
var ReactNative = require("react-native");
var { Component } = React;
var {
  StyleSheet,
  Animated,
  Text,
  View,
  Image,
  TextInput,
  TabBarIOS,
  TouchableHighlight,
  CameraRoll,
  NativeModules,
  ActivityIndicator,
  DeviceEventEmitter,
  ScrollView
} = ReactNative;
import Dimensions from "Dimensions";
import Constants from "../common/Constants";
import { Navigation } from "react-native-navigation";
const devWidth = Dimensions.get("window").width;
const devHeight = Dimensions.get("window").height;
var Feed = require("./Feed");
var Daily = require("./Daily");
var Button = require("react-native-button");
var RNUploader = NativeModules.RNUploader;

class Contact extends Component {
  static navigatorStyle = {
    navBarTextColor: "#fff",
    navBarBackgroundColor: Constants.appColor
  };
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: "Social",
      loading: false,
      images: []
    };
  }
  componentWillMount() { }
  componentDidMount() { }
  render() {
    return (
      <ScrollView style={styles.whiteContainer}>
        <Animated.View style={styles.uploadContainer}>
          <View><Text>assadas</Text></View>
        </Animated.View>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  whiteContainer: {
    backgroundColor: "#fff",
    padding: 5,
    flex: 1
  },
  uploadContainer: {
    height: devHeight / 6,
    borderBottomWidth: 0.8,
    borderBottomColor: "#f5f5f5"
  },
  inputStyle: {
    height: 50
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    height: devHeight / 7 - 55,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: 5
  },
  uploadButtons: {
    flexGrow: 1,
    alignItems: "center",
    padding: 2
  },
  buttons: {
    alignSelf: "stretch",
    borderWidth: 1,
    padding: 7,
    alignItems: "center"
  },
  loader: {
    flex: 1,
    margin: 10,
    justifyContent: "center"
  }
});

Navigation.registerComponent("GoVioletWhite.Contact", () => Contact);
module.exports = Contact;
