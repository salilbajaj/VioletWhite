import React from "react";
var { Component } = React;
import {
  AppRegistry,
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
import Constants from "../common/Constants";

const devWidth = Dimensions.get("window").width;
const devHeight = Dimensions.get("window").height;
import YouTube from "react-native-youtube";
import TimeAgo from "react-native-timeago";

import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

class FeedItem extends Component {
  constructor(props) {
    super(props);
    //console.log(props)
    this.state = {
      videoId: null,
      isReady: false,
      status: null,
      quality: null,
      error: null,
      isPlaying: true,
      isLooping: true,
      duration: 0,
      currentTime: 0,
      fullscreen: false,
      modalVisible: false,
      page: 1,
      liked: false,
      recData: this.props.item,
      likes: 0
    };
  }
  componentDidMount() {
    this.isLiked();
  }
  isLiked() {
    if (
      this.state.recData.reactionId &&
      this.state.recData.reactionId.length > 0
    ) {
      this.setState({
        likes: this.state.recData.reactionId.length
      });
      this.state.recData.reactionId.map(id => {
        if (id == this.props.userInfo.id) {
          this.setState({
            liked: true
          });
        }
      });
    }
  }
  imgOrVid(data) {
    if (data.type == "image") {
      return (
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.bannerText}>{data.text}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.bannerImage}
              source={{
                uri: data.image.medium
                  ? data.image.medium
                  : "https://qdesq.imagekit.io/img/tr:q-10/home.png"
              }}
            />
          </View>
        </View>
      );
    }
    if (data.type == "video") {
      this.state.videoId = data.url
        ? data.url.substring(data.url.indexOf("=") + 1)
        : "VAn8t80lclM";

      return (
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.bannerText}>{data.text}</Text>
          </View>
          <View style={styles.imageContainer}>
            <YouTube
              ref="youtubePlayer"
              videoId={this.state.videoId} // The YouTube video ID
              // A playlist's ID, overridden by `videoId`
              play={false} // control playback of video with true/false
              fullscreen={false} // control whether the video should play in fullscreen or inline
              loop={true} // control whether the video should loop when ended
              apiKey="AIzaSyAiduR0-XYfTglV7ATr9u-tFKv680mefgg"
              onReady={e => {
                this.setState({
                  isReady: true
                });
              }}
              onChangeState={e => this.setState({ status: e.state })}
              onChangeQuality={e => this.setState({ quality: e.quality })}
              onError={e => this.setState({ error: e.error })}
              onProgress={e =>
                this.setState({
                  currentTime: e.currentTime,
                  duration: e.duration
                })
              }
              showFullscreenButton={false}
              showinfo={false}
              controls={2}
              style={{
                alignSelf: "stretch",
                height: 300,
                backgroundColor: "black",
                marginVertical: 10
              }}
            />
          </View>
        </View>
      );
    }
    if (data.type == "text") {
      return (
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.bannerText}>{data.text}</Text>
          </View>
        </View>
      );
    }
  }

  likeIt() {
    if (!this.state.liked) {
      this.setState({
        liked: true,
        likes: this.state.likes + 1
      });
    } else {
      this.setState({
        liked: false,
        likes: this.state.likes - 1
      });
    }
    fetch(
      Constants.URL.api +
        "feeds/" +
        this.state.recData.id +
        "/reaction?access_token=" +
        this.props.userToken,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic " + this.props.userToken
        }
      }
    )
      .then(response => {
        if (response) {
          return response.json();
        } else {
          throw err;
        }
      })
      .then(result => {})
      .catch(err => {});
  }
  commentPressed(x) {
    if (x == "all") {
      let comments = {
        comments: this.state.recData.commentsId,
        from: "allComments",
        feedData: this.props.item
      };
      this.props.navigator.showModal({
        screen: "GoVioletWhite.Comments",
        title: "Comments",
        passProps: { comments },
        navigatorStyle: {
          navBarTranslucent: true,
          navBarTextColor: "#fff",
          navBarHidden: true
        },
        animationType: "slide-up"
      });
    } else if (x == "one") {
      let comments = {
        comments: this.state.recData.commentsId,
        from: "one",
        feedData: this.props.item
      };
      this.props.navigator.showModal({
        screen: "GoVioletWhite.Comments",
        title: "Comments",
        passProps: { comments },
        navigatorStyle: {
          navBarTranslucent: true,
          navBarTextColor: "#fff",
          navBarHidden: true
        },
        animationType: "slide-up"
      });
    }
  }
  getInitialComments() {
    if (
      this.state.recData.commentsId &&
      this.state.recData.commentsId.length > 0
    ) {
      if (this.state.recData.commentsId.length < 3) {
        return this.state.recData.commentsId.map(comment => {
          return (
            <View
              key={comment._id}
              style={{ flexDirection: "row", marginTop: 3, marginBottom: 3 }}
            >
              <View style={{ marginRight: 5 }}>
                <Text style={styles.commentUser}>{comment.user.name}</Text>
              </View>
              <View>
                <Text style={styles.comment}>{comment.text}</Text>
              </View>
            </View>
          );
        });
      } else if (this.state.recData.commentsId.length > 2) {
        return (
          <View>
            <TouchableHighlight onPress={this.commentPressed.bind(this, "all")}>
              <Text style={styles.allComment}>
                View all {this.state.recData.commentsId.length} comments
              </Text>
            </TouchableHighlight>
            <View
              style={{ flexDirection: "row", marginTop: 3, marginBottom: 3 }}
            >
              <View style={{ marginRight: 5 }}>
                <Text style={styles.commentUser}>
                  {
                    this.state.recData.commentsId[
                      this.state.recData.commentsId.length - 2
                    ].user.name
                  }
                </Text>
              </View>
              <View>
                <Text style={styles.comment}>
                  {
                    this.state.recData.commentsId[
                      this.state.recData.commentsId.length - 2
                    ].text
                  }
                </Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 3, marginBottom: 3 }}
            >
              <View style={{ marginRight: 5 }}>
                <Text style={styles.commentUser}>
                  {
                    this.state.recData.commentsId[
                      this.state.recData.commentsId.length - 1
                    ].user.name
                  }
                </Text>
              </View>
              <View>
                <Text style={styles.comment}>
                  {
                    this.state.recData.commentsId[
                      this.state.recData.commentsId.length - 1
                    ].text
                  }
                </Text>
              </View>
            </View>
          </View>
        );
      }
    }
  }
  render() {
    const data = this.props.item;

    return (
      <Animated.View style={styles.bannerView}>
        <View style={styles.titleContainer}>
          <View style={{ flexGrow: 1 }}>
            <Image
              borderRadius={20}
              source={{ uri: data.user.picture }}
              style={styles.titleImage}
            />
          </View>
          <View style={{ flexGrow: 6 }}>
            <Text style={styles.bannerTitle}>{data.user.name}</Text>
            <TimeAgo style={styles.timeStyle} time={data.createdAt} />
          </View>
        </View>
        {this.imgOrVid(data)}
        <View style={styles.likeContainer}>
          <View style={{ marginRight: 15 }}>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={this.likeIt.bind(this)}
            >
              {this.state.liked ? (
                <Text style={styles.likedStyle}>
                  {" "}
                  <Icon
                    name="smile-o"
                    size={20}
                    color={Constants.appColor}
                  />{" "}
                  &nbsp;{this.state.likes} Like
                </Text>
              ) : (
                <Text style={styles.likeStyle}>
                  {" "}
                  <Icon name="smile-o" size={20} color="#919fa9" />&nbsp;{this
                    .state.likes > 0
                    ? this.state.likes
                    : null}{" "}
                  Like
                </Text>
              )}
            </TouchableHighlight>
          </View>
          <View style={{ marginRight: 15 }}>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={this.commentPressed.bind(this, "one")}
            >
              <Text style={styles.likeStyle}>
                <Icon name="comment-o" size={20} color="#919fa9" /> Comment
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.commentContainer}>{this.getInitialComments()}</View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  bannerView: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 5,
    flexDirection: "column"
  },
  commentContainer: {
    marginTop: 10
  },
  allComment: {
    fontSize: 16,
    fontWeight: "400",
    color: "#919fa9"
  },
  comment: {
    fontSize: 16,
    fontWeight: "300",
    color: "#333"
  },
  likeContainer: {
    flexDirection: "row",
    marginTop: 10
  },
  commentUser: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000"
  },
  likeStyle: {
    color: "#919fa9",
    fontSize: 18,
    fontWeight: "400"
  },
  likedStyle: {
    color: Constants.appColor,
    fontSize: 18,
    fontWeight: "400"
  },
  textContainer: {
    marginBottom: 10
  },
  titleContainer: {
    flexDirection: "row",
    height: 60
  },
  imageContainer: {
    alignItems: "center"
  },
  titleImage: {
    width: 40,
    height: 40
  },
  timeStyle: {
    color: "#D3D3D3",
    marginTop: 2
  },
  banner: {
    height: devHeight / 2,
    width: devWidth,
    backgroundColor: "#ccc"
  },
  paging: {
    top: -devHeight * 11 / 100,
    right: 10
  },
  bannerImage: {
    width: devWidth - 30,
    height: devHeight / 3.5
  },
  dot: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: 15,
    height: 2,
    borderRadius: 4,
    marginLeft: 4,
    marginRight: 4
  },
  dotActive: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    width: 15,
    height: 2,
    borderRadius: 4,
    marginLeft: 4,
    marginRight: 4
  },
  bannerText: {
    fontFamily: "Avenir-Roman",
    fontSize: 17,
    color: "#333",
    marginTop: 7
  },
  bannerGradient: {
    width: devWidth,
    height: 30 * devHeight / 100,
    alignItems: "flex-start",
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 8
  },
  bannerTitle: {
    fontFamily: "Helvetica",
    color: "#333",
    fontSize: 17
  },
  bannerDate: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 11,
    fontWeight: "500",
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 16,
    textAlign: "left",
    width: 30
  },
  fixHeart: {
    position: "absolute",
    top: 10,
    right: 5,
    zIndex: 9999
  },
  loader: {
    flex: 1,
    margin: 10,
    justifyContent: "center"
  }
});

export default FeedItem;
