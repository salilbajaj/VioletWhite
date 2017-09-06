var React = require('react');
var ReactNative = require('react-native');
var {
  Component
} = React
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TabBarIOS,
  ListView,
  TouchableHighlight,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  FlatList,
  Modal
} = ReactNative;
import Dimensions from 'Dimensions';
import FeedItem from './FeedItem';
const devWidth=Dimensions.get('window').width;
const devHeight=Dimensions.get('window').height;

var Social = require('./Social');
var YouTube = require('react-native-youtube');
var style = require('./style');
var TimeAgo = require('react-native-timeago');

class Feed extends Component{
  

  
  
  constructor(props) {
      super(props); 
        this.state = {
          loading:false,
          recData:props.pushEvent,
    isReady: false,
    status: null,
    quality: null,
    error: null,
    isPlaying: true,
    isLooping: true,
    duration: 0,
    currentTime: 0,
    fullscreen: false,
        modalVisible:false,
        page:1
      };
      
    }
  componentDidUpdate(prevProps, prevState) {
  // only update chart if the data has changed
 

}
    
   _renderItem = ({item}) => (      
      <FeedItem item={item} />             
    )
     _keyExtractor = (item, index) => item.id;
    renderFooter = () => {
    if (!this.props.loading) return null;

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
 render(){
  
  
  return(    
    <View>
    <FlatList
       data={this.state.recData}
       keyExtractor={this._keyExtractor}  
        renderItem={this._renderItem}
        onEndReached={this.props.endFunction}
        onEndReachedThreshold={0.6}
        extraData={this.state}
        initialNumToRender={12}
        ListFooterComponent={this.renderFooter}
      />
     
          </View>
      )
 }  
}
var styles = StyleSheet.create({
    titleImage:{
      width:40,
      height:40,

    },
    timeStyle:{
      color:'#D3D3D3',
      marginTop:10
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
        marginTop:10,
        "textAlign": 'left'
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
});

module.exports = Feed;


