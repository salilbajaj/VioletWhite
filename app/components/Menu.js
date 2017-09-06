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
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  ScrollView
} = ReactNative;
var Social = require('./Social');
var style = require('./style');
var Login = require('./Login');
var Events = require('./Events');
var Contact = require('./Contact');
import menuIcon from '../assets/images/icon-nav.png'
import Dimensions from 'Dimensions';
import { Navigation } from 'react-native-navigation';
import Cache from '../common/Cache'
import textLogo from '../assets/images/text-logo.png';
import Constants from "../common/Constants";
const devWidth=Dimensions.get('window').width;
const devHeight=Dimensions.get('window').height;
const menuWidth=(devWidth*2)/3
class Menu extends Component{
  constructor(props){
    super(props);
    
    this.state={
      loading:true
    } 
    Cache.getUser(
      function(response) {
        if (response && response.token && response.token.length > 0 && response.user.id) {
        
          this.setState({            
            userToken: response.token,
            userInfo: response.user,
            loading:false
          });
        }
      }.bind(this)
    );
    
  }
  
  componentDidMount(){

  }
  gotoContact(){
//     this.props.navigator.toggleDrawer({
//   side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
//   animated: true, // does the toggle have transition animation or does it happen immediately (optional)
//   to: 'Closed' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
// });
//    this.props.navigator.showModal({
//   screen: "AwesomeProject.Events", // unique ID registered with Navigation.registerScreen
//   title: "Modal", // title of the screen as appears in the nav bar (optional)
//   passProps: {}, // simple serializable object that will pass as props to the modal (optional)
//   navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
//   animationType: 'none' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
// });
  }
  logout(){
    
     this.props.navigator.toggleDrawer({
  side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
  animated: true, // does the toggle have transition animation or does it happen immediately (optional)
  to: 'Closed' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
});
     setTimeout(()=>{
       Cache.removeUser(function(response){
            if(response){
              
               this.props.navigator.showModal({
              screen: "AwesomeProject.Login", // unique ID registered with Navigation.registerScreen
               // title of the screen as appears in the nav bar (optional)
              passProps: {
                fromMenu:true
              }, // simple serializable object that will pass as props to the modal (optional)
              navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
              animationType: 'none' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
            });

            }
          }.bind(this))
    },100)
  }
  render(){    
    return(
      <View>
      <View style={styles.whiteContainer}>
        <View style={styles.header}>
        <View>
            <Image source={textLogo} style={styles.menuLogo} />
         </View>

         <View style={{flexDirection:'row',height:50,marginLeft:10,marginTop:20}}>
              <View>
                <Image source={{uri: this.state.userInfo?this.state.userInfo.picture:'https://qdesq.imagekit.io/img/tr:q-10/home.padding'}} style={styles.userImg} /> 
              </View>
               <View style={{justifyContent:'center'}}> 
                  <Text style={{justifyContent:'center',marginLeft:10,fontSize:16,fontWeight:'500'}}>Hi,{this.state.userInfo?this.state.userInfo.name:'User'}</Text>
               </View>
            </View>   
            
        </View>
        <ScrollView>
         <TouchableOpacity style={styles.eachOption} onPress={()=>{
          this.gotoContact()
          }}><Text style={styles.eachOptionText}>Contact Us</Text></TouchableOpacity>
        <TouchableOpacity style={styles.eachOption}><Text style={styles.eachOptionText}>About Us</Text></TouchableOpacity>
        </ScrollView> 
      
      </View>

     <View>
    <TouchableOpacity onPress={this.logout.bind(this)}>
      <View style={styles.button}>
                  <Text style={styles.buttonText}>Logout</Text>
              </View></TouchableOpacity>
              </View>
              </View>
      
      )
  }
}
var styles = StyleSheet.create({
    whiteContainer:{
        backgroundColor:"#fff",

        height:devHeight-50
      
    },
    loader: {
    flex: 1,
    margin: 10,
    justifyContent: "center"
  },
    userImg:{
      width:40,
      height:40,
      borderRadius:20
    },
    header:{
      height:devHeight/5,
      borderBottomWidth:.8,
      borderBottomColor:'#f5f5f5',

    },
    eachOption:{
      justifyContent:'center',
      alignItems:'center',
      height:40,      
      borderBottomWidth:.4,
      borderBottomColor:'#f5f5f5'
    },
    button:{
      height:50,     
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#fff',
      borderColor:'rgb(0,168,251)',
      borderTopWidth:1,
      borderColor:'#f5f5f5'
    },
    buttonText:{
      color:Constants.appColor,
      alignSelf:'center',
       fontSize:15,
      fontWeight:'500'
    },
    eachOption2:{
      justifyContent:'flex-end',
      alignItems:'center',
      height:50,
          
      borderBottomWidth:.4,
      borderBottomColor:'#f5f5f5'
    },
    menuLogo:{
      width:menuWidth,
      alignSelf:'center',
      height:35,
      marginTop:18
    },
    uploadContainer:{
      height:devHeight/6,
      borderBottomWidth:.8,
      borderBottomColor:"#f5f5f5",      
    },
    eachOptionText:{
      fontWeight:'300',
       fontSize:14,
       color:'#333'
    },
    inputStyle:{
      height:50
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
  }
});
Navigation.registerComponent('AwesomeProject.Menu', () => Menu);
module.exports = Menu;
