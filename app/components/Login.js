import React, { Component } from 'react'
var ReactNative = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    ActivityIndicator,
    TouchableHighlight,
    ScrollView,
    TouchableOpacity,
    Modal,
    Linking,
AlertIOS
  } = ReactNative;
import AuthScreen from '../containers/AuthScreen'
import HomeScreen from '../containers/HomeScreen'
import Constants from '../common/Constants'
import CF from '../common/CommonFunctions'
import Cache from '../common/Cache'
import { Navigation } from 'react-native-navigation';
import Dimensions from 'Dimensions';
const devWidth=Dimensions.get('window').width;
const devHeight=Dimensions.get('window').height;

/**
 * The root component of the application.
 * In this component I am handling the entire application state, but in a real app you should
 * probably use a state management library like Redux or MobX to handle the state (if your app gets bigger).
 */
export class Login extends Component {
constructor(props) {
    super(props);
    console.log(props)
  this.state = {
    isLoggedIn: false, // Is the user authenticated?
    isLoading: false, // Is the user loggingIn/signinUp?
    isAppReady: false, // Has the app completed the login animation?
    modalVisible:true
  }
  this.simulateFb=this.simulateFb.bind(this)
 }
   modalHide = () => {
    this.setState({
      modalVisible:false
    })
   }
  _simulateLogin = (username, password) => {
    
      data={
        user:username,
        pass:password
      }


     CF.authSet(data,function(response){
      
        const postData={
          access_token:'eiYwL7KscBWiRAVUr3Eisw3f6R6bhboe'
        }
        fetch(Constants.URL.api+'auth',{
          method: 'post',
           headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':'Basic '+response
      },
        body: JSON.stringify(postData)
        })
     .then((response)=>{
        if(response){
          return response.json();
        }else{
          throw err;
        }
      })
      .then((result)=>{
     
        if(result){
          Cache.setUser(result,function(response){
            if(response){
              this.setState({
                modalVisible:false
                },()=>{
                  if(!this.props.fromMenu){
                  this.props.loginResult(true)
            }else if(this.props.fromMenu){
              this.props.navigator.dismissAllModals({
              animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
            });
            }
                })
            }
          }.bind(this))
          
          
      }


      }).catch((err)=>{
       
        console.log(err)
      })
     }.bind(this));
     
  }

  _simulateSignup = (username, password, fullName) => {

   
  
    const postData={
      access_token:'eiYwL7KscBWiRAVUr3Eisw3f6R6bhboe',
      email:username,
      password:password,
      name:fullName
    }
     fetch(Constants.URL.api+'users',{
          method: 'post',
           headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify(postData)
        })
     .then((response)=>{
        
        
        if(response){
          return response.json();
        }else{
          throw err;
        }
      })
      .then((result)=>{
     
        if(result && result.id){
          this._simulateLogin(username,password)
      }

      }).catch((err)=>{
       
        console.log(err)
      })
    }
    
  simulateFb = (data)=>{
    console.log(data)
    let postData= {
      access_token:data.credentials.token
    }
    fetch(Constants.URL.api+'auth/facebook',{
          method: 'post',
           headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify(postData)
        })
     .then((response)=>{
        if(response){
          return response.json();
        }else{
          throw err;
        }
      })
      .then((result)=>{
      console.log(result)
        if(result && result.token){
          Cache.setUser(result,(response) => {
            if(response){
              console.log(response)
              this.setState({
                      modalVisible:false
                      },()=>{
                        if(!this.props.fromMenu){
                        this.props.loginResult(true)
                  }else if(this.props.fromMenu){
                    this.props.navigator.dismissAllModals({
                    animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
                  });
                  }
                })
            }
          })
      }

      }).catch((err)=>{
       
        console.log(err)
      })
  }

  render () {
  
   
      return (
        <Modal
          animationType={"slide"}
          transparent={true}
          style={{height:devHeight}}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}
          >
        <AuthScreen
          login={this._simulateLogin}
          signup={this._simulateSignup}
          isLoggedIn={this.state.isLoggedIn}
          isLoading={this.state.isLoading}
          onLoginAnimationCompleted={() => this.setState({ isAppReady: true })}
          fbLoggedIn={this.simulateFb}
        />
        </Modal>
      )
    
  }
}
Navigation.registerComponent('AwesomeProject.Login', () => Login);
module.exports = Login;