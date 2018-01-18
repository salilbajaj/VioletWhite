var React = require("react");
var ReactNative = require("react-native");
var { Component } = React;
var {
  AppRegistry,
  StyleSheet,
  Animated,
  Text,
  View,
  Image,
  TextInput,
  TabBarIOS,
  TouchableHighlight,
  TouchableOpacity,
  CameraRoll,
  NativeModules,
  ActivityIndicator,
  DeviceEventEmitter,
  ScrollView,
  FlatList
} = ReactNative;
import Dimensions from "Dimensions";
import { Navigation } from "react-native-navigation";
import EventDetails from "./EventDetails";
const devWidth = Dimensions.get("window").width;
const devHeight = Dimensions.get("window").height;
import EachEvent from "./EachEvent";
import Constants from "../common/Constants";
import MapView from "react-native-maps";
const mockData = [
  {
    id: 0,
    title: "Event1",
    image: "https://qdesq.imagekit.io/img/tr:q-10/home.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    pledged: 30000,
    completed: 95,
    createdAt: "2017-09-06T17:08:46.034Z"
  },
  {
    id: 1,
    title: "Event2",
    image: "https://qdesq.imagekit.io/img/tr:q-10/search.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    pledged: 35000,
    completed: 82,
    createdAt: "2017-09-05T17:08:46.034Z"
  },
  {
    id: 2,
    title: "Event3",
    image: "https://qdesq.imagekit.io/tr:q-10/img/screen2.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    pledged: 50000,
    completed: 65,
    createdAt: "2017-09-03T17:08:46.034Z"
  },
  {
    id: 3,
    title: "Event4",
    image: "https://qdesq.imagekit.io/tr:q-10/img/screen2.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    pledged: 80000,
    completed: 98,
    createdAt: "2017-09-01T17:08:46.034Z"
  }
];

class Events extends Component {
  static navigatorStyle = {
    navBarTranslucent: true,
    navBarTextColor: "#fff",
    navBarBackgroundColor: Constants.appColor
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "Events",
      loading: true,
      newDataReceived: false,
      refreshing: false,
      recData: [],
      page: 1,
      noMoreData: false
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.endFunction = this.endFunction.bind(this);
  }
  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
      if (event.id == "drawer-btn") {
        this.props.navigator.toggleDrawer({
          side: "left",
          animated: true
        });
      }
    }
    if (event.type == "ScreenChangedEvent" && event.id == "didAppear") {
    }
  }
  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true
      },
      () => {
        this.getFeed();
      }
    );
  };
  endFunction() {
    if (!this.state.noMoreData) {
      let page = this.state.page + 1;
      this.setState(
        {
          page: page
        },
        () => {
          this.getFeed();
        }
      );
    } else {
      this.setState({
        newDataReceived: true
      });
    }
  }
  eventPress(item) {
    this.props.navigator.showModal({
      screen: "GoVioletWhite.EventDetails",
      title: "Modal",
      passProps: { item },
      navigatorStyle: {
        navBarTranslucent: true,
        navBarTextColor: "#fff",
        navBarBackgroundColor: "violet",
        navBarHidden: true
      },
      animationType: "slide-up"
    });
  }
  _keyExtractor = (item, index) => item.id;
  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={this.eventPress.bind(this, item)}>
      <EachEvent
        item={item}
        completed={this.completed(item)}
        backers={item.backers.length}
      />
    </TouchableOpacity>
  );
  completed(item) {
    let backedAmount = 0;
    let completedEvent = 0;
    if (item.backers && item.backers.length > 0) {
      item.backers.map(backer => {
        backedAmount = backedAmount + parseInt(backer.amount);
      });
      completedEvent = backedAmount / parseInt(item.pledgedAmount) * 100;
      return Math.ceil(completedEvent);
    } else {
      return completedEvent;
    }
  }
  componentDidMount() {
    this.getFeed();
    // this.props.navigator.setButtons({
    //   leftButtons: [
    //     {
    //       id: "drawer-btn",
    //       disabled: false,
    //       icon: require("../assets/images/icon-home.png"),
    //       buttonColor: "red",
    //       buttonFontSize: 14,
    //       buttonFontWeight: "600"
    //     }
    //   ],
    //   rightButtons: []
    // });

    this.props.navigator.setStyle({
      navBarButtonColor: "white"
    });
  }

  getFeed() {
    fetch(Constants.URL.api + "events?page=" + this.state.page + "&limit=30", {
      method: "get"
    })
      .then(response => {
        if (response) {
          return response.json();
        } else {
          throw err;
        }
      })
      .then(result => {
        if (result && result.length > 0) {
          if (this.state.page == 1) {
            this.setState({
              recData: result,
              loading: false,
              refreshing: false
            });
          } else if (this.state.page > 1) {
            let newData = [...this.state.recData, ...result];
            this.setState(
              {
                recData: newData
              },
              () => {
                this.setState({
                  loading: false,
                  loadingFooter: false,
                  newDataReceived: true
                });
              }
            );
          }
        }
        if (result.length == 0 || result.length < 30) {
          this.setState({
            noMoreData: true
          });
        }
      })
      .catch(err => {});
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" animating={true} />
        </View>
      );
    }

    return (
      <ScrollView style={styles.whiteContainer}>
        <FlatList
          data={this.state.recData}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          onEndReached={this.endFunction}
          onEndReachedThreshold={0.2}
          extraData={this.state}
          initialNumToRender={12}
          ListFooterComponent={this.renderFooter}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  whiteContainer: {
    backgroundColor: "#fff",
    width: devWidth
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

Navigation.registerComponent("GoVioletWhite.Events", () => Events);
module.exports = Events;
