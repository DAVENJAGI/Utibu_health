import { View, ScrollView, SafeAreaView, Text, Image, ImageBackground, Alert, Touchable } from "react-native";
import { useNavigation } from "expo-router"; // Correct import
/*import { ProfileScreen } from '../screens/profile'*/
/*import Navigator from '../routes/drawer'*/

import { COLORS, icons, SIZES } from "../jobsift-starter/constants";
import { ScreenHeaderBtn, Welcome } from "../jobsift-starter/components";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native"; // Might need replacement
import { FlatList, TextInput } from 'react-native'
import { notMember } from "./notMember"
import { home } from "./home"
import { LinearGradient } from 'expo-linear-gradient';

import places from "../icons/icons/png/filled/places/home_alt.png";
import medicine from "../icons/icons/png/filled/medications/medicines.png";
import calendar from "../icons/icons/png/filled/symbols/calendar.png";
import emotion from "../icons/icons/png/filled/emotions/neutral.png";
import menu from "../icons/icons/png/filled/symbols/ui_menu.png";
import call from "../icons/icons/png/filled/objects/phone.png";
import card from "../icons/icons/png/filled/objects/credit_card.png";
import { useRouter } from "expo-router";

/*import About from "../jobsift-starter/components/jobdetails/about/About";*/

const signUp = () => {
  
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={{ flex: 1}}>
      
      
        <View style={{borderColor:"red", height: "100%"}}>
        <LinearGradient colors={['#30B3DE', '#30B3DE']} style={{height: '100%'}} start={{ x: 0, y: 0 }}end={{ x: 0, y: 1 }}>
          <View style={{margin:"1%", marginTop:"50%", backgroundColor:"white",  borderColor:"#30B3DE", borderWidth:1, height:"60%", borderRadius: 8}}>
            <View style={{flexDirection:"row", height:"15%", borderColor:"red", borderRadius:8}}>
            
              <TouchableOpacity style={{ borderTopLeftRadius:8, backgroundColor:"#30B3DE", flexDirection:"row", alignItems:"center", width:"48%", borderColor:"red"}} onPress={() => {navigation.navigate('login')}}>
                <Text style={{fontSize:18, fontWeight:700,textAlign:"center", color:"white", flexDirection:"row", width:"100%", borderColor:"red"}}>Login</Text>
              </TouchableOpacity>
              <View style={{marginLeft:"1%", borderTopRightRadius:8, flexDirection:"row", width:"49%", borderColor:"blue"}}>
                <TouchableOpacity style={{margin:"1%", flexDirection:"row", alignItems:"center", width:"100%", borderColor:"red"}}>
                  <Text style={{fontSize:20, fontWeight:700, color:"#30B3DE", textAlign:"center", flexDirection:"row", width:"100%", borderColor:"red"}}>SignUp</Text>
                </TouchableOpacity>
              </View>
              
            </View>
            <View style={{alignItems: "center", borderColor:"#30B3DE", borderRadius:8, justifyContent: "center", flex: 1, flexDirection: "column"}}>
            <View style={{justifyContent:"center", height:"60%", margin:"2%"}}>
                <View style={{height:"100%", margin:"2%"}}>
                    <Text style={{alignSelf:"center", color:"black",  fontSize: 22, textAlign:"center", fontWeight: "600"}}>Hello There</Text>
                    <Text style={{fontSize: 25, color:"black", alignSelf:"center", marginTop:"2%", textAlign:"center", fontWeight: "700"}}>For security purposes, kindly visit your doctor to get started with utibu health</Text>
                </View>
                </View>
            </View>
          </View>
          </LinearGradient>
        </View>

    </SafeAreaView>
  );
};

export default signUp;
