import { View, ScrollView, SafeAreaView, Text, Image, ImageBackground, Alert } from "react-native";
import { useNavigation } from "expo-router"; // Correct import
/*import { ProfileScreen } from '../screens/profile'*/
/*import Navigator from '../routes/drawer'*/

import { COLORS, icons, SIZES } from "../jobsift-starter/constants";
import { ScreenHeaderBtn, Welcome } from "../jobsift-starter/components";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { myDoctor } from "../app/myDoctor";
import { home } from "../app/home";
import { prescriptions } from "../app/prescriptions";

import places from "../icons/icons/png/filled/places/home_alt.png";
import medicine from "../icons/icons/png/filled/medications/medicines.png";
import calendar from "../icons/icons/png/filled/symbols/calendar.png";
import emotion from "../icons/icons/png/filled/emotions/sad.png";
import menu from "../icons/icons/png/filled/symbols/ui_menu.png";
import call from "../icons/icons/png/filled/objects/phone.png";
import card from "../icons/icons/png/filled/objects/credit_card.png";
import { useRouter } from "expo-router";

const Appointment = () => {
  const navigation = useNavigation();
/*  const route = useRouter();*/

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {/* Removed incorrect options prop */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{position: "absolute", flex: 1, flexDirection: "row", height: 100, marginTop: 2, borderRadius: 8, width: "96%",left: "2%", backgroundColor: "#FF7F7F"}}>
            <View style={{padding: SIZES.large}}>
                <Image
                    source={emotion}
                    resizeMode="contain"
                />
            </View>
            <View style={{padding: SIZES.large, paddingLeft: 35, justifyContent: "center"}}>
                <Text style={{fontSize: 20}}>The drug you selected is currently unavailable.</Text>
                <Text style={{fontSize: 20}}> Please check again later</Text>
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
          <Image source={places} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.navigate('prescriptions')
        }}>
          <Image source={medicine} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Image source={calendar} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          navigation.navigate('profile')
        }}>
          <Image source={menu} resizeMode="cover" />
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default Appointment;
