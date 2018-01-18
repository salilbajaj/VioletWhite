import React from "react";
var { Component } = React;
import {
  StyleSheet,
  Text,
  View,
  Button,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
  Image
} from "react-native";
import Dimensions from "Dimensions";

const devWidth = Dimensions.get("window").width;
const devHeight = Dimensions.get("window").height;
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

class FBloginView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.item;

    return (
      <Animated.View>
        <View>
          <Text>ajhvjv</Text>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({});

export default FBloginView;
