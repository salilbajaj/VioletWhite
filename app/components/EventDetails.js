import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  TouchableHighlight,
  Linking
} from "react-native";
var { Component } = React;
import Dimensions from "Dimensions";
import { Navigation } from "react-native-navigation";
import LinearGradient from "react-native-linear-gradient";
import back from "../assets/images/left-arrow.png";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Progress from "react-native-progress";
import Constants from "../common/Constants";
import TimeAgo from "react-native-timeago";
import Cache from "../common/Cache";
import getRNDraftJSBlocks from "react-native-draftjs-render";
import Moment from "moment";
import MapView from "react-native-maps";
import RazorpayCheckout from "react-native-razorpay";
import ThankYou from "./ThankYou";

const devWidth = Dimensions.get("window").width;
const devHeight = Dimensions.get("window").height;
const tileHeight = devHeight / 2;

const atomicHandler = (item: Object): any => {
  switch (item.data.type) {
    case "backstage-photo":
      return (
        <View key={item.key} style={{ flex: 1 }}>
          <Image
            style={{ width: 288, height: 161 }}
            source={{ uri: item.data.file.url }}
          />
        </View>
      );
    default:
      return null;
  }
};

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
      blocks: null,
      recData: this.props.item,
      lat: this.props.item.location.lat,
      lng: this.props.item.location.long
    };
    this.onModalClose = this.onModalClose.bind(this);
    //this.atomicHandler=this.atomicHandler.bind(this)
  }
  //     atomicHandler(item) {
  //       console.log(item, "**************")
  //     switch (item.data.type) {
  //     case 'IMAGE':
  //       return (
  //         <View key={item.key} style={{ flex: 1 }}>
  //           <Image
  //             style={{ width: 288, height: 161 }}
  //             source={{ uri: item.data.url }}
  //           />
  //         </View>
  //       );
  //     default:
  //       return null;
  //   }
  // };
  onModalClose() {
    this.props.navigator.dismissModal({
      animationType: "slide-down"
    });
  }
  completed(item) {
    Cache.getUser(
      function(response) {
        if (
          response &&
          response.token &&
          response.token.length > 0 &&
          response.user.id
        ) {
          this.setState({
            userToken: response.token,
            userInfo: response.user
          });
        }
      }.bind(this)
    );
    let params = {
      contentState: JSON.parse(item.descriptionLong),
      atomicHandler: atomicHandler
    };

    // console.log(params)
    //   console.log(params.contentState)
    //   console.log(getRNDraftJSBlocks(params))
    let blocks = getRNDraftJSBlocks(params);
    this.setState({
      blocks: blocks
    });

    let backedAmount = 0;
    let completedEvent = 0;
    if (item.backers && item.backers.length > 0) {
      item.backers.map(backer => {
        backedAmount = backedAmount + parseInt(backer.amount);
      });
      completedEvent = backedAmount / parseInt(item.pledgedAmount) * 100;
      this.setState({
        completed: Math.ceil(completedEvent)
      });
    }
  }
  componentDidMount() {
    this.completed(this.state.recData);
  }
  donationReceived(data) {
    this.props.navigator.showModal({
      screen: "GoVioletWhite.ThankYou",
      title: "Donation Received",
      passProps: { data },
      navigatorStyle: {
        navBarTranslucent: true,
        navBarTextColor: "#fff",
        navBarBackgroundColor: "violet",
        navBarHidden: true
      },
      animationType: "slide-up"
    });
  }
  _keyExtractor = (item, index) => item._id;
  _renderItem = ({ item }) => (
    <View style={styles.tile}>
      <View
        style={{ marginTop: 20, alignItems: "flex-start", paddingLeft: 20 }}
      >
        <Text style={{ color: Constants.appColor, fontSize: 20 }}>
          <Icon name="inr" size={18} color={Constants.appColor} /> {item.amount}
        </Text>
      </View>
      <View
        style={{
          marginTop: 20,
          alignItems: "flex-start",
          paddingLeft: 20,
          paddingBottom: 10
        }}
      >
        <Text>{item.description}</Text>
      </View>
      <View>
        <TouchableHighlight
          style={{
            backgroundColor: Constants.appColor,
            flex: 1,
            height: 40,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => {
            var options = {
              description: item.description,
              image: "https://i.imgur.com/3g7nmJC.png",
              currency: "INR",
              key: "rzp_test_3iHWxibF26godR",
              amount: item.amount * 100,
              name: "GoVioletWhite",
              prefill: {
                email: this.state.userInfo.email,
                name: this.state.userInfo.name
              },
              theme: { color: "#F37254" }
            };
            RazorpayCheckout.open(options)
              .then(data => {
                this.donationReceived(item);
              })
              .catch(error => {
                // handle failure
                alert("Payment Failed. Please try again.");
              });
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "400" }}>
            Donate Now
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
  getDateTime(dateTime, x) {
    if (x == "date") return Moment(dateTime).format("LL");
    else if (x == "time") return Moment(dateTime).format("LT");
  }
  render() {
    let { item } = this.props;
    return (
      <View style={{ height: devHeight }}>
        <ScrollView style={styles.container}>
          <Image style={styles.image} source={{ uri: item.images.medium }}>
            <View style={styles.backdropView}>
              <TouchableOpacity
                onPress={this.onModalClose}
                style={{
                  backgroundColor: "rgba(0,0,0,.2)",
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                  marginLeft: 10
                }}
              >
                <Image style={{ width: 20, height: 20 }} source={back} />
              </TouchableOpacity>
            </View>
          </Image>
          <View style={styles.tile}>
            <View style={styles.textCont}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 20 }}>
                {item.descriptionHeading}
              </Text>
            </View>
            <View style={{ padding: 10 }}>{this.state.blocks}</View>
            <View style={styles.progressCont}>
              <Progress.Bar
                progress={this.state.completed * 0.01}
                width={devWidth - 40}
                color={Constants.appColor}
                unfilledColor={"#adadad"}
                height={5}
                borderWidth={0}
              />
            </View>

            <View>
              <View
                style={{ marginTop: 20, alignItems: "center", paddingLeft: 20 }}
              >
                <Text
                  style={{
                    alignSelf: "flex-start",
                    color: Constants.appColor,
                    fontWeight: "500"
                  }}
                >
                  {this.state.completed}% funded
                </Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  alignItems: "flex-start",
                  paddingLeft: 20
                }}
              >
                <Text>
                  {item.backers.length} &nbsp;
                  {item.backers.length > 1 && "backers have backed the event"}
                  {item.backers.length < 2 && "backer has backed the event"}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  alignItems: "flex-start",
                  paddingLeft: 20
                }}
              >
                <Text>
                  <Icon name="inr" size={16} /> {item.pledgedAmount} to be
                  pledged.
                </Text>
              </View>

              <View
                style={{
                  marginTop: 20,
                  alignItems: "flex-start",
                  paddingLeft: 20
                }}
              >
                <Text>
                  <Icon name="inr" size={16} /> {item.goalRequirement} to start
                  the event.
                </Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  alignItems: "flex-start",
                  paddingLeft: 20
                }}
              >
                <Text>
                  At {item.location.address}, {item.location.place}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  alignItems: "flex-start",
                  paddingLeft: 20
                }}
              >
                <Text>Date: {this.getDateTime(item.time, "date")}</Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  alignItems: "flex-start",
                  paddingLeft: 20
                }}
              >
                <Text>Time: {this.getDateTime(item.time, "time")}</Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  alignItems: "flex-end",
                  paddingLeft: 20
                }}
              >
                <Text style={{ color: "#d3d3d3" }}>
                  Created <TimeAgo time={item.createdAt} />
                </Text>
              </View>
            </View>
          </View>
          {item.rewards.length > 0 && (
            <View>
              <View>
                <Text style={styles.heading}>Rewards</Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <FlatList
                  data={item.rewards}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderItem}
                />
              </View>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View>
              <Text style={styles.heading}>Location</Text>
            </View>

            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                paddingRight: 20,
                marginTop: 10
              }}
              onPress={() => {
                Linking.openURL(
                  "comgooglemaps://?daddr=" +
                    this.state.lat +
                    "," +
                    this.state.lng +
                    "&center=" +
                    this.state.lat +
                    "," +
                    this.state.lng +
                    "&zoom=14&views=traffic"
                );
              }}
            >
              <Icon
                name="location-arrow"
                size={25}
                color={Constants.appColor}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20 }}>
            <MapView
              scrollEnabled={true}
              style={{ width: devWidth, height: 170 }}
              initialRegion={{
                latitude: this.state.lat,
                longitude: this.state.lng,
                latitudeDelta: 0.0292,
                longitudeDelta: 0.0091
              }}
            >
              <MapView.Marker
                pinColor={Constants.appColor}
                coordinate={{
                  latitude: this.state.lat,
                  longitude: this.state.lng
                }}
              />
            </MapView>
          </View>
        </ScrollView>
        {/* <TouchableHighlight
          style={{
            backgroundColor: Constants.appColor,
            width: devWidth,
            height: devHeight / 11,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => {
            var options = {
              description: "Donation for the event",
              image: "https://i.imgur.com/3g7nmJC.png",
              currency: "INR",
              key: "rzp_test_3iHWxibF26godR",
              amount: "5000",
              name: "GoVioletWhite",
              prefill: {
                email: this.state.userInfo.email,
                name: this.state.userInfo.name
              },
              theme: { color: "#F37254" }
            };
            RazorpayCheckout.open(options)
              .then(data => {
                // handle success
                alert(`Success: ${data.razorpay_payment_id}`);
              })
              .catch(error => {
                // handle failure
                alert(`Error: ${error.code} | ${error.description}`);
              });
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "400" }}>
            Donate Now
          </Text>
        </TouchableHighlight> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: devHeight,
    backgroundColor: "#f5f5f5"
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    paddingLeft: 25
  },
  tile: {
    width: devWidth - 30,
    flex: 1,
    borderWidth: 2,
    borderColor: "#f5f5f5",
    marginBottom: 10,
    alignSelf: "center",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowColor: "rgba(0,0,0,.4)",
    shadowOpacity: 0.3
  },
  progressCont: {
    alignItems: "center",
    marginTop: 25
  },
  backdropView: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: devWidth,
    height: devHeight / 2
  },
  image: {
    width: devWidth,
    height: devHeight / 2
  },
  textCont: {
    width: devWidth - 30,
    alignSelf: "center",
    marginTop: 20,
    padding: 10
  },
  headline: {
    fontSize: 20,

    backgroundColor: "rgba(0,0,0,0)",
    color: "#fff",
    fontWeight: "bold"
  }
});
Navigation.registerComponent("GoVioletWhite.EventDetails", () => EventDetails);

export default EventDetails;
