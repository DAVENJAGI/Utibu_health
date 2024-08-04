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

import places from "../icons/icons/png/filled/places/home_alt.png";
import medicine from "../icons/icons/png/outline/people/person.png";
import calendar from "../icons/icons/png/filled/symbols/calendar.png";
import emotion from "../icons/icons/png/filled/emotions/neutral.png";
import orders from "../icons/icons/png/filled/symbols/i_documents_accepted.png";
import settings from "../icons/icons/png/outline/symbols/ui_settings.png"
import info from "../icons/icons/png/outline/symbols/info.png"
import menu from "../icons/icons/png/filled/symbols/ui_menu.png";
import call from "../icons/icons/png/filled/objects/phone.png";
import card from "../icons/icons/png/outline/objects/credit_card.png";
import { useRouter } from "expo-router";

const myProfile = () => {
  const navigation = useNavigation();
/*  const route = useRouter();*/

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {/* HEADER */}
        <View style={{width: "100%", height: 60, justifyContent:"center", flexDirection:"row", top:0, position:"sticky",borderBottomColor:"#cfcfcf", borderBottomWidth:1}}>
            <View style={{width: "20%", borderColor:"red", justifyContent:"center", alignItems:"center"}}>
              <TouchableOpacity style={{width:35, height:35, borderRadius:25, borderWidth:1, justifyContent:"center", alignItems:"center", borderColor: '#cfcfcf', margin:"1%", overflow:"hidden"}} onPress={() => {navigation.navigate('home')}}>
                <ImageBackground source={require('../icons/profilephotos/arrow.jpeg')} style={{width: 30, height: 30, position:"relative", bottom:0, top:0, left:0}}></ImageBackground>
              </TouchableOpacity>
            </View>
          <View style={{height: "100%", width:"60%", borderColor:"red", alignItems: "center", borderBottom:"solid 2px #cfcfcf"}}>
            <View style={{borderColor:"red", width:"100%", height:"100%", justifyContent:"center"}}>
              <Text style={{textAlign:"center", marginLeft:"1%", fontSize:25, fontWeight:700}}>Profile</Text>
            </View>
          </View>
          <View style={{width: "20%", borderColor:"red", justifyContent:"center", alignItems:"center"}}>
            </View>
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{borderBottomColor:"#AAAAAA", justifyContent:"center", alignItems:"center", borderBottomWidth:1, height:220}}>
          <View style={{borderColor:"#681A22", alignItems:"center", justifyContent:"center", height:120, width:120, borderRadius:60}}>
            <View style={{borderColor:"#6395ee", borderRadius:9, justifyContent:"center", alignItems:"center", borderWidth:2, height:120, width:120, borderRadius:60, overflow:'hidden'}}>
              <ImageBackground source={require('../icons/profilephotos/lady.jpg')} style={{width: 120, height: 120, position:"relative", bottom:0, top:0, left:0}}></ImageBackground>
            </View>
          </View>
          <View style={{marginTop:"5%", width:"30%", borderColor:"red"}}>
            <Text style={{textAlign:"center", fontWeight:700, fontSize:18}}>David Njagi</Text>
          </View>          
        </View>
        <View style={{borderRadius:1, height:1, width:"98%", margin:"1%"}}></View>
        {/*Description*/}
        <View style={{borderColor:"red", height:500}}>
            <TouchableOpacity style={{backgroundColor:"#F2F2F2", height:80, margin:"1%", borderColor:"#c9c8c7", borderRadius:9, borderWidth:1}} onPress={() => {navigation.navigate('')}}>
                <View style={{borderColor:"red", alignItems:"center", justifyContent:"center", justifyContent: "space-around", alignItems:"center", margin:"1%", flexDirection:"row", height:"99%", width:"100%"}}>
                  <View style={{borderColor:"red", borderRadius:15, alignItems:"center", justifyContent:"center",height:50, width:50, marginLeft:0, borderColor:"rgba(181, 199, 235, 0.6)", borderWidth:1}}>
                    <Image source={medicine} style={{height:40}} resizeMode="contain" />
                  </View>
                  
                  <View style={{justifyContent:"center", borderColor:"red", width:"55%"}}>
                    <Text style={{fontSize:16, color:"#681A22", fontWeight:700}}>Edit Profile Info</Text>
                  </View>

                </View>
          </TouchableOpacity>
          <View style={{borderRadius:1, height:1, width:"96%", backgroundColor:"#AAAAAA", margin:"2%"}}></View>
          <TouchableOpacity style={{backgroundColor:"#F2F2F2", height:80, margin:"1%", borderColor:"#c9c8c7", borderRadius:9, borderWidth:1}} onPress={() => {navigation.navigate('')}}>
                <View style={{borderColor:"red", alignItems:"center", justifyContent:"center", justifyContent: "space-around", alignItems:"center", margin:"1%", flexDirection:"row", height:"99%", width:"100%"}}>
                  <View style={{borderColor:"red", borderRadius:15, alignItems:"center", justifyContent:"center",height:50, width:50, marginLeft:0, borderColor:"rgba(181, 199, 235, 0.6)", borderWidth:1}}>
                    <Image source={card} style={{height:40}} resizeMode="contain" />
                  </View>
                  
                  <View style={{justifyContent:"center", borderColor:"red", width:"55%"}}>
                    <Text style={{fontSize:16, color:"#681A22", fontWeight:700}}>Payment Method</Text>
                  </View>

                </View>
          </TouchableOpacity>
          <View style={{borderRadius:1, height:1, width:"96%", backgroundColor:"#AAAAAA", margin:"2%"}}></View>
          <TouchableOpacity style={{backgroundColor:"#F2F2F2", height:80, margin:"1%", borderColor:"#c9c8c7", borderRadius:9, borderWidth:1}} onPress={() => {navigation.navigate('')}}>
                <View style={{borderColor:"red", alignItems:"center", justifyContent:"center", justifyContent: "space-around", alignItems:"center", margin:"1%", flexDirection:"row", height:"99%", width:"100%"}}>
                  <View style={{borderColor:"red", borderRadius:15, alignItems:"center", justifyContent:"center",height:50, width:50, marginLeft:0, borderColor:"rgba(181, 199, 235, 0.6)", borderWidth:1}}>
                    <Image source={settings} style={{height:40}} resizeMode="contain" />
                  </View>
                  
                  <View style={{justifyContent:"center", borderColor:"red", width:"55%"}}>
                    <Text style={{fontSize:16, color:"#681A22", fontWeight:700}}>Settings</Text>
                  </View>

                </View>
          </TouchableOpacity>
          <View style={{borderRadius:1, height:1, width:"96%", backgroundColor:"#AAAAAA", margin:"2%"}}></View>
          <TouchableOpacity style={{backgroundColor:"#F2F2F2", height:80, margin:"1%", borderColor:"#c9c8c7", borderRadius:9, borderWidth:1}} onPress={() => {navigation.navigate('')}}>
                <View style={{borderColor:"red", alignItems:"center", justifyContent:"center", justifyContent: "space-around", alignItems:"center", margin:"1%", flexDirection:"row", height:"99%", width:"100%"}}>
                  <View style={{borderColor:"red", borderRadius:15, alignItems:"center", justifyContent:"center",height:50, width:50, marginLeft:0, borderColor:"rgba(181, 199, 235, 0.6)", borderWidth:1}}>
                    <Image source={info} style={{height:40}} resizeMode="contain" />
                  </View>
                  
                  <View style={{justifyContent:"center", borderColor:"red", width:"55%"}}>
                    <Text style={{fontSize:16, color:"#681A22", fontWeight:700}}>Help Center</Text>
                  </View>

                </View>
          </TouchableOpacity>
          <View style={{borderRadius:1, height:1, width:"96%", backgroundColor:"#AAAAAA", margin:"2%"}}></View>
          <TouchableOpacity style={{backgroundColor:"#F2F2F2", height:80, margin:"1%", borderColor:"#c9c8c7", borderRadius:9, borderWidth:1}} onPress={() => {navigation.navigate('login')}}>
                <View style={{borderColor:"red", alignItems:"center", justifyContent:"center", justifyContent: "space-around", alignItems:"center", margin:"1%", flexDirection:"row", height:"99%", width:"100%"}}>
                  <View style={{justifyContent:"center", borderColor:"red", width:"96%"}}>
                    <Text style={{fontSize:20, textAlign:"center", color:"#681A22", fontWeight:800}}>Log Out</Text>
                  </View>

                </View>
          </TouchableOpacity>
        </View>


      </ScrollView>

      {/*NAVIGATION MENU*/}
      {/*
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
        <TouchableOpacity style={{borderColor:"red", borderRadius:10, borderColor: '#B9EEE9', borderWidth:1, backgroundColor:"#B7B7D6", height:"90%", marginTop:2, justifyContent:"center"}}  onPress={() => {
          navigation.navigate('myAppointments')
        }}>
          <Image source={calendar} style={{height:30}}  resizeMode="contain" />
          <Text style={{fontSize:9, color:"white", textAlign:"center"}}>Apps</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{borderColor:"red", height:"90%", marginTop:2, justifyContent:"center"}}  onPress={() => {
          navigation.navigate('previousOrders')
        }}>
          <Image source={orders} style={{height:30}}  resizeMode="contain" />
          <Text style={{fontSize:9, textAlign:"center"}}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{borderColor:"red", height:"90%", marginTop:2, justifyContent:"center"}} onPress={() => {
          navigation.navigate('profile')
        }}>
          <Image source={settings} style={{height:30}}  resizeMode="contain" />
          <Text style={{fontSize:9, textAlign:"center"}}>Settings</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

export default myProfile;
