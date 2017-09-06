import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from 'react-native-animatable'
import Constants from '../../common/Constants';
import CustomButton from '../../components/CustomButton'
import metrics from '../../config/metrics'
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');
export default class Opening extends Component {
  

  render () {
    console.log(this.props)
    var _this=this
    console.log(this.props)
    return (
      <View style={styles.container}>
        <View animation={'zoomIn'} delay={600} duration={400}>
          <CustomButton
            text={'Create Account'}
            onPress={this.props.onCreateAccountPress}
            buttonStyle={styles.createAccountButton}
            textStyle={styles.createAccountButtonText}
          />
        </View>
        <View style={styles.separatorContainer} animation={'zoomIn'} delay={700} duration={400}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorOr}>{'Or'}</Text>
          <View style={styles.separatorLine} />
        </View>
        <View animation={'zoomIn'} delay={800} duration={400}>
          <CustomButton
            text={'Sign In'}
            onPress={this.props.onSignInPress}
            buttonStyle={styles.signInButton}
            textStyle={styles.signInButtonText}
          />
        </View>
        <View style={styles.separatorContainer} animation={'zoomIn'} delay={700} duration={400}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorOr}>{'Or'}</Text>
          <View style={styles.separatorLine} />
        </View>
        <View style={{alignItems:'center',width:300}}>
        <FBLogin style={{ alignSelf: 'center',height:60  }}
        ref={(fbLogin) => { this.fbLogin = fbLogin }}
        
        permissions={["email","user_friends"]}
        loginBehavior={FBLoginManager.LoginBehaviors.Native}
        onLogin={this.props.onFbLogin}
        onLogout={function(){
          
          _this.setState({ user : null });
        }}
        onLoginFound={function(data){
          _this.setState({ user : data.credentials });
        }}
        onLoginNotFound={function(){
         
          _this.setState({ user : null });
        }}
        onError={function(data){
         
        }}
        onCancel={function(){
          
        }}
        onPermissionsMissing={function(data){
          
        }}
      />
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: metrics.DEVICE_WIDTH * 0.1,
    justifyContent: 'center'
  },
  createAccountButton: {
    backgroundColor: '#9B9FA4'
  },
  createAccountButtonText: {
    color: 'white'
  },
  separatorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20
  },
  separatorLine: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    borderColor: '#9B9FA4'
  },
  separatorOr: {
    color: '#9B9FA4',
    marginHorizontal: 8
  },
  signInButton: {
    backgroundColor: Constants.appColor
  },
  signInButtonText: {
    color: 'white'
  }
})
