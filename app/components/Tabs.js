// var React = require('react');
// var ReactNative = require('react-native');
// var {
//   Component
// } = React
// var {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TextInput,
//   TabBarIOS,
//   TouchableHighlight,
//   ActivityIndicator,
//   Animated
// } = ReactNative;
// var Social = require('./Social');
// var style = require('./style');
// var Login = require('./Login');
// var Ideas = require('./Ideas');
// var Menu = require('./Menu');
// var SideButton = require('./SideButton');

// import menuIcon from '../assets/images/icon-nav.png'
// const SideMenu = require('react-native-side-menu');
// class Tabs extends Component{
//   constructor(props){
//      console.log(props.navigation) 
//       super(props);
//       this.state = {
//         selectedTab:'Social',
//         loggedIn:false,
//         sideOpen:false
//       }
//     }
     
//   static navigationOptions = props=>( {

//     title: 'GO VIOLETWHITE',
//    headerTitleStyle: {
//       color:'rgba(128,0,128,.6)',
//    },
//    headerStyle: {
//      backgroundColor:'#fff',
//    },
//    headerLeft: <SideButton />
  
//  })
//    check(){
//     console.log('jn')
//    } 
//  render(){
//   var menu=<Menu />
//   if(this.state.loggedIn){
//     return(
//       <Login />
//       )
//   }
//   return(  
    
//     <SideMenu menu={menu} ref={(ref) => {
//       sideMenu = ref
//     }} isOpen={false}>
            
//     <TabBarIOS             
//         unselectedTintColor="#333"
//         tintColor="rgba(128,0,128,.6)"        
//         barTintColor="rgba(256,256,256,.4)">
//         <TabBarIOS.Item
//           title="Social"        
//          iconSize={20}
//          selected={this.state.selectedTab === 'Social'}
//           onPress={() => {
//             this.setState({
//               selectedTab: 'Social',
//             });
//           }}
//           >
//          <Social />
//         </TabBarIOS.Item>
//         <TabBarIOS.Item
//           title="Ideas"          
//          iconSize={20} 
//           selected={this.state.selectedTab === 'Ideas'}
//           onPress={() => {
//             this.setState({
//               selectedTab: 'Ideas',
//             });
//           }}       
//             >
//           <Ideas />
//         </TabBarIOS.Item>
//          <TabBarIOS.Item
//           title="Events"           
//          iconSize={20}        
//             >
//           <View>jvhv</View>
//         </TabBarIOS.Item>
//          <TabBarIOS.Item
//           title="Contact" 
//          iconSize={20}
//           >
//           <View>jvhv</View>
//         </TabBarIOS.Item>       
//       </TabBarIOS>    
//       </SideMenu>  
//       )
//  }  
// }


// module.exports = Tabs;
