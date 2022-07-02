import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class ShoppingHistory extends Component{
  render(){
    return(
      <View style={styles.container}>
      <Text style={styles.text}>Shopping History Screen</Text>
      </View>
    )
  }
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#doe6fo'
  },
  text:{
    color:'#4c5d70',
    fontSize:30,
  }
})