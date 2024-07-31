import { View, ScrollView, SafeAreaView, Text, Image, ImageBackground, Alert } from "react-native";
import { useNavigation } from "expo-router"; // Correct import
/*import { ProfileScreen } from '../screens/profile'*/
/*import Navigator from '../routes/drawer'*/

import { COLORS, icons, SIZES } from "../jobsift-starter/constants";
import { ScreenHeaderBtn, Welcome } from "../jobsift-starter/components";
import { useState } from "react";
import { TouchableOpacity, TouchableHighlight } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';



import places from "../icons/icons/png/filled/places/home_alt.png";
import medicine from "../icons/icons/png/filled/medications/medicines.png";
import calendar from "../icons/icons/png/filled/symbols/calendar.png";
import orders from "../icons/icons/png/filled/symbols/i_documents_accepted.png";
import menu from "../icons/icons/png/filled/symbols/ui_menu.png";
import { useRouter } from "expo-router";

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, border:"solid 1px red" }}>
      {/* Removed incorrect options prop */}
      <View style={{width: "100%", height: 70, justifyContent:"center", textAlign: "center"}}>
        <View style={{height: "100%", flexDirection:"row", alignItems: "center", borderBottom:"solid 1px #cfcfcf"}}>
          <View style={{width: "50%"}}>
            <TouchableOpacity style={{width:"60px", height:"60px", borderBottomLeftRadius:"50%", borderBottomRightRadius:"50%", borderTopLeftRadius:"50%", borderTopRightRadius:"50%", borderBottom: "solid 1px #cfcfcf", margin:"1%", overflow:"hidden"}}>
              <ImageBackground source={require('../icons/profilephotos/lady.jpg')} style={{position:"relative", bottom:"0", top:"0", left:"0", width:"60px", height:"60px"}}></ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={{width: "50%", height:"100%", justifyContent:"center"}}>
            <TouchableOpacity style={{border: "solid 1px #cfcfcf", position:"absolute", right:"0", height:"40px", width:"40px", margin: "1%", borderBottomLeftRadius:"50%", borderBottomRightRadius:"50%", borderTopLeftRadius:"50%", borderTopRightRadius:"50%", backgroundColor:"#fff1e7"}}>
              <ImageBackground source={require('../icons/profilephotos/notification.png')} style={{position:"relative", bottom:"0", top:"0", left:"0", width:"40px", height:"40px"}}></ImageBackground>
            </TouchableOpacity>
          </View>

        </View>
            <TouchableOpacity style={{marginLeft: 10, borderColor: "red", width: "50%"}} onPress={() => {
                navigation.navigate('home')}}>
            </TouchableOpacity>
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium, border:"solid 1px red", margin:"1%" }}>
          <Welcome />
        </View>
      </ScrollView>
      <View style={{border:"solid 1px red", margin:"1%", height:"73%"}}>
        <View style={{border:"solid 1px red", margin:"1%", height:"5%", flexDirection:"row"}}>
          <Text style={{border:"solid 1px red", height:"100%", width: "50%", alignContent:"center", fontWeight:"600", fontSize: "18px"}}>Upcoming Appointments</Text>
          <View style={{border:"solid 1px red", height:"100%", width:"50%"}}>
            <TouchableOpacity style={{border:"solid 1px red", justifyContent:"center", color:"#1a6860", height:"100%", textAlign:"end", fontWeight:"600", fontSize: "18px"}}>View all</TouchableOpacity>
          </View>
        </View >
        
        <View style={{margin:"1%", height:"25%"}}>
          <TouchableOpacity style={{height:"95%", color:"white", borderBottomLeftRadius:"9px", borderBottomRightRadius:"9px", borderTopLeftRadius:"9px", borderTopRightRadius:"9px", margin:'1%', display: "block", backgroundColor:"#1a6860"}}>
            <LinearGradient colors={['#2e6f40', '#415434', '#750137']} style={{height: '100%', borderBottomLeftRadius:"9px", borderBottomRightRadius:"9px", borderTopLeftRadius:"9px", borderTopRightRadius:"9px"}} start={{ x: 0, y: 0 }}end={{ x: 1, y: 0 }}>
              <View style={{borderTopEndRadius:"9px", height:"65%", flexDirection:"row"}}>
                <View style={{margin:"1%", alignItems:"center", flexDirection:"row", marginLeft: "5%", width:"90%"}}>
                  <View style={{height: "60px", width: "60px", marginLeft:"5%", overflow: "hidden", borderBottomLeftRadius:"50%", borderBottomRightRadius:"50%", borderTopLeftRadius:"50%", borderTopRightRadius:"50%"}}>
                    <ImageBackground source={require('../icons/profilephotos/doctor.jpg')} style={{position:"relative", bottom:"0", top:"0", left:"0", width:"60px", height:"60px"}}></ImageBackground>
                  </View>
                  <View style={{height:"85%", marginLeft:"5%", width:"70%"}}>
                    <Text style={{height:"50%", fontSize:"22px", alignContent:'center', color:"white", fontWeight:"600"}}>Dr. Susan Wahome</Text>
                    <View style={{height:"50%", flexDirection:'row'}}>
                      <Text style={{border:"solid 1px rgba(255, 255, 255, 0.2)", borderBottomLeftRadius:"9px", borderBottomRightRadius:"9px", borderTopLeftRadius:"9px", borderTopRightRadius:"9px", height:"100%", width:"50%", marginRight:"1%", color:"white", textAlign:"center", fontWeight:"600", alignContent:'center'}}>Day: 07/08/2024</Text>
                      <Text style={{border:"solid 1px rgba(255, 255, 255, 0.2)", borderBottomLeftRadius:"9px", borderBottomRightRadius:"9px", borderTopLeftRadius:"9px", borderTopRightRadius:"9px", height:"100%", width:"50%", color:"white", textAlign:"center", fontWeight:"600", alignContent:'center'}}>Time: 08:00 AM</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{height:"35%", width:"100%", alignItems:"Center", justifyContent:'center', flexDirection:"row"}}>
                <View style={{backfaceVisibility:"visible",border:"solid 1px rgba(255, 255, 255, 0.2)", backgroundColor:'rgba(255, 255, 255, 0.2)', height:"50%", width:"30%",marginLeft:"5%", textAlign:"center", justifyContent:"center", fontWeight:"600", borderBottomLeftRadius:"9px", borderBottomRightRadius:"9px", borderTopLeftRadius:"9px", borderTopRightRadius:"9px"}}>Starts in: 2 Days</View>              
                <View style={{backfaceVisibility:"visible",border:"solid 1px rgba(255, 255, 255, 0.2)", backgroundColor:'rgba(255, 255, 255, 0.2)', height:"50%", width:"35%",marginLeft:"5%", textAlign:"center", justifyContent:"center", fontWeight:"600", overflow:'hidden', borderBottomLeftRadius:"9px", borderBottomRightRadius:"9px", borderTopLeftRadius:"9px", borderTopRightRadius:"9px"}}>General Consultation</View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
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
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity style={{backgroundColor:'rgba(125, 81, 61, 0.1)'}} onPress={() => {}}>
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
