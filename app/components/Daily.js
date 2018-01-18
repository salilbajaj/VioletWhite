var React = require("react");
var ReactNative = require("react-native");
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
  ScrollView
} = ReactNative;
import Dimensions from "Dimensions";

const devWidth = Dimensions.get("window").width;
const devHeight = Dimensions.get("window").height;
var Feed = require("./Feed");
var Button = require("react-native-button");

class Daily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "Social",
      loading: false,
      images: []
    };
  }
  componentWillMount() {
    //this.getFeed()
  }
  componentDidMount() {}
  _addImage() {
    const fetchParams = {
      first: 25
    };

    CameraRoll.getPhotos(fetchParams).then(
      data => {
        const assets = data.edges;
        const index = parseInt(Math.random() * assets.length);
        const randomImage = assets[index];

        let images = this.state.images;
        images.push(randomImage.node.image);

        this.setState({ images: images });
      },
      err => {}
    );
  }

  doUpload() {
    let files = [
      {
        name: "file[]",
        filename: "image1.png",
        filepath: "assets-library://....", // image from camera roll/assets library
        filetype: "image/png"
      },
      {
        name: "file[]",
        filename: "image2.gif",
        filepath:
          "data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7",
        filetype: "image/gif"
      }
    ];

    let opts = {
      url: "http://my.server/api/upload",
      files: files,
      method: "POST", // optional: POST or PUT
      headers: { Accept: "application/json" }, // optional
      params: { user_id: 1 } // optional
    };

    RNUploader.upload(opts, (err, response) => {
      if (err) {
        return;
      }

      let status = response.status;
      let responseString = response.data;
      let json = JSON.parse(responseString);
    });
  }

  // getFeed(){
  //   fetch('http://govioletwhite.herokuapp.com/feeds',{
  //     method: 'get'
  //   })
  //   .then((response)=>{
  //     console.log(response)
  //     if(response){
  //       return response.json();
  //     }else{
  //       throw err;
  //     }
  //   })
  //   .then((result)=>{
  //   console.log(result)
  //    if(result && result.length>0){

  //     this.setState({
  //       recData:result,
  //       loading:false
  //     })
  //     console.log(result)
  //    }

  //   }).catch((err)=>{

  //   })
  // }
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
        <Animated.View style={styles.uploadContainer}>
          <View>
            <Text>knkjnknjk</Text>
          </View>
        </Animated.View>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  whiteContainer: {
    backgroundColor: "#fff",
    padding: 5,
    flex: 1
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

module.exports = Daily;
