import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator
} from "react-native";
var { Component } = React;
import Dimensions from "Dimensions";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import Constants from "../common/Constants";
import Cache from "../common/Cache";
const devWidth = Dimensions.get("window").width;

const devHeight = Dimensions.get("window").height;
const tileHeight = devHeight / 2;
import EachComment from "./EachComment";
import KeyboardAwareScrollView from "react-native-keyboard-aware-scroll-view";
import back from "../assets/images/backblack.png";
class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments.comments,
      feedId: this.props.comments.feedData.id,
      text: "",
      loading: false
    };
    this.postComment = this.postComment.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }
  componentWillMount() {
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
  }
  componentDidMount() {
    if (this.props.comments.from == "one") {
      this.nameInput.focus();
    }
  }
  onModalClose() {
    this.props.navigator.dismissModal({
      animationType: "slide-down"
    });
  }
  _keyExtractor = (comment, index) => comment._id;
  _renderItem = ({ item }) => <EachComment comment={item} />;
  postComment() {
    if (this.state.text && this.state.text != null && this.state.text != "") {
      this.setState({
        loading: true
      });
      var postData = {
        access_token: this.state.userToken,
        feedId: this.state.feedId,
        text: this.state.text
      };
      fetch(Constants.URL.api + "comments", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      })
        .then(response => {
          if (response) {
            return response.json();
          } else {
            throw err;
          }
        })
        .then(result => {
          if (result && result.text) {
            this.props.navigator.dismissModal({
              animationType: "slide-down"
            });
            this.setState({
              loading: false
            });
          }
        })
        .catch(err => {});
    }
  }
  getItemLayout = (data, index) => ({ length: 1, offset: 70 * index, index });
  render() {
    let comments = this.props.comments.comments;
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" animating={true} />
          <Text style={{ alignSelf: "center" }}> Posting</Text>
        </View>
      );
    }
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: "#fff" }}
        resetScrollToCoords={{ x: 0, y: -20 }}
        contentContainerStyle={styles.commentContainer}
        scrollEnabled={false}
      >
        <View style={styles.header}>
          <View style={[styles.headerPart, { alignItems: "flex-start" }]}>
            <TouchableOpacity
              onPress={this.onModalClose}
              style={{ width: 40, height: 40, marginLeft: 15, marginTop: 25 }}
            >
              <Image style={{ width: 20, height: 20 }} source={back} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerPart}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                marginTop: 10,
                marginLeft: 10
              }}
            >
              Comments
            </Text>
          </View>
          <View style={styles.headerPart} />
        </View>
        <View style={styles.commentsContainer}>
          <FlatList
            getItemLayout={this.getItemLayout}
            initialScrollIndex={
              this.state.comments.length ? this.state.comments.length - 1 : 0
            }
            ref="flatList"
            data={this.state.comments}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>

        <View style={styles.commentInput}>
          <View
            style={{
              flexGrow: 9,
              alignSelf: "center"
            }}
          >
            <TextInput
              ref={input => {
                this.nameInput = input;
              }}
              style={{
                width: devWidth * 8 / 10,
                fontSize: 13,
                alignSelf: "center",
                padding: 5,
                height: devHeight / 18,
                borderColor: "#adadad",
                borderWidth: 1,
                borderRadius: 15
              }}
              onChangeText={text => this.setState({ text })}
              placeholder={"Add a comment"}
              value={this.state.text}
            />
          </View>

          <View style={{ flexGrow: 1, alignSelf: "center", paddingRight: 10 }}>
            <TouchableOpacity onPress={this.postComment}>
              <Text style={{ color: "blue", fontSize: 14 }}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  commentContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  loader: {
    flex: 1,
    margin: 10,
    justifyContent: "center"
  },
  header: {
    height: devHeight / 10,
    borderBottomWidth: 1,
    borderBottomColor: "#adadad",
    flexDirection: "row",
    alignItems: "center"
  },
  commentInput: {
    borderTopWidth: 0.5,
    borderTopColor: "#adadad",
    flexDirection: "row",
    height: devHeight / 12,

    alignItems: "center"
  },
  headerPart: {
    flexGrow: 1
  },
  commentsContainer: {
    height: devHeight * 8 / 10
  },
  heading: {
    fontSize: 24,
    fontWeight: "400",
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
Navigation.registerComponent("GoVioletWhite.Comments", () => Comments);

export default Comments;
