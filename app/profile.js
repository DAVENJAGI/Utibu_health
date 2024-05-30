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
// import { prescriptions } from "./prescriptions";
import { previousOrders } from "./previousOrders";

import places from "../icons/icons/png/filled/places/home_alt.png";
import medicine from "../icons/icons/png/filled/medications/medicines.png";
import calendar from "../icons/icons/png/filled/symbols/calendar.png";
import orders from "../icons/icons/png/filled/symbols/i_documents_accepted.png";
import profilePic from "../icons/icons/png/filled/symbols/ui_user_profile.png";
import menu from "../icons/icons/png/filled/symbols/ui_menu.png";
import call from "../icons/icons/png/filled/objects/phone.png";
import card from "../icons/icons/png/filled/objects/credit_card.png";
import { useRouter } from "expo-router";

const Profile = () => {
  const navigation = useNavigation();
/*  const route = useRouter();*/

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {/* Removed incorrect options prop */}
      <View style={{width: "100%", height: 60, justifyContent:"center", backgroundColor: "#081b29"}}>
            <TouchableOpacity style={{marginLeft: 10, width: "50%"}} onPress={() => {
                navigation.navigate('home')}}>
                <Text style={{fontFamily: "Roboto",fontStyle: "italic", color: COLORS.lightWhite, fontWeight: "900", fontSize: 30}}>Utibu Health</Text>
                <Text style={{color: COLORS.lightWhite}}>Profile</Text>
            </TouchableOpacity>
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
            flex: 1,
            padding: SIZES.medium,
            backgroundColor: "#CCCCCC",
            width: "100%",
            height: 750,
            flexDirection: "column",
            }}>
            <View style={{backgroundColor: "#faf8f8", left: 0, top: 0, height: 100, borderBottomRightRadius: 68, width: "99%"}}>
                <View style={{padding: SIZES.medium, flexDirection: "row"}}>
                    <Image 
                        source={profilePic}
                        resizeMode="contain"
                    />
                    <View style={{padding: SIZES.small, flexDirection: "column"}}>
                        <View>
                            <Text>David Njagi</Text>
                        </View>
                        <View>
                            <Text>njagidave39@gmail.com</Text>
                        </View>
                        <View style={{paddingTop: SIZES.xsmall}}>
                            <Text>UserId: 807badcc-eb93-....</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{flexDirection: "column", marginTop: SIZES.medium}} onPress={() => {
                navigation.navigate('')}}>
                <View style={{ flexDirection: "row", backgroundColor: "white"}}>
                    <Image 
                        source={call}
                        resizeMode="contain"
                        style={{margin: SIZES.medium}}
                    />
                    <View style={{justifyContent: "center"}}>
                        <Text>Contact Us: +25479689454</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={{flexDirection: "column", marginTop: SIZES.medium}} onPress={() => {
                navigation.navigate('payment')}}>
                <View style={{ flexDirection: "row", backgroundColor: "white"}}>
                    <Image 
                        source={card}
                        resizeMode="contain"
                        style={{margin: SIZES.medium}}
                    />
                    <View style={{justifyContent: "center"}}>
                        <Text>Payment</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection: "column", marginTop: SIZES.medium}} onPress={() => {
                navigation.navigate('previousOrders')}}>
                <View style={{ flexDirection: "row", backgroundColor: "white"}}>
                    <Image 
                        source={orders}
                        resizeMode="contain"
                        style={{margin: SIZES.medium}}
                    />
                    <View style={{justifyContent: "center"}}>
                        <Text>Previous Orders</Text>
                    </View>
                </View>
            </TouchableOpacity>

            

            <TouchableOpacity style={{flexDirection: "column", height: "10%", marginTop: "30%", justifyContent: 'center', backgroundColor: COLORS.white, width: "100%", alignItems: 'center'}} onPress={() => {
                navigation.navigate('about')}}>
                <View>
                    <Text>About Us</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent: 'center', marginTop: SIZES.medium, height: "10%", backgroundColor: COLORS.white, width: "100%", alignItems: 'center'}} onPress={() => {
              navigation.navigate('login')}}>
                <Text> Sign Out</Text>
            </TouchableOpacity>


        </View>
      </ScrollView>

      <View>
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
        }}
        underlayColor="gray"
        >
          <Image source={medicine} resizeMode="contain" />
        </TouchableOpacity>
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
      </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
