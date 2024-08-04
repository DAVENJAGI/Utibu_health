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
import doctor from "../icons/icons/png/outline/people/doctor.png"
import orders from "../icons/icons/png/outline/symbols/i_documents_accepted.png";
import settings from "../icons/icons/png/outline/symbols/ui_settings.png"
import menu from "../icons/icons/png/filled/symbols/ui_menu.png";
import call from "../icons/icons/png/filled/objects/phone.png";
import card from "../icons/icons/png/filled/objects/credit_card.png";
import { useRouter } from "expo-router";

const completedAppointment = () => {
  const navigation = useNavigation();
/*  const route = useRouter();*/

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {/* HEADER */}
      <View style={{width: "100%", height: 60, justifyContent:"center", top:0, position:"sticky",borderBottomColor:"#cfcfcf"}}>
          <View style={{height: "100%", flexDirection:"row", alignItems: "center"}}>
            <View style={{borderColor:"red", width:"100%", height:"100%", justifyContent:"center"}}>
              <Text style={{textAlign:"center", fontSize:25, fontWeight:700}}>My Appointments</Text>
            </View>
          </View>
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>
       <View style={{borderBottomColor:"#DBD0C8", borderBottomWidth:1, height:40}}>
        <View style={{borderColor:"red", height:30, flexDirection:"row", justifyContent:"space-between"}}>
          <TouchableOpacity style={{borderColor:"blue", justifyContent:"center", width:"30%"}} onPress={() => {navigation.navigate('myAppointments')}}>
            <Text style={{textAlign:"center", fontWeight:700, color:"#747C8B", fontSize:14}}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderColor:"blue", justifyContent:"center", width:"30%"}} onPress={() => {navigation.navigate('completedAppointments')}}>
            <Text style={{textAlign:"center", fontWeight:600, color:"#30B3DE", fontSize:14}}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderColor:"blue",  justifyContent:"center", width:"30%"}} onPress={() => {navigation.navigate('cancelledAppointments')}}>
            <Text style={{textAlign:"center", fontWeight:600, color:"#747C8B", fontSize:14}}>Cancelled</Text>
          </TouchableOpacity>          
        </View>
        <View style={{borderColor:"black", height:8, flexDirection:"row", justifyContent:"space-between"}}>
            <View style={{borderColor:"blue", borderTopLeftRadius:4, borderTopRightRadius:4, borderBottomRightRadius:4, borderBottomLeftRadius:4, justifyContent:"center", height:"60%", width:"25%", marginLeft:"2.5%"}}></View>
            <View style={{borderColor:"blue", backgroundColor:"#30B3DE", borderTopLeftRadius:4, borderTopRightRadius:4, borderBottomRightRadius:4, borderBottomLeftRadius:4, justifyContent:"center", height:"60%", width:"25%", marginLeft:"2.5%"}}></View>
            <View style={{borderColor:"blue", borderTopLeftRadius:4, borderTopRightRadius:4, borderBottomRightRadius:4, borderBottomLeftRadius:4, justifyContent:"center", height:"60%", width:"25%", marginLeft:"2.5%"}}></View>
        </View>
       </View>

       <View style={{borderColor:"red", margin:"1%", height:250}}>
        <View style={{borderColor:"#898989", borderWidth:1, margin:"1%", height:240, borderRadius:9}}>
          <View style={{borderBottomColor:"#898989", borderBottomWidth:1, margin:"1%", height:40, alignItems:"center", flexDirection:"row"}}>
            <Text style={{borderColor:"red", fontSize:18, fontWeight:700, width:"100%"}}>August 1, 2024 - 08:00AM</Text>
          </View>
          <View style={{flexDirection:"row", margin:"1%", height:120}}>
            <View  style={{borderColor:"blue", width:"33%", flexDirection:"row"}}>
              <ImageBackground source={require('../icons/profilephotos/doctor.jpg')} style={{width:"100%"}}></ImageBackground>
            </View>
            <View style={{borderColor:"red", width:"60%", marginLeft:"4%"}}>
              <Text style={{borderColor:"red", fontSize:16, fontWeight:700, height:"30%"}}>Dr. Susan Wahome</Text>
              <Text style={{borderColor:"red", fontSize:14, height:"30%"}}>General Consultation</Text>
              <View style={{borderColor:"red", flexDirection:"row", fontSize:12, height:"30%"}}>
                <View style={{width:"10%", borderColor:"red"}}>
                  <Text style={{fontWeight:700}}>Id:</Text>
                </View>
                <View style={{width:"90%", borderColor:"red"}}>
                  <Text>145bd-685gd41-2231155.</Text>
                </View>
              </View>

            </View>
          </View>
          <View style={{borderTopColor:"#898989", borderTopWidth:1, justifyContent:"space-evenly", alignItems:"center", flexDirection:"row", margin:"1%", height:55}}>
            <TouchableOpacity style={{borderColor:"blue", backgroundColor:"#D3DEF3", borderRadius:24, justifyContent:"center", height:"80%", width:"60%"}}>
              <Text style={{textAlign:"center", fontSize:14, color:"black", fontWeight:700}}>Add Comment</Text>
            </TouchableOpacity>
          </View>         
        </View>
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
          navigation.navigate('myDoctor')
        }}>
          <Image source={doctor} style={{height:30}}  resizeMode="contain" />
          <Text style={{fontSize:9, textAlign:"center"}}>My Doctor</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default completedAppointment;
