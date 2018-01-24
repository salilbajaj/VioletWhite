import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Dimensions from "Dimensions";
import * as Progress from "react-native-progress";
import Constants from "../common/Constants";
const devWidth = Dimensions.get("window").width;
const devHeight = Dimensions.get("window").height;
var TimeAgo = require("react-native-timeago");
const tileHeight = devHeight / 1.8;
const EachEvent = ({ item, completed, backers }) => {
  return (
    <View style={styles.itemContainer}>
      <Image style={styles.image} source={{ uri: item.images.medium }} />
      <View style={styles.textCont}>
        <Text style={{ fontSize: 16, fontWeight: "400" }}>{item.name}</Text>
      </View>
      <View style={styles.progressCont}>
        <Progress.Bar
          progress={completed * 0.01}
          width={devWidth - 40}
          color={Constants.appColor}
          unfilledColor={"#f5f5f5"}
          height={3}
          borderWidth={0}
        />
      </View>
      <View style={styles.eventInfo}>
        <View style={styles.eachInfo}>
          <Text
            style={{
              color: Constants.appColor,
              fontSize: 16,
              alignSelf: "flex-start",
              marginLeft: 10
            }}
          >
            {completed}%
          </Text>
          <Text
            style={{
              alignSelf: "flex-start",
              marginLeft: 10,
              color: Constants.appColor
            }}
          >
            funded
          </Text>
        </View>
        <View style={styles.eachInfo}>
          <Text
            style={{
              alignSelf: "flex-start",
              color: Constants.appColor,
              fontWeight: "500"
            }}
          >
            {backers}
          </Text>
          <Text style={{ alignSelf: "flex-start" }}>
            {backers > 1 && "backers"}
            {backers < 2 && "backer"}
          </Text>
        </View>
        <View style={styles.eachInfo}>
          <Text style={{ alignSelf: "flex-start" }} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eventInfo: {
    flex: 1,
    flexDirection: "row"
  },
  eachInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1
  },
  itemContainer: {
    width: devWidth - 30,
    flex: 1,
    borderWidth: 2,
    borderColor: "#f5f5f5",
    marginBottom: 10,
    height: tileHeight,
    alignSelf: "center",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowColor: "rgba(0,0,0,.4)",
    shadowOpacity: 0.3,
    justifyContent: "flex-start"
  },
  image: {
    width: devWidth - 30,
    height: tileHeight * 2 / 3
  },
  progressCont: {
    alignItems: "center",
    marginTop: 10
  },
  textCont: {
    padding: 10
  },
  timeStyle: {}
});

export default EachEvent;
