import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Image, Alert} from 'react-native';
import * as Permissions from "expo-permissions";
import {BarCodeScanner} from "expo-barcode-scanner";
import db from "../config";

const bgImage= require("../assets/shopping background 2.png");
const appIcon= require("../assets/app icon.png");

export default class Shopping extends Component{
  constructor(props){
    super(props);
    this.state={
      itemId:"",
      userId:"",
      domState:"normal",
      hasCameraPemissions:null,
      scanned:false
    };
  }
  getCameraPermissions = async()=>{
    const{status}=await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPemissions:status==="granted",
      domState:"scanner",
      scanned:false
    });
  };
  handleBarCodeScanned=async({type,data})=>{this.setState({
    itemId:data,
    domState:"normal",
    scanned:true
  })}
  handleTransaction=()=>{var {itemId}=this.state;
  db.collection("items").doc(itemId)
  .get()
    .then(doc=>{var item=doc.data();
    if(item.is_item_available){
      this.asignItem();
    }else{
      this.initiateitemReturn
    }})
  }
  asignItem=()=>{console.log("You have bought the item for you. Enjoy your Item!")};
  
  returnItem=()=>{console.log("We Hope you liked the item")};
  render(){
    const{itemId, userId, domState, scanned}=this.state;
    if(domState!=="normal"){
      return(
        <BarCodeScanner onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}/>
      );
    }
    return(
      <View style={styles.container}>
      <View style={styles.upperContainer}>
      <Image source={appIcon} style={styles.appIcon}/>
      <Text style={styles.title}>Shopping</Text>
      <Text style={styles.subtitle}>Eco Friendly Shop</Text>
      </View>
      <View style={styles.lowerContainer}>
      <View style={styles.textinputContainer}>
      <TextInput style={[styles.textinput, {width:"82%"}]}
      onChangeText={text=>this.setState({userId:text})}
      placeholder={"User Id"}
      placeholderTextColor={"#ffffff"}
      value={userId}/>
      </View>
      <View style={[styles.textinputContainer,{marginTop:25}]}>
      <TextInput style={styles.textinput}
      placeholder={"Product Id"}
      placeholderTextColor={"#ffffff"}
      value={itemId}/>
      <TouchableOpacity style={styles.scanbutton} 
      onPress={()=>this.getCameraPermissions()}>
      <Text style={styles.scanbuttonText}>Scan</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.button, {marginTop:25}]}
      onPress={this.handleTransaction}>
      <Text style={styles.buttontext}>Explore our Products</Text>
      </TouchableOpacity>
      </View>
      </View>
    );
  }
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#d0e6f0'
  },
  bgImage:{
    flex:1,
    resizeMode:"cover",
    justifyContent:"center",
  },
  upperContainer:{
    flex:0.5,
    justifyContent:"center",
    alignItems:"center"
  },
  appIcon:{
    width:200,
    height:200,
    resizeMode:"contain",
    marginTop:80
  },
  title:{
    fontSize:40,
    fontFamily:"Rajdhani_600SemiBold",
    paddingTop:20,
    color:"#4c5d70"
  },
  subtitle:{
    fontSize:20,
    fontFamily:"Rajdhani_600SemiBold",
    color:"#4c5d70"
  },
  lowerContainer:{
    flex:0.5,
    alignItems:"center",
  },
  textinputContainer:{
    borderWidth:2,
    borderRadius:10,
    flexDirection:"row",
    backgroundColor:"4c5d70",
    borderColor:"4c5d70"
  },
  textinput:{
    width:"57%",
    height:50,
    padding:10,
    borderColor:"#4c5d70",
    borderRadius:10,
    borderWidth:3,
    fontSize:18,
    backgroundColor:"#f88379",
    fontFamily:"Rajdhani_600SemiBold",
    color:"#ffffff"
  },
  scanbutton:{
    width:100,
    height:50,
    backgroundColor:"#fbe5c0",
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
    justifyContent:"center",
    alignItems:"center"
  },
  scanbuttonText:{
    fontFamily:"Rajdhani_600SemiBold",
    fontSize:24,
    color:"#4c5d70"
  },
  button:{
    width:"43%",
    height:55,
    justifyContent:"center",
    backgroundColor:"#fbe5c0",
    borderRadius:20,
    borderWidth:2,
    borderColor:"#4c5d70"
  },
  buttontext:{
    fontSize:15,
    color:"4c5d70",
    fontFamily:"Rajdhani_600SemiBold"
  }  
})