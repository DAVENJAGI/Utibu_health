import { View, ScrollView, SafeAreaView, Text, Image, ImageBackground, Alert } from "react-native";
import { useNavigation } from "expo-router"; // Correct import
/*import Navigator from '../routes/drawer'*/

import { COLORS, icons, SIZES } from "../jobsift-starter/constants";
import { ScreenHeaderBtn, Welcome } from "../jobsift-starter/components";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { myDoctor } from "./myDoctor";
import { home } from "./home";
import { prescriptions } from "./prescriptions";

import places from "../icons/icons/png/filled/places/home_alt.png";
import medicine from "../icons/icons/png/filled/medications/medicines.png";
import calendar from "../icons/icons/png/filled/symbols/calendar.png";
import emotion from "../icons/icons/png/filled/emotions/ok.png";
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
        <View style={{position: "relative", flex: 1, flexDirection: "row", height: 100, marginTop: 2, borderRadius: 8, width: "96%",left: "2%", backgroundColor: "#FF7F7F"}}>
            <View style={{padding: SIZES.large}}>
                <Image
                    source={emotion}
                    resizeMode="contain"
                />
            </View>
            <View style={{padding: SIZES.small, justifyContent: "center"}}>
                <Text style={{fontSize: 15}}>You are currently not a member</Text>
                <Text> of Utibu CLinic.</Text>
                <Text style={{fontSize: 15}}> Kindly visit our nearest branch</Text>
                <Text> to get started</Text>
            </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Appointment;
