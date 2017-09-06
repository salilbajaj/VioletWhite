import React, {PropTypes} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';
import * as Progress from 'react-native-progress';
import Constants from "../common/Constants";
const devWidth=Dimensions.get('window').width;
const devHeight=Dimensions.get('window').height;
var TimeAgo = require('react-native-timeago');
const tileHeight=devHeight/1.8
const EachEvent = ({item}) => {
  console.log(item)
 return (
    <View style={styles.itemContainer}>
    
    <Image style={styles.image} source={{uri:item.image}} />
     <View style={styles.textCont}>
      <Text style={{fontSize:16,fontWeight:'400'}}>
        {item.title}
      </Text>
     </View>
     <View style={styles.progressCont}>
      <Progress.Bar progress={item.completed*0.01} width={devWidth-40} color={Constants.appColor} unfilledColor={'#f5f5f5'} height={3} borderWidth={0} />
     </View>
     <View style={styles.eventInfo}>
        <View style={styles.eachInfo}>
        <Text>
         <Icon name="inr" size={16} color={Constants.appColor} /> {item.pledged}
         </Text>
          <Text style={{alignSelf:'center'}}>          
          pledged
          </Text>
        </View>
        <View style={styles.eachInfo}>
        <Text style={{alignSelf:'center',color:Constants.appColor,fontWeight:'500'}}>
          {item.completed}%
          
          </Text>
           <Text style={{alignSelf:'center'}}>
          
          participated
          </Text>
        </View>
        <View style={styles.eachInfo}>
        <Text>
          <TimeAgo style={styles.timeStyle} time={item.createdAt} />
          </Text>
        </View>
     </View>
    </View> 
  );
};

const styles=StyleSheet.create({
  eventInfo:{
    flex:1,
    flexDirection:'row'
  },
  eachInfo:{
    alignItems:'center',
    justifyContent:'center',
    flexGrow:1
  },
  itemContainer:{
    width:devWidth-30,
    flex:1,
    borderWidth:2,
    borderColor:'#f5f5f5',
    marginBottom:10,
    height:tileHeight,
    alignSelf:'center',
    shadowOffset:{
              width: 1,
              height: 1,
          },
          shadowColor: 'rgba(0,0,0,.4)',
          shadowOpacity: 0.3,
    justifyContent:'flex-start',    
  },
  image:{
    width:devWidth-30,
    height:(tileHeight*2)/3
  },
  progressCont:{
    alignItems:'center',
    marginTop:10
  },
  textCont:{
    
    padding:10
  },
   timeStyle:{
      
    
    },
 
 
})

export default EachEvent;
