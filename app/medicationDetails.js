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
import medicine from "../icons/icons/png/filled/medications/medicines.png";
import calendar from "../icons/icons/png/filled/symbols/calendar.png";
import emotion from "../icons/icons/png/filled/emotions/neutral.png";
import orders from "../icons/icons/png/filled/symbols/i_documents_accepted.png";
import settings from "../icons/icons/png/filled/symbols/ui_settings.png"
import menu from "../icons/icons/png/filled/symbols/ui_menu.png";
import call from "../icons/icons/png/filled/objects/phone.png";
import card from "../icons/icons/png/filled/objects/credit_card.png";
import { useRouter } from "expo-router";

const medicationDetails = () => {
  const navigation = useNavigation();
/*  const route = useRouter();*/

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {/* HEADER */}
      <View style={{width: "100%", height: 60, justifyContent:"center", flexDirection:"row", top:0, position:"sticky",borderBottomColor:"#cfcfcf", borderBottomWidth:1}}>
            <View style={{width: "20%", borderColor:"red", justifyContent:"center", alignItems:"center"}}>
              <TouchableOpacity style={{width:35, height:35, borderRadius:25, borderWidth:1, justifyContent:"center", alignItems:"center", borderColor: '#cfcfcf', margin:"1%", overflow:"hidden"}} onPress={() => {navigation.navigate('prescriptions')}}>
                <ImageBackground source={require('../icons/profilephotos/arrow.jpeg')} style={{width: 30, height: 30, position:"relative", bottom:0, top:0, left:0}}></ImageBackground>
              </TouchableOpacity>
            </View>
          <View style={{height: "100%", width:"80%", borderColor:"red", alignItems: "center", borderBottom:"solid 2px #cfcfcf"}}>
            <View style={{borderColor:"red", width:"80%", height:"100%", justifyContent:"center"}}>
              <Text style={{textAlign:"center", fontSize:25, fontWeight:700}}>Medication Details</Text>
            </View>
          </View>
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{borderBottomColor:"#898989", borderBottomWidth:1, flexDirection:"row", height:150}}>
          <View style={{borderColor:"red", width:"30%"}}>
            <View style={{borderColor:"#898989", borderRadius:9, justifyContent:"center", alignItems:"center", borderWidth:1, height:"96%", margin:"3%"}}>
              <ImageBackground source={require('../icons/profilephotos/inhaler.jpeg')} style={{width: 70, height: 100, position:"relative", bottom:0, top:0, left:0}}></ImageBackground>
            </View>
          </View>
          <View style={{borderColor:"red", width:"70%"}}>
            <View style={{borderColor:"red", height:"94%", margin:"2%"}}>
              <View style={{borderColor:"red", marginBottom:"1%", alignItems:"center", flexDirection:"row", fontSize:18, height:"25%"}}>
                <Text style={{borderColor:"red", color:"#898989", fontSize:17, fontWeight:500, width:"30%"}}>Name:</Text>
                <Text style={{borderColor:"red", fontSize:16, fontWeight:400, width:"70%"}}> Inhaler</Text>
              </View>
              <View style={{borderColor:"red", marginBottom:"1%", alignItems:"center", flexDirection:"row", fontSize:18, height:"25%"}}>
                <Text style={{borderColor:"red",color:"#898989", fontSize:17, fontWeight:500, width:"30%"}}>Status:</Text>
                <Text style={{borderColor:"red", color:"#38baee", fontSize:16, fontWeight:400, width:"70%"}}> Available</Text>
              </View>
              <View style={{borderColor:"red", marginBottom:"1%", alignItems:"center", flexDirection:"row", fontSize:18, height:"25%"}}>
                <Text style={{borderColor:"red", color:"#898989", fontSize:17, fontWeight:500, width:"30%"}}>Dosage:</Text>
                <Text style={{borderColor:"red", fontSize:16, fontWeight:400, width:"70%"}}> When need be</Text>
              </View>
              <View style={{borderColor:"red", marginBottom:"1%", alignItems:"center", flexDirection:"row", fontSize:18, borderWidthheight:"25%"}}>
                <Text style={{borderColor:"red", color:"#898989", fontSize:17, fontWeight:500, width:"30%"}}>Disease:</Text>
                <Text style={{borderColor:"red", fontSize:16, fontWeight:400, width:"70%"}}> Asthma</Text>
              </View>
            </View>
          </View>
          
        </View>
        {/*Description*/}
        <View style={{borderColor:"red", marginTop:"3%", height:30}}>
          <Text style={{borderColor:"red", marginLeft:"1%", height:"100%", fontSize:16, fontWeight:600}}>Description</Text>
        </View>
        <View style={{marginTop:"1%", height:170}}>
          <Text style={{color:"#898989", borderColor:"#898989", borderBottomWidth:1, margin:"1%", borderRadius:9, height:"93%"}}>An inhaler for asthma is a handheld device used to deliver medication directly into the lungs. It helps relieve symptoms such as shortness of breath, wheezing, and chest tightness by delivering a measured dose of medication (like bronchodilators or corticosteroids) as a fine mist or spray. Inhalers are portable, easy to use, and essential for managing asthma attacks quickly and effectively.</Text>
        </View>
        {/*Storage information*/}
        <View style={{borderColor:"red", marginTop:"3%", height:30}}>
          <Text style={{borderColor:"red", marginLeft:"1%", height:"100%", fontSize:17, fontWeight:600}}>Storage Information</Text>
        </View>
        <View style={{marginTop:"1%", height:80}}>
          <Text style={{color:"#898989", borderColor:"#898989", borderBottomWidth:1, margin:"1%", borderRadius:9, height:"93%"}}>Store your inhaler at room temperature, away from direct sunlight and moisture. Keep it in a dry place, and avoid storing it in the bathroom or near heat sources</Text>
        </View>
        {/**PRICE */}
        <View style={{borderColor:"898989", marginTop:"3%", height:40, alignItems:"center", flexDirection:"row", fontSize:18}}>
              <Text style={{borderColor:"red", marginLeft:"1%", width:"50%", height:"100%", fontSize:17, fontWeight:600}}>Price</Text>
             <Text style={{borderColor:"red", color:"#898989", marginRight:"4%", textAlign:"right", fontSize:17, fontWeight:500, width:"47%"}}>$45.00</Text>
        </View>

        {/**Order medication */}
        <View style={{borderColor:"red", justifyContent:"space-evenly", alignItems:"center", flexDirection:"row", marginTop:"10%", height:55}}>
            <TouchableOpacity style={{borderColor:"blue", backgroundColor:"#575799", borderRadius:24, justifyContent:"center", height:"80%", width:"70%"}}>
              <Text style={{textAlign:"center", fontSize:14, color:"white", fontWeight:700}}>Place Order</Text>
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

export default medicationDetails;
