var React = require("react");
var ReactNative = require("react-native");
var MessageBarAlert = require("react-native-message-bar").MessageBar;
var MessageBarManager = require("react-native-message-bar").MessageBarManager;
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
  ScrollView,
  FlatList
} = ReactNative;
import Dimensions from "Dimensions";
import { Navigation } from "react-native-navigation";
const devWidth = Dimensions.get("window").width;
const devHeight = Dimensions.get("window").height;
import Login from "./Login";
import Feed from "./Feed";

import CF from "../common/CommonFunctions";
import Cache from "../common/Cache";
import Constants from "../common/Constants";
import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import RNFS from "react-native-fs";
import * as Progress from "react-native-progress";

import FeedItem from "./FeedItem";

var YouTube = require("react-native-youtube");
var style = require("./style");
var TimeAgo = require("react-native-timeago");

var RNUploader = NativeModules.RNUploader;

class Social extends Component {
  static navigatorStyle = {
    navBarTextColor: "#fff",
    navBarBackgroundColor: Constants.appColor
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedTab: "Social",
      loading: true,
      images: [],
      loggedIn: false,
      loadingFooter: false,
      feedText: null,
      userToken: null,
      userInfo: null,
      posting: false,
      page: 1,
      status: null,
      quality: null,
      error: null,
      isPlaying: true,
      isLooping: true,
      duration: 0,
      noMoreData: false,
      currentTime: 0,
      fullscreen: false,
      modalVisible: false,
      drawer: "Closed",
      newDataReceived: false,
      refreshing: false,
      recData: [],
      eventArray: []
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.endFunction = this.endFunction.bind(this);
  }
  onNavigatorEvent(event) {
    if (event.id != "willDisappear" && event.id != "didDisappear") {
      this.state.eventArray.push(event);
    }
    this.state.eventArray.forEach((event, index) => {
      if (event.id == "didAppear") {
        if (
          !this.state.eventArray[index - 2] ||
          this.state.eventArray[index - 2].id != "bottomTabSelected"
        )
          this.getDets();
      }
    });
  }
  getDets() {
    this.getUserDetails();
    this.getFeed();
    this.setState({
      eventArray: []
    });
  }
  drawerState() {
    if (this.state.drawer == "Closed") {
      this.setState({
        drawer: "Open"
      });
      return "Open";
    }
    if (this.state.drawer == "Open") {
      this.setState({
        drawer: "Closed"
      });
      return "Closed";
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
            loggedIn: true
          });
        }
      }.bind(this)
    );
  }
  componentWillReceiveProps(newProps) {
    // console.log(newProps);
    // console.log("{{{{{{{{{{{}}}}}}}}}}}");
  }
  componentDidMount() {
    // this.getUserDetails();
    // this.getFeed();
    // this.props.navigator.setButtons({
    //   leftButtons: [
    //     {
    //       id: "drawer-btn",
    //       disabled: false,
    //       icon: require("../assets/images/icon-home.png"),
    //       buttonFontSize: 14,
    //       buttonFontWeight: "600"
    //     }
    //   ],
    //   rightButtons: []
    // });

    this.props.navigator.setStyle({
      navBarButtonColor: "white"
    });
    DeviceEventEmitter.addListener("RNUploaderProgress", data => {
      let bytesWritten = data.totalBytesWritten;
      let bytesTotal = data.totalBytesExpectedToWrite;
      let progress = data.progress;
    });

    setTimeout(
      function () {
        this.setState({ progress: this.state.progress + 0.4 * Math.random() });
      }.bind(this),
      500
    );
  }

  componentWillUnmount() {
    // Remove the alert located on this master page from the manager
  }

  startTimer() {
    this.setState({
      progress: 0
    });
    let progress = 0;
    this._interval = setInterval(() => {
      progress += 1 / 60;
      this.setState({ progress });

      this.setState({
        time: this.state.time - 1
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(this._interval);
      this.setState({
        timerStarted: false,
        time: 60
      });
    }, 61000);
  }
  openImagePicker = () => {
    // get image from image picker

    if (this.state.uploadText == "Upload") {
      ImagePicker.showImagePicker(this.options, async response => {
        this.setState({
          loading: true
        });

        if (response.didCancel) {
          return;
        } else if (response.error) {
          return;
        } else if (response.customButton) {
          return;
        }
        let { height, width, quality, format } = this.state;
        ImageResizer.createResizedImage(
          `data:image/jpeg;base64,${response.data}`,
          width,
          height,
          format,
          quality
        )
          .then(response => {
            this.setState(
              {
                gotImage: true,
                recImageUri: response,
                uploadText: "Cancel"
              },
              () => {
                this.setState({
                  loading: false
                });
              }
            );
            // response.uri is the URI of the new image that can now be displayed, uploaded...
            // response.path is the path of the new image
            // response.name is the name of the new image with the extension
            // response.size is the size of the new image
          })
          .catch(err => {
            this.setState({
              loading: false
            });
            // Oops, something went wrong. Check that the filename is correct and
            // inspect err to get more details.
          });
      });
    } else if (this.state.uploadText == "Cancel") {
      this.cancelUpload();
    }
  };
  cancelUpload() {
    this.setState(
      {
        loading: true,
        gotImage: false,
        recImageUri: null,
        uploadText: "Upload"
      },
      () => {
        this.setState({
          loading: false
        });
      }
    );
  }

  // _addImage() {
  //   const fetchParams = {
  //     first: 300,
  //   };

  //   CameraRoll.getPhotos(fetchParams).then(
  //     (data) => {
  //       console.log(data)
  //       const assets = data.edges;
  //       const index = parseInt(Math.random() * (assets.length));
  //       const randomImage = assets[index];

  //       let images = this.state.images;
  //       images.push(randomImage.node.image);
  //       console.log(images)
  //       this.setState({images: images});
  //   },
  //   (err) => {
  //     console.log(err);
  //   });
  // }

  // doUpload() {
  //   let files = [
  //     {
  //       name: 'file[]',
  //       filename: 'image1.png',
  //       filepath: 'assets-library://....',  // image from camera roll/assets library
  //       filetype: 'image/png',
  //     },
  //     {
  //       name: 'file[]',
  //       filename: 'image2.gif',
  //       filepath: "data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7",
  //       filetype: 'image/gif',
  //     },
  //   ];

  //   let opts = {
  //     url: 'http://my.server/api/upload',
  //     files: files,
  //     method: 'POST',                             // optional: POST or PUT
  //     headers: { 'Accept': 'application/json' },  // optional
  //     params: { 'user_id': 1 },                   // optional
  //   };
  //   console.log(RNUploader)
  //   RNUploader.upload( opts, (err, response) => {
  //     if( err ){
  //       console.log(err);
  //       return;
  //     }

  //     let status = response.status;
  //     let responseString = response.data;
  //     let json = JSON.parse( responseString );

  //     console.log('upload complete with status ' + status);
  //   });
  // }

  getFeed() {
    if (this.state.page == 1 && this.state.refreshing == false) {
      this.setState({
        loading: true
      });
    }

    fetch(Constants.URL.api + "feeds?page=" + this.state.page + "&limit=30", {
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
      .catch(err => { });
  }
  loginResult(result) {
    if (result) {
      // this.setState({
      //   //loggedIn: true
      // });
    }
  }
  reload() {
    this.getUserDetails();
  }

  getProgress() {
    if (this.state.progress == 0) {
      return 0;
    } else {
      this.state.progress;
    }
  }
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
  _renderItem = ({ item }) => (
    <FeedItem
      item={item}
      userToken={this.state.userToken}
      navigator={this.props.navigator}
      userInfo={this.state.userInfo}
    />
  );
  _keyExtractor = (item, index) => item.id;
  renderFooter = () => {
    if (this.state.newDataReceived) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
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
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" animating={true} />
          {this.state.posting ? (
            <Text style={{ alignSelf: "center" }}> Posting</Text>
          ) : null}
        </View>
      );
    }
    if (!this.state.loggedIn) {
      return (
        <Login
          loginResult={this.loginResult.bind(this)}
          reload={this.reload.bind(this)}
        />
      );
    } else if (this.state.loggedIn) {
      return (
        <View style={styles.whiteContainer}>
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

          <MessageBarAlert ref="alert" />
        </View>
      );
    }
  }
}

var styles = StyleSheet.create({
  whiteContainer: {
    backgroundColor: "#f5f5f5",
    flex: 1
  },
  inputStyle: {
    height: 50
  },
  inputStyle2: {
    height: 50,
    flexGrow: 7
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
  },
  titleImage: {
    width: 80,
    height: 60,
    marginTop: 5
  }
});

Navigation.registerComponent("GoVioletWhite.Social", () => Social);

module.exports = Social;
