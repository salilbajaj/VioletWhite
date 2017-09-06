import React, { Component } from 'react'
import { View } from 'react-native'
import Toaster, { ToastStyles } from 'react-native-toaster'

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
      <View>
        <Toaster message={this.getToast} />
      </View>
    )
  }
}

module.exports=Notifications;