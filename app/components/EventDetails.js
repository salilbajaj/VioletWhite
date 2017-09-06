import React, {PropTypes} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
var {
  Component
} = React
import Dimensions from 'Dimensions';
import { Navigation } from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import back from '../assets/images/left-arrow.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import Constants from "../common/Constants";
var TimeAgo = require('react-native-timeago');

const devWidth=Dimensions.get('window').width;
const devHeight=Dimensions.get('window').height;
const tileHeight=devHeight/2

class EventDetails extends Component{
    constructor(props){
      super(props)
      this.onModalClose=this.onModalClose.bind(this)
    }
    onModalClose(){
      this.props.navigator.dismissModal({
        animationType: 'slide-down'
      });
    }
    render(){
      let {item}=this.props;
       return (
          <ScrollView style={styles.container}>
         
            <Image style={styles.image} source={{uri:item.image}} >
             <View style={styles.backdropView} >
              <TouchableOpacity onPress={this.onModalClose} style={{backgroundColor:'rgba(0,0,0,.2)',width:40,height:40,justifyContent:'center',alignItems:'center',marginTop:20,marginLeft:10}}><Image style={{width:20,height:20}} source={back} /></TouchableOpacity>
          </View>
          </Image>
           <View style={styles.textCont}>
            <Text style={{fontSize:18,fontWeight:'600'}}>
              {item.title}
            </Text>
            <Text style={{fontSize:14,color:'rgb(43,46,74)',marginTop:15}}>
              {item.description}
            </Text>
           </View>
           <View style={styles.progressCont}>
              <Progress.Bar progress={item.completed*0.01} width={devWidth-40} color={Constants.appColor} unfilledColor={'#f5f5f5'} height={5} borderWidth={0} />
            </View>
             
             <View>
             <View style={{marginTop:20,alignItems:'center'}}>
                <Text style={{alignSelf:'center',color:Constants.appColor,fontWeight:'500'}}>
                   {item.completed}% users have participated this event.
                  </Text>
                  
                  
                  
                  
                </View>
                <View style={{marginTop:20,alignItems:'center'}}>
                <Text>
                 <Icon name="inr" size={16} color={Constants.appColor} /> {item.pledged} pledged so far.
                 </Text>
                </View>
                
                <View style={{marginTop:20,alignItems:'flex-start',paddingLeft:20}}>
                <Text>
                  <TimeAgo style={{color:'#d3d3d3'}} time={item.createdAt} />
                  </Text>
        </View>
     </View>
          </ScrollView> 
        )
}
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff' 
  },
  progressCont:{
    alignItems:'center',
    marginTop:25
  },
  backdropView: {
    justifyContent:'flex-start',
    alignItems:'flex-start',
    width:devWidth,
    height:devHeight/2,
  },
  image:{
    width:devWidth,
    height:devHeight/2
  },
  textCont:{
    width:devWidth-30,
    alignSelf:'center',
    marginTop:20
  },
  headline: {
    fontSize: 20,
    
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#fff',
    fontWeight:'bold'
  },

 
 
})
Navigation.registerComponent('AwesomeProject.EventDetails', () => EventDetails);


export default EventDetails;
