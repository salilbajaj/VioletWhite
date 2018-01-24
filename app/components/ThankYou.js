import React from "react";
import {
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
import Constants from "../common/Constants";
const devWidth = Dimensions.get("window").width;
const devHeight = Dimensions.get("window").height;
const tileHeight = devHeight / 2;

class ThankYou extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.smallConts1}>
          <Image
            style={styles.thanksImage}
            source={require("../assets/images/thanks.png")}
          />
        </View>
        <View style={styles.smallConts}>
          <Text style={{ fontSize: 20, color: "#adadad" }}>Thank you</Text>
        </View>
        <View style={styles.smallConts}>
          <Text style={{ fontSize: 20, color: "#adadad" }}>
            we have successfully received
          </Text>
        </View>
        <View style={styles.smallConts}>
          <Text style={{ fontSize: 20, color: "#adadad" }}>
            the donation of Rs. {this.props.data.amount} for
          </Text>
        </View>
        <View style={styles.smallConts}>
          <Text style={{ fontSize: 20, color: "#adadad" }}>
            {this.props.data.description}
          </Text>
        </View>

        <View style={styles.smallConts2}>
          <TouchableOpacity
            onPress={() => {
              Navigation.dismissAllModals({
                animationType: "slide-down"
              });
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "600",
                color: Constants.appColor
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  smallConts: {
    justifyContent: "center",
    alignItems: "center"
  },
  smallConts1: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15
  },
  smallConts2: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  thanksImage: {
    height: 100,
    width: 100
  },
  container: {
    flex: 1,
    height: devHeight,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  }
});
Navigation.registerComponent("GoVioletWhite.ThankYou", () => ThankYou);

export default ThankYou;
