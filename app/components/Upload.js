var React = require('react');
var ReactNative = require('react-native');
var {
  Component
} = React
var {
  AppRegistry,
  StyleSheet,
  Animated,
  Text,
  View,
  Image,
  TextInput,
  TabBarIOS,
  TouchableHighlight,
  TouchableOpacity,
  CameraRoll,
  NativeModules,
  ActivityIndicator,
  DeviceEventEmitter,
   ScrollView,
   FlatList
} = ReactNative;
import Dimensions from 'Dimensions';
import { Navigation } from 'react-native-navigation';
import EventDetails from './EventDetails';
const devWidth=Dimensions.get('window').width;
const devHeight=Dimensions.get('window').height;
import EachEvent from './EachEvent';
import imageIcon from "../assets/images/icon-home.png";
import Icon from 'react-native-vector-icons/FontAwesome';
import Constants from "../common/Constants";
import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import Cache from "../common/Cache";


class Upload extends Component{
   static navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true,
    navBarTextColor: '#fff',
    navBarBackgroundColor:'violet'
  };
  constructor(props) {
      super(props); 
    this.state = {
        selectedTab:'Events',
        loading:false,
        recData:null,
        loading:false,
         width: 1600,
        format: "JPEG",
        feedText:null,
        quality: 90,
        height:1000,
        feedText:null,
        gotImage:false,
        userToken: null,
      userInfo: null,
      loggedIn:false              
      }  
      
      this.openImagePicker=this.openImagePicker.bind(this);
      this.postFeed=this.postFeed.bind(this)
    }
    componentWillUnmount() {
  // Remove the alert located on this master page from the manager
 
  this.setState({
    loading:false
  })
}
    componentDidMount() {
      
      Cache.getUser(
      function(response) {
        if (response && response.token && response.token.length > 0 && response.user.id) {
          this.setState({
            loggedIn: true,
            userToken: response.token,
            userInfo: response.user
          });
        }
      }.bind(this)
    );
      this.props.navigator.setButtons({leftButtons:[{ id: 'drawer-btn', 
        disabled: false, 
        icon: require('../assets/images/icon-home.png'),        
        buttonColor: 'red',
        buttonFontSize: 14, 
        buttonFontWeight: '600',}],rightButtons:[]})
      //this.getFeed()

    }
    openImagePicker = () => {
    // get image from image picker

    
      ImagePicker.showImagePicker(this.options, async response => {
        this.setState({
          loading: true
        });

        if (response.didCancel) {
        
          return;
        } else if (response.error) {
         
          return;
        } else if (response.customButton) {
         
          return;
        }
        let { height, width, quality, format } = this.state;
        ImageResizer.createResizedImage(
          `data:image/jpeg;base64,${response.data}`,
          width,
          height,
          format,
          quality
        )
          .then(response => {
            
            this.setState(
              {
                gotImage: true,
                recImageUri: response,
                uploadText: "Cancel"
              },
              () => {
                this.setState({
                  loading: false
                });
              }
            );
            // response.uri is the URI of the new image that can now be displayed, uploaded...
            // response.path is the path of the new image
            // response.name is the name of the new image with the extension
            // response.size is the size of the new image
          })
          .catch(err => {
            
            this.setState({
              loading: false
            });
            // Oops, something went wrong. Check that the filename is correct and
            // inspect err to get more details.
          });
      });
    
  };


    uploadBox(){
      
      return (
        <Animated.View style={{flexDirection:'row'}}>
        <View style={{width:devWidth*8/10,borderBottomWidth:1,borderColor:'#f5f5f5',padding:10}}>
            <TextInput
            style={styles.inputStyle}
            onChangeText={text => this.setState({ feedText: text })}
            multiline={true}
            numberOfLines={4}
            placeholder="Share Happiness"
          />
        </View>
        <TouchableOpacity onPress={this.openImagePicker} style={{width:devWidth*2/10,justifyContent:'center',alignItems:'center'}}>
         <Icon name="picture-o" size={20} color={Constants.appColor} />
        </TouchableOpacity>

          
        </Animated.View>
      );
    
    }
    postFeed() {
    
    if (this.state.feedText != null && !this.state.gotImage) {
      this.setState({
        loading: true,
        posting: true
      });
      var postData = {
        access_token: this.state.userToken,
        type: "text",
        text: this.state.feedText
      };

      fetch(Constants.URL.api+"feeds", {
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
          if (result) {
          this.props.navigator.switchToTab({
            tabIndex: 0
          });
          this.setState({
                  loading: false,
                  posting: false
                });
            // this.state.recData.unshift(result);

            // this.setState({
            //     feedText: null,
            //     recData: recData
            //   },
            //   () => {
            //     this.setState({
            //       loading: false,
            //       posting: false
            //     });
            //   }
            // );
           
          }
        })
        .catch(err => {
          
        });
    } else if (this.state.gotImage) {
      
      this.setState({
        loading: true,
        posting: true
      });
      var postData = {
        access_token: this.state.userToken,
        type: "image",
        text: this.state.feedText
      };

      fetch(Constants.URL.api + "feeds", {
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
          if (result) {
            this.postImageProcessing(result);
            
          }
        })
        .catch(err => {
        
        });
    }
  }
  postImageProcessing(data) {
    
    
       var api=Constants.URL.api+'feeds/'+data.id+'/image?access_token='+this.state.userToken;
       //var postData=new FormData();
        //postData.append('data',{uri: this.state.recImageUri,name: 'photo.png',filename :'imageName.png'})
        //console.log(RNFetchBlob)
        let pic={
          uri:this.state.recImageUri,
          name:'image1.png',
          type:'image/png'
        }
        let postData=new FormData();
        postData.append('data',pic);
        let config = {    
          method:'PUT',
        body: postData,
        'Content-Type' : 'content/form-data'
    };
    fetch(api,config)
    .then((response)=>{
      
       if(response){
         return response.json();
       }else{
         throw err;
       }
     })
     .then((result)=>{
       
       if(result){
         // this.state.recData.unshift(result)

         // this.setState({
         //   feedText:null,
         //   gotImage:false,
         //   recData:recData
         // },()=>{
         //   this.setState({
         //     loading:false,
         //     posting:false
         //   })
         // })
          this.props.navigator.switchToTab({
            tabIndex: 0
          });
          this.setState({
                  loading: false,
                  posting: false
                });
     }
      }).catch((err)=>{

       
     })
  }
 render(){
if(this.state.loading){
        return(
            <View style={styles.loader}>
              <ActivityIndicator size='large' animating={true} />
            </View>
          );
      }
      
  return(
   
     <View style={styles.container}>
        <View style={styles.customHeader}>
         <View style={styles.customLeft}>            
          </View>
          <View style={styles.customTitle}>
            <Text style={{fontSize:16,fontWeight:'600'}}>Share Your Story</Text>
          </View>
          <TouchableHighlight onPress={this.postFeed} style={styles.customRight}>
            <Text style={{fontSize:15,fontWeight:'200',marginRight:10,color:Constants.appColor}}>Post</Text>
          </TouchableHighlight>
        </View>
        <View>
          {this.uploadBox()}
        </View>  
        <View>
        {this.state.recImageUri?<Image
              source={{ uri: this.state.recImageUri }}
              style={styles.upImage}
            />:<View></View>}
        </View>
     </View>
      )
 }  
}

var styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff",
        width:devWidth,
    },
    upImage:{
      width:devWidth,
      alignSelf:'center',
      height:devHeight/3,
      marginTop:25
    },
    customHeader:{
      height:devHeight/10,
      borderBottomWidth:1,
      borderBottomColor:'#f5f5f5',
      
      width:devWidth,
      flexDirection:'row'
    },
    customLeft:{
      width:devWidth/4
    },
    customTitle:{
      width:devWidth/2,
      alignItems:'center',

      justifyContent:'center',
    },
    customRight:{
      width:devWidth/4,
      alignItems:'flex-end',
      justifyContent:'center',
    },
    uploadContainer:{
      height:devHeight/6,
      borderBottomWidth:.8,
      borderBottomColor:"#f5f5f5",
      
      
    },
    inputStyle:{
      
      fontSize:20,
      padding:5
    },
    buttonContainer:{
      flex:1,
      flexDirection:'row',
      height:devHeight/7-55,
      justifyContent:'flex-end',
      alignItems:'flex-end',
      paddingBottom:5
    },
    uploadButtons:{
      flexGrow:1,
      alignItems:'center',
      padding:2
    },
    buttons:{
      alignSelf:'stretch',borderWidth:1,padding:7,
      alignItems:'center'

    },
    loader:{
    flex: 1, 
    margin:10,
    justifyContent: 'center',
  },
  inputStyle: {
    height: 50
  },
});

Navigation.registerComponent('AwesomeProject.Upload', () => Upload);
module.exports = Upload;

