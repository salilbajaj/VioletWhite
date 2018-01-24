var React = require("react");
var ReactNative = require("react-native");
var { Component } = React;
var {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TabBarIOS,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  ScrollView
} = ReactNative;
var Social = require("./Social");
var style = require("./style");
var Login = require("./Login");
var Events = require("./Events");
var Contact = require("./Contact");
import menuIcon from "../assets/images/icon-nav.png";
import Dimensions from "Dimensions";
import { Navigation } from "react-native-navigation";
import Cache from "../common/Cache";
import textLogo from "../assets/images/text-logo.png";
import Constants from "../common/Constants";
const devWidth = Dimensions.get("window").width;
const devHeight = Dimensions.get("window").height;
const menuWidth = devWidth * 2 / 3;
class Menu extends Component {
  static navigatorStyle = {
    navBarTextColor: "#fff",
    navBarBackgroundColor: Constants.appColor
  };
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  onNavigatorEvent(event) {
    if (event.type == "ScreenChangedEvent" && event.id == "didAppear") {
      this.getUserDetails();
    }
  }
  getUserDetails() {
    Cache.getUser(
      function (response) {
        if (
          response &&
          response.token &&
          response.token.length > 0 &&
          response.user.id
        ) {
          this.setState({
            userToken: response.token,
            userInfo: response.user,
            loading: false
          });
        }
      }.bind(this)
    );
  }
  componentDidMount() { }
  gotoContact() {
    //     this.props.navigator.toggleDrawer({
    //   side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
    //   animated: true, // does the toggle have transition animation or does it happen immediately (optional)
    //   to: 'Closed' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
    // });
    //    this.props.navigator.showModal({
    //   screen: "GoVioletWhite.Events", // unique ID registered with Navigation.registerScreen
    //   title: "Modal", // title of the screen as appears in the nav bar (optional)
    //   passProps: {}, // simple serializable object that will pass as props to the modal (optional)
    //   navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    //   animationType: 'none' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
    // });
  }
  gotoAbout() {
    this.props.navigator.push({
      screen: 'GoVioletWhite.About', // unique ID registered with Navigation.registerScreen
      title: 'About Us', // navigation bar title of the pushed screen (optional)

      passProps: {}, // Object that will be passed as props to the pushed screen (optional)
      animated: true, // does the push have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
      backButtonTitle: '', // override the back button title (optional)
      backButtonHidden: false, // hide the back button altogether (optional),
      backButtonColor: '#fff',
      navigatorStyle: {
        navBarBackgroundColor: Constants.appColor
      }, // override the navigator style for the pushed screen (optional)
      navigatorButtons: {}, // override the nav buttons for the pushed screen (optional)
      // enable peek and pop - commited screen will have `isPreview` prop set as true.
      previewView: undefined, // react ref or node id (optional)
      previewHeight: undefined, // set preview height, defaults to full height (optional)
      previewCommit: true, // commit to push preview controller to the navigation stack (optional)
      previewActions: [{ // action presses can be detected with the `PreviewActionPress` event on the commited screen.
        id: '', // action id (required)
        title: '', // action title (required)
        style: undefined, // 'selected' or 'destructive' (optional)
        actions: [], // list of sub-actions
      }],
    });
  }
  logout() {
    this.props.navigator.switchToTab({
      tabIndex: 0
    });
    Cache.removeUser(
      function (response) {
        if (response) {
          this.props.navigator.showModal({
            screen: "GoVioletWhite.Login", // unique ID registered with Navigation.registerScreen
            // title of the screen as appears in the nav bar (optional)
            passProps: {
              fromMenu: true
            }, // simple serializable object that will pass as props to the modal (optional)
            navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            animationType: "none" // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
          });
        }
      }.bind(this)
    );
  }
  render() {
    return (
      <View style={styles.whiteContainer}>
        <View style={styles.header}>
          <View
            style={{
              marginLeft: 10,
              marginTop: 20
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                source={{
                  uri: this.state.userInfo
                    ? this.state.userInfo.picture
                    : "https://qdesq.imagekit.io/img/tr:q-10/home.padding"
                }}
                style={styles.userImg}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10
              }}
            >
              <Text
                style={{
                  justifyContent: "center",

                  fontSize: 20,
                  fontWeight: "800"
                }}
              >
                Hi,{this.state.userInfo ? this.state.userInfo.name : "User"}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", flex: 1 }}>
          <View style={styles.eachOptionRight}>
            <TouchableOpacity
              onPress={() => {
                this.gotoContact();
              }}
            >
              <Image
                source={require("../assets/images/contact.png")}
                style={styles.menuIcon}
              />
              <Text style={styles.eachOptionText}>Contact</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.eachOptionLeft}>
            <TouchableOpacity onPress={() => {
              this.gotoAbout();
            }}>
              <Image
                source={require("../assets/images/about.png")}
                style={styles.menuIcon}
              />
              <Text style={styles.eachOptionText}>About</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.eachOptionRight}>
            <TouchableOpacity>
              <Image
                source={require("../assets/images/myevents.png")}
                style={styles.menuIcon2}
              />
              <Text style={styles.eachOptionText}>My Events</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.eachOptionLeft}>
            <TouchableOpacity onPress={this.logout.bind(this)}>
              <Image
                source={require("../assets/images/logout.png")}
                style={styles.menuIcon}
              />
              <Text style={styles.eachOptionText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  whiteContainer: {
    backgroundColor: "#fff",

    height: devHeight - 50
  },
  menuIcon: {
    width: 35,
    height: 35,
    marginBottom: 5,
    marginLeft: 10
  },
  menuIcon2: {
    width: 35,
    height: 35,
    marginBottom: 5,
    marginLeft: 20
  },
  loader: {
    flex: 1,
    margin: 10,
    justifyContent: "center"
  },
  userImg: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  header: {
    height: devHeight / 5
  },
  eachOptionRight: {
    width: devWidth / 2,
    height: devHeight / 6,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#f5f5f5",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1
  },
  eachOptionLeft: {
    width: devWidth / 2,
    height: devHeight / 6,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#f5f5f5",
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "rgb(0,168,251)",
    borderTopWidth: 1,
    borderColor: "#f5f5f5"
  },
  buttonText: {
    color: Constants.appColor,
    alignSelf: "center",
    fontSize: 15,
    fontWeight: "500"
  },
  eachOption2: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: 50,

    borderBottomWidth: 0.4,
    borderBottomColor: "#f5f5f5"
  },
  menuLogo: {
    width: menuWidth,
    alignSelf: "center",
    height: 35,
    marginTop: 18
  },
  uploadContainer: {
    height: devHeight / 6,
    borderBottomWidth: 0.8,
    borderBottomColor: "#f5f5f5"
  },
  eachOptionText: {
    fontWeight: "500",
    fontSize: 16,
    color: "#333"
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
Navigation.registerComponent("GoVioletWhite.Menu", () => Menu);
module.exports = Menu;
