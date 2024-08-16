import { View, ScrollView, SafeAreaView, Text, Image, ImageBackground, Alert } from "react-native";
import { useNavigation } from "expo-router"; // Correct import
/*import { ProfileScreen } from '../screens/profile'*/
/*import Navigator from '../routes/drawer'*/

import { COLORS, icons, SIZES } from "../jobsift-starter/constants";
import { ScreenHeaderBtn, Welcome } from "../jobsift-starter/components";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
// import { profile } from "../app/profile";
// import { home } from "../app/home";
// import { prescriptions } from "../app/prescriptions";

import places from "../icons/icons/png/outline/places/home_alt.png";
import medicine from "../icons/icons/png/outline/medications/medicines.png";
import calendar from "../icons/icons/png/outline/symbols/calendar.png";
import emotion from "../icons/icons/png/outline/emotions/neutral.png";
import orders from "../icons/icons/png/outline/symbols/i_documents_accepted.png";
import doctor from "../icons/icons/png/outline/people/doctor.png"
import settings from "../icons/icons/png/filled/symbols/ui_settings.png"
import menu from "../icons/icons/png/filled/symbols/ui_menu.png";
import call from "../icons/icons/png/filled/objects/phone.png";
import card from "../icons/icons/png/filled/objects/credit_card.png";
import { useRouter } from "expo-router";

const About = () => {
  const navigation = useNavigation();
/*  const route = useRouter();*/

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {/* HEADER */}
      <View style={{width: "100%", height: 60, justifyContent:"center", flexDirection:"row", top:0, position:"sticky",borderBottomColor:"#cfcfcf", borderBottomWidth:1}}>
            <View style={{width: "20%", borderColor:"red", justifyContent:"center", alignItems:"center"}}>
              <TouchableOpacity style={{width:35, height:35, borderRadius:25, borderWidth:1, justifyContent:"center", alignItems:"center", borderColor: '#cfcfcf', margin:"1%", overflow:"hidden"}} onPress={() => {navigation.navigate('myProfile')}}>
                <ImageBackground source={require('../icons/profilephotos/arrow.jpeg')} style={{width: 30, height: 30, position:"relative", bottom:0, top:0, left:0}}></ImageBackground>
              </TouchableOpacity>
            </View>
          <View style={{height: "100%", width:"60%", borderColor:"red", alignItems: "center", borderBottom:"solid 2px #cfcfcf"}}>
            <View style={{borderColor:"red", width:"100%", height:"100%", justifyContent:"center"}}>
              <Text style={{textAlign:"center", marginLeft:"1%", fontSize:25, fontWeight:700}}>About Us</Text>
            </View>
          </View>
          <View style={{width: "20%", borderColor:"red", justifyContent:"center", alignItems:"center"}}>
            </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={{marginBottom:"1%", borderColor:"red", marginTop:"20%", height:500}}>
          <View style={{borderColor:"red", backgroundColor:"white", marginLeft:"4%", zIndex:11, width:84, position:"absolute", top:3, height:30}}>
            <Text style={{borderColor:"red", color:"#30B3DE", textAlign:"center", marginLeft:"1%", height:"100%", fontSize:18, fontWeight:600}}>ABOUT US</Text>
          </View>
          <View style={{borderColor:"#30B3DE", borderWidth:1, borderRadius:9, justifyContent:"center", margin:"2%", marginTop:15, height:"90%"}}>
            <View style={{marginTop:"1%", borderColor:"red", borderRadius:9, borderColor:"red", justifyContent:"center", height:"85%"}}>
              <Text style={{fontSize:16, color:"#898989", margin:"1%", paddingLeft:"5%", borderRadius:9}}>Having problems with your chronic diseases?? Worry no more. Utibu Health is your digital health companion designed to simplify the management of chronic diseases. We understand the challenges faced by individuals living with chronic conditions and aim to provide a seamless and supportive platform. Our app offers a range of tools to help you track symptoms, manage medications, set reminders, make orders of your medication, and connect with your healthcare provider. By empowering you with essential health information and resources, Utibu Health  strives to improve your quality of life and promote better health outcomes. Take control of your well-being with Utibu Health.</Text>
            </View>
          </View>
        </View>


      </ScrollView>

    </SafeAreaView>
  );
};

export default About;
