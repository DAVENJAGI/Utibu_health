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
import yes from "../icons/icons/png/outline/symbols/yes.png"
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

const approvedOrders = () => {
  const navigation = useNavigation();
/*  const route = useRouter();*/

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {/* HEADER */}
      <View style={{width: "100%", height: 60, justifyContent:"center", top:0, position:"sticky",borderBottomColor:"#cfcfcf"}}>
          <View style={{height: "100%", flexDirection:"row", alignItems: "center"}}>
            <View style={{borderColor:"red", width:"100%", height:"100%", justifyContent:"center"}}>
              <Text style={{textAlign:"center", fontSize:25, fontWeight:700}}>My Orders</Text>
            </View>
          </View>
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>
       <View style={{borderBottomColor:"#DBD0C8", borderBottomWidth:1, height:40}}>
        <View style={{borderColor:"red", height:30, flexDirection:"row", justifyContent:"space-between"}}>
          <TouchableOpacity style={{borderColor:"blue", justifyContent:"center", width:"30%"}} onPress={() => {navigation.navigate('previousOrders')}}>
            <Text style={{textAlign:"center", fontWeight:700, color:"#747C8B", fontSize:14}}>Placed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderColor:"blue", justifyContent:"center", flexDirection:"row", width:"30%"}} onPress={() => {navigation.navigate('approvedOrders')}}>
            <Text style={{textAlign:"center", fontWeight:600, alignSelf:"center", color:"#30B3DE", fontSize:14}}>Approved</Text>
            <Text style={{borderColor:"blue", marginTop:"6%", fontWeight:700, color:"white", position:"relative", textAlign:"center", backgroundColor:"#30B3DE", marginLeft:"5%", height:18, fontSize:12, borderRadius:11, width:18}}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderColor:"blue",  justifyContent:"center", width:"30%"}} onPress={() => {navigation.navigate('cancelledOrders')}}>
            
            <Text style={{textAlign:"center", fontWeight:600, color:"#747C8B", fontSize:14}}>Cancelled</Text>
          </TouchableOpacity>          
        </View>
        <View style={{borderColor:"black", height:8, flexDirection:"row", justifyContent:"space-between"}}>
            <View style={{borderColor:"blue", borderTopLeftRadius:4, borderTopRightRadius:4, borderBottomRightRadius:4, borderBottomLeftRadius:4, justifyContent:"center", height:"60%", width:"25%", marginLeft:"2.5%"}}></View>
            <View style={{borderColor:"blue", backgroundColor:"#30B3DE", borderTopLeftRadius:4, borderTopRightRadius:4, borderBottomRightRadius:4, borderBottomLeftRadius:4, justifyContent:"center", height:"60%", width:"26%"}}></View>
            <View style={{borderColor:"blue", borderTopLeftRadius:4, borderTopRightRadius:4, borderBottomRightRadius:4, borderBottomLeftRadius:4, justifyContent:"center", height:"60%", width:"25%", marginLeft:"2.5%"}}></View>
        </View>
       </View>

       <View style={{borderColor:"red", margin:"1%", height:250}}>
        <View style={{borderColor:"#898989", borderWidth:1, margin:"1%", height:240, borderRadius:9}}>
          <View style={{borderBottomColor:"#898989", borderBottomWidth:1, margin:"1%", height:40, alignItems:"center", flexDirection:"row"}}>
            < View style={{width:"20%", height:"80%", justifyContent:"center"}}>
                  <Text style={{fontWeight:700, color:"#898989", fontSize:16}}>Order Id:</Text>
                </View>
                <View style={{width:"80%", justifyContent:"center", height:"80%", borderColor:"red"}}>
                  <Text style={{fontWeight:500,  color:"#898989", fontSize:15}}>755bd-9968hc-2231155.</Text>
                </View>
          </View>
          <View style={{flexDirection:"row", margin:"1%", height:120}}>
            <View  style={{borderColor:"#898989", alignItems:"center", borderWidth:1, borderRadius:9, width:"33%", flexDirection:"row"}}>
              <ImageBackground source={require('../icons/profilephotos/metformin.jpeg')} style={{orderRadius:9, height:"90%", width:"100%"}}></ImageBackground>
            </View>
            <View style={{borderColor:"red", width:"60%", marginLeft:"4%"}}>
              <View style={{borderColor:"red", alignItems:"center", flexDirection:"row", fontSize:18, height:"18%"}}>
                <Text style={{borderColor:"red", color:"#898989", fontSize:17, fontWeight:500, width:"30%"}}>Name:</Text>
                <Text style={{borderColor:"red", fontSize:16, fontWeight:400, width:"70%"}}>Metformin</Text>
              </View>
              <View style={{borderColor:"red", alignItems:"center", flexDirection:"row", fontSize:18, height:"18%"}}>
                <Text style={{borderColor:"red", color:"#898989", fontSize:14, fontWeight:500, width:"30%"}}>Quantity:</Text>
                <Text style={{borderColor:"red", fontSize:14, fontWeight:400, width:"70%"}}> 2</Text>
              </View>
              <View style={{borderColor:"red", alignItems:"center", flexDirection:"row", fontSize:18, height:"18%"}}>
                <Text style={{borderColor:"red", color:"#898989", fontSize:14, fontWeight:500, width:"30%"}}>Status:</Text>
                <Text style={{borderColor:"red", fontSize:14, fontWeight:400, width:"70%"}}>Approved</Text>
              </View>
              <View style={{borderColor:"red", alignItems:"center", flexDirection:"row", fontSize:18, height:"18%"}}>
                <Text style={{borderColor:"red", color:"#898989", fontSize:14, fontWeight:500, width:"30%"}}>Price:</Text>
                <Text style={{borderColor:"red", fontSize:14, fontWeight:400, width:"70%"}}> $180.00</Text>
              </View>
              <View style={{borderColor:"red", alignItems:"center", flexDirection:"row", fontSize:18, height:"18%"}}>
                <Text style={{borderColor:"red", color:"#898989", fontSize:13, fontWeight:500, width:"40%"}}>Approved on:</Text>
                <Text style={{borderColor:"red", fontSize:14, fontWeight:400, width:"60%"}}>03/08/2024</Text>
              </View>
            </View>
          </View>
          <View style={{borderTopColor:"#898989", borderTopWidth:1, justifyContent:"space-evenly", alignItems:"center", flexDirection:"row", margin:"1%", height:55}}>
            <View style={{borderColor:"blue", alignItems:"center", backgroundColor:"#2e6f40", borderRadius:24, justifyContent:"center", flexDirection:"row", height:"80%", width:"60%"}}>
                <Image source={yes} style={{height:30, borderColor:"red"}} resizeMode="contain" />
              <Text style={{textAlign:"center", width:"40%", borderColor:"red", fontSize:17, color:"white", fontWeight:700}}>Approved</Text>
            </View>
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
        <TouchableOpacity style={{height:"90%", marginTop:2, justifyContent:"center"}}  onPress={() => {
          navigation.navigate('myAppointments')
        }}>
          <Image source={calendar} style={{height:30}}  resizeMode="contain" />
          <Text style={{fontSize:9, textAlign:"center"}}>Apps</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{borderRadius:10, borderColor: '#B9EEE9', borderWidth:1, backgroundColor:"#B7B7D6",  height:"90%", marginTop:2, justifyContent:"center"}}  onPress={() => {
          navigation.navigate('previousOrders')
        }}>
          <Image source={orders} style={{height:30}}  resizeMode="contain" />
          <Text style={{fontSize:9, color:"white", textAlign:"center"}}>Orders</Text>
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

export default approvedOrders;