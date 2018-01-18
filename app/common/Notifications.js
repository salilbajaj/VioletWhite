import React, { Component } from 'react'
import { View } from 'react-native'
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

class Notifications extends Component {
  constructor (props) {
    super(props)
    this.state = { message: null }        
  }

  getToast(){
    let toastStyle= ToastStyles.+'this.props.toastStyle'

    let messages = [      
      { text: this.props.text, styles: toastStyle },
    ]
  }
  render () {
    return (
      
    )
  }
}

module.exports=Notifications;