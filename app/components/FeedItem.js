import React, {PropTypes} from 'react';
var {
  Component
} = React
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Animated,
  TouchableOpacity,
  Image
} from 'react-native';
import Dimensions from 'Dimensions';
import Constants from '../common/Constants';

const devWidth=Dimensions.get('window').width;
const devHeight=Dimensions.get('window').height;
var YouTube = require('react-native-youtube');

var TimeAgo = require('react-native-timeago');

class FeedItem extends Component{
  constructor(props){
    super(props)
  }
  imgOrVid(data){
      if(data.type=="image"){
        return(
          <View>
          <View style={styles.imageContainer}>
          <Image style={styles.bannerImage}
                 source={{uri: data.image.medium?data.image.medium:'https://qdesq.imagekit.io/img/tr:q-10/home.png'}}>
          </Image>
        </View>
        <View style={styles.textContainer}>
        <Text style={styles.bannerText}>{data.text}</Text>
        
        </View>
        </View>
          )
      }
      if(data.type=="video"){
        this.state.videoId=data.url?data.url.substring(data.url.indexOf("=")+1):'VAn8t80lclM'
        
        return(
          <View>
          <View style={styles.imageContainer}>
          <YouTube
  ref="youtubePlayer"
  videoId={this.state.videoId}         // The YouTube video ID
    // A playlist's ID, overridden by `videoId`
  play={false}                     // control playback of video with true/false
  fullscreen={false}               // control whether the video should play in fullscreen or inline
  loop={true}                     // control whether the video should loop when ended
  onReady={e => this.setState({ isReady: true })}
  onChangeState={e => this.setState({ status: e.state })}
  onChangeQuality={e => this.setState({ quality: e.quality })}
  onError={e => this.setState({ error: e.error })}
  onProgress={e => this.setState({ currentTime: e.currentTime, duration: e.duration })}
  showFullscreenButton={false}
  showinfo={false}
  controls={2}
  style={{ alignSelf: 'stretch', height: 300, backgroundColor: 'black', marginVertical: 10 }}
/>

        </View>
        <View style={styles.textContainer}>
        <Text style={styles.bannerText}>{data.text}</Text>
        
        </View>
        
        </View>
         

          )
      }
      if(data.type=="text"){
        return(
           
           <View> 
        <View style={styles.textContainer}>
        <Text style={styles.bannerText}>{data.text}</Text>
        
        </View>
        </View>
          )
      }
    }

     
  render(){

    const data=this.props.item
    
     return (
        <Animated.View style={styles.bannerView}>
            <View style={styles.titleContainer}>
           <View style={{flexGrow:1}}>
             <Image  borderRadius={20} source={{uri: data.user.picture}} style={styles.titleImage} />
            </View>
            <View style={{flexGrow:6}}>
             <Text style={styles.bannerTitle}>{data.user.name}</Text>
             <TimeAgo style={styles.timeStyle} time={data.createdAt} />
            </View>
            </View>

              {this.imgOrVid(data)}

            
            </Animated.View>
      )
}
};

const styles=StyleSheet.create({
  bannerView: {
       backgroundColor:'#fff',
        padding:20,
        marginBottom:5,
        flexDirection:'column'
    },
    titleContainer:{
      
      flexDirection:'row',
      height:60
    },
    imageContainer:{
     alignItems:'center'
    },
    titleImage:{
      width:40,
      height:40,

    },
    timeStyle:{
      color:'#D3D3D3',
      marginTop:2
    },
    "banner": {
        "height": devHeight/2,
        "width": devWidth,
        "backgroundColor": "#ccc"
    },
    "paging": {
        "top": -devHeight * 11 / 100,
        "right": 10
    },
    "bannerImage": {
        "width": devWidth-30,
        "height": devHeight/3.5 
    },
    "dot": {
        "backgroundColor": "rgba(255, 255, 255, 0.3)",
        "width": 15,
        "height": 2,
        "borderRadius": 4,
        "marginLeft": 4,
        "marginRight": 4
    },
    "dotActive": {
        "backgroundColor": "rgba(255, 255, 255, 0.7)",
        "width": 15,
        "height": 2,
        "borderRadius": 4,
        "marginLeft": 4,
        "marginRight": 4
    },
    "bannerText": {
       fontFamily:'Avenir-Roman',
       fontSize:17,
       color:'#333',
       marginTop:7
    },
    "bannerGradient": {
        "width": devWidth,
        "height": 30 * devHeight/100,
        "alignItems": 'flex-start',
        "flex": 1,
        "justifyContent": "flex-end",
        "paddingBottom": 8
    },
    "bannerTitle": {
        fontFamily: 'Helvetica',
        "color": "#333",
        "fontSize": 17,
        
        
    },
    "bannerDate": {
        "color": "rgba(255, 255, 255, 0.7)",
        "fontSize": 11,
        "fontWeight": "500",
        "marginLeft": 12,
        "marginRight": 12,
        "marginBottom": 16,
        "textAlign": 'left',
        "width": 30
    },
    "fixHeart": {
        "position": 'absolute',
        "top": 10,
        "right": 5,
        "zIndex": 9999
    },
    loader:{
    flex: 1, 
    margin:10,
    justifyContent: 'center',
  },
})

export default FeedItem;
