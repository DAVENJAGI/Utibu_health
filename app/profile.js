import { View, ScrollView, SafeAreaView, Text, Image, ImageBackground, Alert } from "react-native";
import { useNavigation } from "expo-router"; // Correct import
/*import { ProfileScreen } from '../screens/profile'*/
/*import Navigator from '../routes/drawer'*/


import settings from "../icons/icons/png/filled/symbols/ui_settings.png"
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

      {/*NAVIGATION MENU*/}
      <View
        style={{position: "absolute", flex: 1, backgroundColor: "#faf8f8", bottom: 0,left: 0, right: 0, height: 50, borderTopColor: "#CCCCCC", borderTopWidth: 1, flexDirection: "row", justifyContent: "space-evenly"}}
      >
        <TouchableOpacity style={{height:"90%", marginTop:2, justifyContent:"center"}} onPress={() => {
            navigation.navigate('home')
        }}>
          <Image source={places} style={{height:30}} resizeMode="contain" />
          <Text style={{fontSize:9, color:"black", textAlign:"center"}}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{borderColor:"red", height:"90%", marginTop:2, justifyContent:"center"}}  onPress={() => {
          navigation.navigate('prescriptions')  
        }}
        activeOpacity={0.8}
        underlayColor="gray"
        >
          <Image source={medicine} style={{height:30}} resizeMode="contain" />
          <Text style={{fontSize:9, textAlign:"center"}}>Meds</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{height:"90%", marginTop:2, justifyContent:"center"}}  onPress={() => {
          navigation.navigate('myAppointments')
        }}>
          <Image source={calendar} style={{height:30}}  resizeMode="contain" />
          <Text style={{fontSize:9, color:"black", textAlign:"center"}}>Apps</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{height:"90%", marginTop:2, justifyContent:"center"}}  onPress={() => {
          navigation.navigate('previousOrders')
        }}>
          <Image source={orders} style={{height:30}}  resizeMode="contain" />
          <Text style={{fontSize:9, textAlign:"center"}}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{borderRadius:10, borderColor: '#B9EEE9', borderWidth:1, backgroundColor:"#B7B7D6", height:"90%", marginTop:2, justifyContent:"center"}} onPress={() => {
          navigation.navigate('profile')
        }}>
          <Image source={settings} style={{height:30}}  resizeMode="contain" />
          <Text style={{fontSize:9,color:"white", textAlign:"center"}}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
