import { View, ScrollView, SafeAreaView, Text, Image, ImageBackground, Alert } from "react-native";
import { useNavigation } from "expo-router"; // Correct import
/*import { ProfileScreen } from '../screens/profile'*/
/*import Navigator from '../routes/drawer'*/

import { COLORS, icons, SIZES } from "../jobsift-starter/constants";
import { ScreenHeaderBtn, Welcome } from "../jobsift-starter/components";
import { useState } from "react";
import { TouchableOpacity, TouchableHighlight } from "react-native"; // Might need replacement



import places from "../icons/icons/png/filled/places/home_alt.png";
import medicine from "../icons/icons/png/filled/medications/medicines.png";
import calendar from "../icons/icons/png/filled/symbols/calendar.png";
import orders from "../icons/icons/png/filled/symbols/i_documents_accepted.png";
import menu from "../icons/icons/png/filled/symbols/ui_menu.png";
import { useRouter } from "expo-router";

const Home = () => {
  const navigation = useNavigation();

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
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome />
        </View>
      </ScrollView>
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
        <TouchableOpacity onPress={() => {}}>
          <Image source={places} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableHighlight onPress={() => {
          navigation.navigate('prescriptions')  
        }}
        activeOpacity={0.8}
        underlayColor="gray"
        >
          <Image source={medicine} resizeMode="contain" />
        </TouchableHighlight>
        <TouchableOpacity onPress={() => {
          navigation.navigate('myAppointments')
        }}>
          <Image source={calendar} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          navigation.navigate('profile')
        }}>
          <Image source={menu} resizeMode="cover" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
