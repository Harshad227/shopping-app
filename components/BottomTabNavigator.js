import React, {Component} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Shopping from "../screens/Shopping";
import ShoppingHistory from "../screens/ShoppingHistory";

const Tab=createBottomTabNavigator();

export default class BottomTabNavigator extends Component{
  render(){
    return(
      <NavigationContainer>
      <Tab.Navigator 
      screenOptions={({route})=>({
        tabBarIcon:({focused,color,size})=>{let iconName;
        if(route.name==="Shopping"){
          iconName="item";
        }else if(route.name==="Shopping History"){
          iconName="price";
        }
    return(<Ionicons 
    name={iconName}
    size={size}
    color={color}
    size={size}/>
    );   
        }
      })}
      tabBarOptions={{activeTintColor:"#fbe5c0",
      inactiveTintColor:"black",
      style:{
        height:100,
       borderTopWidth:0,
        backgroundColor:"#f88379"
        },
      labelStyle:{
        fontSize:20,
        fontFamily:"Rajdhani_600SemiBold"
      },
      labelPosition:"below-icon",
      tabStyle:{
        alignItems:"center",
        justifyContent:"center"
      }}}>
      <Tab.Screen name="Shopping" component={Shopping}/>
      <Tab.Screen name="Shopping History" component={ShoppingHistory}/>
      </Tab.Navigator>
      </NavigationContainer>
    )
  }
}