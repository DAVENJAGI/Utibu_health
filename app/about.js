import { View, ScrollView, SafeAreaView, Text, Image, ImageBackground, Alert } from "react-native";
import { useNavigation } from "expo-router"; // Correct import
/*import { ProfileScreen } from '../screens/profile'*/
/*import Navigator from '../routes/drawer'*/

import { COLORS, icons, SIZES } from "../jobsift-starter/constants";
import { ScreenHeaderBtn, Welcome } from "../jobsift-starter/components";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
// import { home } from "../app/home";
// import { myAppointments } from "../app/myAppointments";
// import { prescriptions } from "../app/prescriptions";

import places from "../icons/icons/png/filled/places/home_alt.png";
import medicine from "../icons/icons/png/filled/medications/medicines.png";
import calendar from "../icons/icons/png/filled/symbols/calendar.png";
import emotion from "../icons/icons/png/filled/emotions/neutral.png";
import menu from "../icons/icons/png/filled/symbols/ui_menu.png";
import call from "../icons/icons/png/filled/objects/phone.png";
import card from "../icons/icons/png/filled/objects/credit_card.png";
import { useRouter } from "expo-router";
/*import About from "../jobsift-starter/components/jobdetails/about/About";*/

const About = () => {
  const navigation = useNavigation();
/*  const route = useRouter();*/

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {/* Removed incorrect options prop */}
      <View style={{width: "100%", height: 60, justifyContent:"center", backgroundColor: "#081b29"}}>
            <TouchableOpacity style={{marginLeft: 10, width: "50%"}} onPress={() => {
                navigation.navigate('home')}}>
                <Text style={{fontFamily: "Roboto",fontStyle: "italic", color: COLORS.lightWhite, fontWeight: "900", fontSize: 30}}>Utibu Health</Text>
            </TouchableOpacity>
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{position: "relative", flex: 1, flexDirection: "row", height: "100%", marginTop: "50%", borderRadius: 8, width: "100%", backgroundColor: "#CCCCCC"}}>
            <Text style={{ paddingTop: SIZES.xxLarge, paddingBottom: SIZES.xxLarge, marginBottom: "10%", fontSize: 15, fontWeight: '900', marginTop: 10, textAlign: "center", padding: SIZES.xSmall}}>Utibu Health is a revolutionary clinic app designed to empower you, the patient,
               to effectively manage your chronic conditions. We understand the unique challenges you face, and our app provides a comprehensive and convenient platform to support your well-being.
            </Text>
            
        </View>
      </ScrollView>

      <View>
      <View
        style={{
          position: "absolute",
          flex: 1,
          backgroundColor: "#faf8f8",
          bottom: 0,
          left: 0,
          right: 0,
          height: 50,
          borderTopColor: "#CCCCCC",
          borderTopWidth: 1,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity onPress={() => {
          navigation.navigate('home')
        }}>
          <Image source={places} resizeMode="contain"/>
        </TouchableOpacity>
        
      </View>
      </View>
    </SafeAreaView>
  );
};

export default About;
