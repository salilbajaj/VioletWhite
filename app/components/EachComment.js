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

const devWidth = Dimensions.get("window").width;
const devHeight = Dimensions.get("window").height;
var TimeAgo = require("react-native-timeago");

const EachComment = ({ comment }) => {
  return (
    <View style={styles.commentContainer}>
      <View style={{ width: devWidth / 7, alignItems: "center" }}>
        <Image
          borderRadius={15}
          source={{ uri: comment.user.picture }}
          style={styles.titleImage}
        />
      </View>
      <View style={{ width: devWidth * 6 / 7 }}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {comment.user.name}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 13 }}>{comment.text}</Text>
        </View>
        <View>
          <TimeAgo style={styles.timeStyle} time={comment.user.createdAt} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    paddingTop: 10,
    width: devWidth,
    flexDirection: "row",
    paddingBottom: 20,
    minHeight: 70
  },
  titleImage: {
    width: 30,
    height: 30
  },
  timeStyle: {
    color: "#D3D3D3",
    marginTop: 2,
    fontSize: 12
  }
});

export default EachComment;
