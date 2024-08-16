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
import orders from "../icons/icons/png/outline/symbols/i_documents_accepted.png";
import doctor from "../icons/icons/png/outline/people/doctor.png"
import settings from "../icons/icons/png/filled/symbols/ui_settings.png"
import menu from "../icons/icons/png/filled/symbols/ui_menu.png";
import call from "../icons/icons/png/filled/objects/phone.png";
import card from "../icons/icons/png/filled/objects/credit_card.png";
import { useRouter } from "expo-router";

const myDoctor = () => {
  const navigation = useNavigation();
/*  const route = useRouter();*/

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {/* HEADER */}
      <View style={{width: "100%", height: 60, justifyContent:"center", flexDirection:"row", top:0, position:"sticky", borderBottomColor:"#cfcfcf", borderBottomWidth:1}}>
            <View style={{width: "20%", borderColor:"red", justifyContent:"center", alignItems:"center"}}>
              
            </View>
          <View style={{height: "100%", width:"60%", borderColor:"red", alignItems: "center", borderBottom:"solid 2px #cfcfcf"}}>
            <View style={{borderColor:"red", width:"80%", height:"100%", justifyContent:"center"}}>
              <Text style={{textAlign:"center", fontSize:25, fontWeight:700}}>Doctor Details</Text>
            </View>
          </View>
          <View style={{width: "20%", borderColor:"red", justifyContent:"center", alignItems:"center"}}>
            </View>
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{borderBottomColor:"#c9c8c7",alignItems:"center", borderBottomWidth:1, flexDirection:"row", height:200}}>
          <View style={{borderColor:"red", justifyContent:"center", width:"30%"}}>
            <View style={{borderColor:"#898989", borderRadius:60,  justifyContent:"center", alignItems:"center", borderWidth:1, overflow:"hidden", height:100, margin:"3%"}}>
              <ImageBackground source={require('../icons/profilephotos/doctor.jpg')} style={{width: 100, height: 100, position:"relative", bottom:0, top:0, left:0}}></ImageBackground>
            </View>
          </View>
          <View style={{height:170, width:"65%", marginLeft:"4%"}}>
                
                <View style={{borderColor:"red", flexDirection:"row", fontSize:12, height:"20%"}}>
                  <View style={{width:"30%", borderColor:"red"}}>
                    <Text style={{fontWeight:700, color:"#898989"}}>Name:</Text>
                  </View>
                  <View style={{width:"70%", borderColor:"red"}}>
                    <Text style={{fontSize:15, fontWeight:700}}>Dr. Susan Wahome</Text>
                  </View>
                </View>
                <View style={{borderColor:"red", flexDirection:"row", fontSize:12, height:"20%"}}>
                  <View style={{width:"30%", borderColor:"red"}}>
                    <Text style={{fontWeight:700, color:"#898989"}}>Licence:</Text>
                  </View>
                  <View style={{width:"70%", borderColor:"red"}}>
                    <Text style={{}}>zk2365dc</Text>
                  </View>
                </View>
                <View style={{borderColor:"red", flexDirection:"row", fontSize:12, height:"20%"}}>
                  <View style={{width:"30%", borderColor:"red"}}>
                    <Text style={{fontWeight:700, color:"#898989"}}>Email:</Text>
                  </View>
                  <View style={{width:"70%", borderColor:"red"}}>
                    <Text style={{}} numberOfLines={1} ellipsizeMode="tail">wahomesuzy39@gmail.com</Text>
                  </View>
                </View>
                <View style={{borderColor:"red", flexDirection:"row", fontSize:12, height:"20%"}}>
                  <View style={{width:"30%", borderColor:"red"}}>
                    <Text style={{fontWeight:700, color:"#898989"}}>Tel No:</Text>
                  </View>
                  <View style={{width:"70%", borderColor:"red"}}>
                    <Text style={{}} numberOfLines={1} ellipsizeMode="tail">+254 796894542</Text>
                  </View>
                </View>
                <View style={{borderColor:"red", flexDirection:"row", fontSize:12, height:"20%"}}>
                  <View style={{width:"30%", borderColor:"red"}}>
                    <Text style={{fontWeight:700, color:"#898989"}} numberOfLines={1} ellipsizeMode="tail">Hospital:</Text>
                  </View>
                  <View style={{width:"70%", borderColor:"red"}}>
                    <Text numberOfLines={1} ellipsizeMode="tail">Kenyatta National Hospital</Text>
                  </View>
                </View>

              </View>
          
        </View>
        {/*Description*/}
        <View style={{marginBottom:"1%", height:200}}>
          <View style={{borderColor:"red", backgroundColor:"white", marginLeft:"2%", zIndex:11, width:45, position:"absolute", top:3, height:30}}>
            <Text style={{borderColor:"red", color:"#898989", textAlign:"center", marginLeft:"1%", height:"100%", fontSize:16, fontWeight:600}}>About</Text>
          </View>
          <View style={{borderColor:"#c9c8c7", borderWidth:1, borderRadius:9, justifyContent:"center", margin:"1%", marginTop:15, height:"90%"}}>
            <View style={{marginTop:"1%", borderRadius:9, borderColor:"red", justifyContent:"center", height:"100%"}}>
              <Text style={{margin:"1%", paddingLeft:"1%", color:"#898989", borderRadius:9}}>Dr. Susan Wahome, a specialist in chronic diseases at Kenyatta National Hospital, excels in managing complex health conditions with a patient-centered approach, combining expert care with innovative treatment strategies. With over 20 years experiene, she has tremedous experience dealing with diseases such as kidney failure.</Text>
            </View>
          </View>
        </View>
        {/**Book Appointment */}
       <View style={{borderColor:"red", justifyContent:"space-evenly", alignItems:"center", marginTop:"35%", flexDirection:"row",  height:55}}>
            <TouchableOpacity style={{borderColor:"blue", backgroundColor:"#30B3DE", borderRadius:24, justifyContent:"center", height:"90%", width:"90%"}} onPress={() => {navigation.navigate('appointmentBooking')}}>
              <Text style={{textAlign:"center", fontSize:14, color:"white", fontWeight:700}}>Book Appointment</Text>
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
        <TouchableOpacity style={{borderColor:"red", height:"90%", marginTop:2, justifyContent:"center"}}  onPress={() => {
          navigation.navigate('myAppointments')
        }}>
          <Image source={calendar} style={{height:30}}  resizeMode="contain" />
          <Text style={{fontSize:9,  textAlign:"center"}}>Apps</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{borderColor:"red", height:"90%", marginTop:2, justifyContent:"center"}}  onPress={() => {
          navigation.navigate('previousOrders')
        }}>
          <Image source={orders} style={{height:30}}  resizeMode="contain" />
          <Text style={{fontSize:9, textAlign:"center"}}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{borderRadius:10, borderColor: '#B9EEE9', borderWidth:1, backgroundColor:"#B4E4F3",  height:"90%", marginTop:2, justifyContent:"center"}} onPress={() => {
          navigation.navigate('myDoctor')
        }}>
          <Image source={doctor} style={{height:30}}  resizeMode="contain" />
          <Text style={{fontSize:9, color:"white", textAlign:"center"}}>My Doctor</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default myDoctor;
