var buffer = require("buffer");
var React = require("react");
var ReactNative = require("react-native");
var MessageBarAlert = require("react-native-message-bar").MessageBar;
var MessageBarManager = require("react-native-message-bar").MessageBarManager;

var userInfo = null;
var { Component } = React;
var { NetInfo } = ReactNative;
import moment from "moment";
class CommonFunctions extends Component {
  constructor(props) {
    super(props);
  }
  componentWilMount() {}
  showNotification(data, cb) {
    MessageBarManager.showAlert({
      viewTopOffset: data.off ? data.off : 0,
      message: data.message,
      alertType: data.type,
      animationType: data.animationType ? data.animationType : "SlideFromTop",
      position: data.position ? data.position : "top",
      duration: 2000
    });
  }
  authSet(data, cb) {
    var b = new buffer.Buffer(data.user + ":" + data.pass);
    var encodedLogin = b.toString("base64");

    return cb(encodedLogin);
  }
}

module.exports = new CommonFunctions();
