import { View, ScrollView, SafeAreaView, Text, Image, ImageBackground, Alert } from "react-native";
import { useNavigation } from "expo-router"; // Correct import
/*import { ProfileScreen } from '../screens/profile'*/
/*import Navigator from '../routes/drawer'*/

import { COLORS, icons, SIZES } from "../jobsift-starter/constants";
import { ScreenHeaderBtn, Welcome } from "../jobsift-starter/components";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
// import { home } from "../app/home"
import { myDoctor } from "./myDoctor";
import { myAppointments } from "./myAppointments";
// import { payment } from "../app/payment";
// import { unavailable } from "../app/unavailable";

import places from "../icons/icons/png/outline/places/home_alt.png";
import calendar from "../icons/icons/png/outline/symbols/calendar.png";
import medicine from "../icons/icons/png/outline/medications/pills_4.png";
import doctor from "../icons/icons/png/outline/people/doctor.png"
import menu from "../icons/icons/png/filled/symbols/ui_menu.png";
import orders from "../icons/icons/png/outline/symbols/i_documents_accepted.png";
import call from "../icons/icons/png/filled/objects/phone.png";
import card from "../icons/icons/png/filled/objects/credit_card.png";
import { useRouter } from "expo-router";

const Prescription = () => {
  const navigation = useNavigation();
/*  const route = useRouter();*/

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {/* HEADER */}
      <View style={{width: "100%", height: 60, justifyContent:"center", top:0, position:"sticky",borderBottomColor:"#cfcfcf", borderBottomWidth:1}}>
          <View style={{height: "100%", flexDirection:"row", alignItems: "center", borderBottom:"solid 2px #cfcfcf"}}>
            <View style={{borderColor:"red", width:"100%", height:"100%", justifyContent:"center"}}>
              <Text style={{textAlign:"center", fontSize:25, fontWeight:700}}>My medication</Text>
            </View>
          </View>
        </View>

      {/*SCROLLABLE SECTION */}
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "white"}}>
        
          <TouchableOpacity style={{backgroundColor:"#F2F2F2", height:100, margin:"1%", borderColor:"#c9c8c7", borderRadius:9, borderWidth:1}} onPress={() => {navigation.navigate('medicationDetails')}}>
                <View style={{borderColor:"red", alignItems:"center", justifyContent:"center", justifyContent: "space-around", alignItems:"center", margin:"1%", flexDirection:"row", height:"99%", width:"100%"}}>
                  <View style={{borderColor:"red", borderRadius:15, width:50, marginLeft:0, borderColor:"rgba(181, 199, 235, 0.6)", borderWidth:1}}>
                    <Image source={medicine} resizeMode="contain" />
                  </View>
                  
                  <View style={{justifyContent:"center", borderColor:"red", width:80, height:70}}>
                    <Text style={{fontSize:15, fontWeight:700}}>Inhaler</Text>
                  </View>

                  <View style={{justifyContent:"center", borderColor:"red", width:80, height:70}}>
                    <Text style={{fontSize:15, fontWeight:700}}>Asthma</Text>
                  </View>

                  <View style={{justifyContent:"center", borderColor:"red", width:80, height:70}}>
                    <Text style={{fontSize:14, color:"#38baee", fontWeight:700}}>Available</Text>
                  </View>
                </View>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:"#F2F2F2", height:100, margin:"1%", borderColor:"#c9c8c7", borderWidth:1, borderRadius:9}} onPress={() => {navigation.navigate('medicationDetails')}}>
                <View style={{borderColor:"red", alignItems:"center", justifyContent:"center", justifyContent: "space-around", alignItems:"center", margin:"1%", flexDirection:"row", height:"99%", width:"100%"}}>
                  <View style={{borderColor:"red", borderRadius:15, width:50, marginLeft:0, borderColor:"rgba(181, 199, 235, 0.6)", borderWidth:1}}>
                    <Image source={medicine} resizeMode="contain" />
                  </View>
                  
                  <View style={{justifyContent:"center", borderColor:"red", width:80, height:70}}>
                    <Text style={{fontSize:15, fontWeight:700}}>Inhaler</Text>
                  </View>

                  <View style={{justifyContent:"center", borderColor:"red", width:80, height:70}}>
                    <Text style={{fontSize:15, fontWeight:700}}>Asthma</Text>
                  </View>

                  <View style={{justifyContent:"center", borderColor:"red", width:80, height:70}}>
                    <Text style={{fontSize:14, color:"red", fontWeight:700}}>Unavailable</Text>
                  </View>
                </View>
          </TouchableOpacity>
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

        <TouchableOpacity style={{borderRadius:10, borderColor: '#B9EEE9', borderWidth:1, backgroundColor:"#B4E4F3", height:"90%", marginTop:2, justifyContent:"center"}}  onPress={() => {
          navigation.navigate('prescriptions')  
        }}
        activeOpacity={0.8}
        underlayColor="gray"
        >
          <Image source={medicine} style={{height:30}} resizeMode="contain" />
          <Text style={{fontSize:9, textAlign:"center", color:"white"}}>Meds</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderColor:"red", height:"90%", marginTop:2, justifyContent:"center"}}  onPress={() => {
          navigation.navigate('myAppointments')
        }}>
          <Image source={calendar} style={{height:30}}  resizeMode="contain" />
          <Text style={{fontSize:9, textAlign:"center"}}>Apps</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{borderColor:"red", height:"90%", marginTop:2, justifyContent:"center"}}  onPress={() => {
          navigation.navigate('previousOrders')
        }}>
          <Image source={orders} style={{height:30}}  resizeMode="contain" />
          <Text style={{fontSize:9, textAlign:"center"}}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{borderColor:"red", height:"90%", marginTop:2, justifyContent:"center"}} onPress={() => {
          navigation.navigate('myDoctor')
        }}>
          <Image source={doctor} style={{height:30}}  resizeMode="contain" />
          <Text style={{fontSize:9, textAlign:"center"}}>My Doctor</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Prescription;
