import { View, ScrollView, SafeAreaView, Text, Image, ImageBackground, Alert, ImageBackgroundComponent } from "react-native";
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
import lady from "../icons/profilephotos/lady.jpg"
import orders from "../icons/icons/png/filled/symbols/i_documents_accepted.png";
import menu from "../icons/icons/png/filled/symbols/ui_menu.png";
import { useRouter } from "expo-router";

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* Removed incorrect options prop */}
      <ScrollView style={{borderColor:"red", borderWidth:1}} showsVerticalScrollIndicator={false}>
      {/* HEADER OF THE HOME PAGE*/ }
        <View style={{width: "100%", height: 70, justifyContent:"center", borderBottomColor:"#cfcfcf", borderBottomWidth:1}}>
          <View style={{height: "100%", flexDirection:"row", alignItems: "center", borderBottom:"solid 2px #cfcfcf"}}>
            <View style={{width: "50%"}}>
              <TouchableOpacity style={{width:60, height:60, borderRadius:30, borderWidth:1, borderColor: '#cfcfcf', margin:"1%", overflow:"hidden"}}>
                <ImageBackground source={require('../icons/profilephotos/lady.jpg')} style={{width: 60, height: 60, position:"relative", bottom:0, top:0, left:0, width:60, height:60}}></ImageBackground>
              </TouchableOpacity>
            </View>
            <View style={{width: "50%", height:"100%", justifyContent:"center"}}>
              <TouchableOpacity style={{borderColor: '#cfcfcf', borderWidth:1, position:"absolute", right:0, height:30, width:30, borderRadius: 15, marginRight:10, backgroundColor:"#fff1e7"}}>
                <ImageBackground source={require('../icons/profilephotos/notification.png')} style={{position:"relative", bottom:"0", top:"0", left:"0", width:30, height:30}}></ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {/*GREETING DIV*/}
          <View style={{ flex: 1, padding: SIZES.medium, borderColor:"red", borderWidth:1, margin:"1%" }}>
            <Welcome />
          </View>

        {/*THE APPOINTMENTS DIV */}

          <View style={{borderColor:"red", borderWidth:1, margin:"1%", height:275}}>
            <View style={{margin:"1%", height:50, flexDirection:"row"}}>
              <View style={{ height:"100%", width: "50%", justifyContent:"center", fontWeight:"600", fontSize: "18px"}}>
                <Text style={{fontSize:14, marginLeft:5, fontWeight:700, textAlign:"left"}}>Upcoming Appointments</Text>
              </View>
              <View style={{height:"100%", width:"50%"}}>
                <TouchableOpacity style={{justifyContent:"center", height:"100%", fontSize: "18px"}}>
                  <Text style={{color:"#750137", fontSize:15, fontWeight:800, textAlign:"right", marginRight:5}}>View all</Text>
                </TouchableOpacity>
              </View>
            </View >
            
            <View style={{margin:"1%", height:200}}>
              <TouchableOpacity style={{height:"95%", borderRadius:9, display: "block", backgroundColor:"#1a6860"}}>
              <LinearGradient colors={['#26A6D9', '#18A9E7', '#8FD9FB', '#8FFBF9', '#99DCFB']} style={{height: '100%',  borderRadius:9}} start={{ x: 0, x: 0.5, y: 0 }}end={{ x: 0, y: 1 }}>
                  <View style={{borderTopEndRadius:9, height:"65%", flexDirection:"row"}}>
                    <View style={{margin:"1%", alignItems:"center", flexDirection:"row", marginLeft: "5%", width:"90%"}}>
                      <View style={{height: 70, borderColor:"#cfcfcf", borderWidth:1, width: 70, marginLeft:3, overflow: "hidden", borderRadius:35}}>
                        <ImageBackground source={require('../icons/profilephotos/doctor.jpg')} style={{position:"relative", bottom:"0", top:"0", left:"0", width:70, height:70}}></ImageBackground>
                      </View>

                      <View style={{height:"85%", marginLeft: 15, width:"75%"}}>
                        <View style={{height:"50%", fontSize:"22px", justifyContent:'center', color:"white", fontWeight:"600"}}>
                          <Text style={{color:"white", fontWeight:600, marginLeft:3,fontSize: 18}}>Dr. Susan Wahome</Text>
                        </View>
                        <View style={{height:'45%', flexDirection:'row', margin:"1%"}}>
                          <View style={{justifyContent:"center", height:"100%", width:"50%", color:"white", textAlign:"center", alignContent:'center'}}>
                            <Text style={{textAlign:"left", fontSize:12, color:"white"}}> Day: 07/08/2024</Text>
                          </View>
                          <View style={{justifyContent:"center", height:"100%", width:"50%", marginRight:"1%", color:"white", textAlign:"center", alignContent:'center'}}>
                            <Text style={{textAlign:"center", fontSize:12, color:"white"}}> Time: 08:00 AM</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={{height:"35%", width:"100%", justifyContent:"center",alignItems:"center", flexDirection:"row"}}>
                    <View style={{backgroundColor:"solid 1px rgba(255, 255, 255, 0.2)", backfaceVisibility:"visible",borderColor:"rgba(255, 255, 255, 0.2)", height:"50%", width:"47%", marginLeft:1, border:"solid 1px rgba(255, 255, 255, 0.2)", justifyContent:"center", fontWeight:"600",  borderRadius:25}}>
                      <Text style={{textAlign:"center", fontSize:14, color:"white"}}> Starts in: 2 days</Text>
                    </View>              
                    <View style={{borderColor:"red", borderWidth:1, backgroundColor:"solid 1px rgba(255, 255, 255, 0.2)", backfaceVisibility:"visible",borderColor:"rgba(255, 255, 255, 0.2)", height:"50%", width:"45%", marginLeft:1, border:"solid 1px rgba(255, 255, 255, 0.2)", justifyContent:"center", fontWeight:"600",  borderRadius:25}}>
                      <Text style={{textAlign:"center", fontSize:14, color:"white"}}> General Consultation</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
        </View>

      </ScrollView>



      
      
      <View
        style={{position: "absolute", flex: 1, backgroundColor: "#faf8f8", bottom: 0,left: 0, right: 0, height: 50, borderTopColor: "#CCCCCC", borderTopWidth: 1, flexDirection: "row", justifyContent: "space-evenly"}}
      >
        <TouchableOpacity style={{borderColor:"red", borderRadius:10, borderColor: '#B9EEE9', borderWidth:1, backgroundColor:"#E2F8F6", height:"90%", marginTop:2, justifyContent:"center"}} onPress={() => {}}>
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
