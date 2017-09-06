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
  ActivityIndicator,
  Animated
} = ReactNative;
var Social = require('./Social');
var style = require('./style');
var Login = require('./Login');
var Ideas = require('./Ideas');
import menuIcon from '../assets/images/icon-nav.png'

class SideButton extends Component{
  constructor(props){
    super(props);
    console.log(this.state)
  }
  render(){
    return(
      <View style={{marginLeft:5,width:30,height:20}}>
      <TouchableHighlight><Image source={require('../assets/images/icon-nav.png')} /></TouchableHighlight>
      </View>
      )
  }
}

module.exports = SideButton;
