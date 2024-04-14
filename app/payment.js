import { View, ScrollView, SafeAreaView, Text, Image, ImageBackground, Alert } from "react-native";
import { useNavigation } from "expo-router"; // Correct import
/*import { ProfileScreen } from '../screens/profile'*/
/*import Navigator from '../routes/drawer'*/

import { COLORS, icons, SIZES } from "../jobsift-starter/constants";
import { ScreenHeaderBtn, Welcome } from "../jobsift-starter/components";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { home } from "./home";
import { myAppointments } from "./myAppointments";
// import { prescriptions } from "../app/prescriptions";

import places from "../icons/icons/png/filled/places/home_alt.png";
import medicine from "../icons/icons/png/filled/medications/medicines.png";
import calendar from "../icons/icons/png/filled/symbols/calendar.png";
import emotion from "../icons/icons/png/filled/emotions/neutral.png";
import menu from "../icons/icons/png/filled/symbols/ui_menu.png";
import call from "../icons/icons/png/filled/objects/phone.png";
import card from "../icons/icons/png/filled/objects/credit_card.png";
import { useRouter } from "expo-router";

const Payment = () => {
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
        <View style={{flex: 1, flexDirection: "column", height: 700, marginTop: 2, borderRadius: 8, left: "0.5%", width: "99%", backgroundColor: "#CCCCCC"}}>
          <View style={{alignItems: "center", justifyContent: "center", borderRadius: 10, marginTop: SIZES.medium, left: "3%",  width: "80%", height: 50}}>
            <Text style={{fontSize: 20}}>Select your preffered payment method from below</Text>
          </View>
          <View style={{position: "relative", flex: 1, flexDirection: "row", height: 500, marginTop: 20, borderRadius: 8, width: "99%", backgroundColor: "#CCCCCC"}}>
            <TouchableOpacity style={{backgroundColor: "green", alignItems: "center", justifyContent: "center", borderRadius: 10, marginTop: SIZES.medium, left: "2%",  width: "45%", height: 50}}>
                <Text style={{fontWeight: "900", color: "white"}}>m-Pesa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: "red", alignItems: "center", justifyContent: "center", borderRadius: 10, marginTop: SIZES.medium, left: "4%",  width: "45%", height: 50}}>
                <Text style={{fontWeight: "900", color: "white"}}>Airtel money</Text>
            </TouchableOpacity>
          </View>
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

export default Payment;
