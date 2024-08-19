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
import { TextInput } from "react-native-gesture-handler";

const orderPlacing = () => {
  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleButtonPressNext = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleButtonPressNo = () => {
    setIsModalVisible(false);
  };
  
  
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
              <Text style={{textAlign:"center", fontSize:25, fontWeight:700}}>This Week</Text>
            </View>
          </View>
          <View style={{width: "20%", borderColor:"red", justifyContent:"center", alignItems:"center"}}>
              
            </View>
        </View>
       <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{borderColor:"red", height:700}} >
            
            <View style={{borderColor:"red", margin:"1%", height:250}}>
            <View style={{borderColor:"#898989", borderWidth:1, margin:"1%", height:240, borderRadius:9}}>
                <View style={{borderBottomColor:"#898989", borderBottomWidth:1, margin:"1%", height:40, alignItems:"center", flexDirection:"row"}}>
                <Text style={{borderColor:"red", fontSize:18, fontWeight:700, width:"100%"}}>August 12, 2024 - 10:00AM</Text>
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
                <TouchableOpacity style={{borderColor:"blue", backgroundColor:"#B4E4F3", borderRadius:24, justifyContent:"center", height:"80%", width:"40%"}}>
                    <Text style={{textAlign:"center", fontSize:14, fontWeight:700}}>Reschedule</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderColor:"blue", backgroundColor:"#30B3DE", borderRadius:24, justifyContent:"center", height:"80%", width:"40%"}}  onPress={(handleButtonPressNext)}>
                    <Text style={{textAlign:"center", fontSize:14, color:"white", fontWeight:700}}>Cancel</Text>
                </TouchableOpacity>
                </View>         
            </View>

            <View style={{borderColor:"#898989", borderWidth:1, margin:"1%", height:240, borderRadius:9}}>
                <View style={{borderBottomColor:"#898989", borderBottomWidth:1, margin:"1%", height:40, alignItems:"center", flexDirection:"row"}}>
                <Text style={{borderColor:"red", fontSize:18, fontWeight:700, width:"100%"}}>August 16, 2024 - 10:00AM</Text>
                </View>
                <View style={{flexDirection:"row", margin:"1%", height:120}}>
                <View  style={{borderColor:"blue", width:"33%", flexDirection:"row"}}>
                    <ImageBackground source={require('../icons/profilephotos/doctor.jpg')} style={{width:"100%"}}></ImageBackground>
                </View>
                <View style={{borderColor:"red", width:"60%", marginLeft:"4%"}}>
                    <Text style={{borderColor:"red", fontSize:16, fontWeight:700, height:"30%"}}>Dr. Susan Wahome</Text>
                    <Text style={{borderColor:"red", fontSize:14, height:"30%"}}>Drug Administration</Text>
                    <View style={{borderColor:"red", flexDirection:"row", fontSize:12, height:"30%"}}>
                    <View style={{width:"10%", borderColor:"red"}}>
                        <Text style={{fontWeight:700}}>Id:</Text>
                    </View>
                    <View style={{width:"90%", borderColor:"red"}}>
                        <Text>9986d-755h3d-5536gk987</Text>
                    </View>
                    </View>

                </View>
                </View>
                <View style={{borderTopColor:"#898989", borderTopWidth:1, justifyContent:"space-evenly", alignItems:"center", flexDirection:"row", margin:"1%", height:55}}>
                <TouchableOpacity style={{borderColor:"blue", backgroundColor:"#B4E4F3", borderRadius:24, justifyContent:"center", height:"80%", width:"40%"}}>
                    <Text style={{textAlign:"center", fontSize:14, fontWeight:700}}>Reschedule</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderColor:"blue", backgroundColor:"#30B3DE", borderRadius:24, justifyContent:"center", height:"80%", width:"40%"}}  onPress={(handleButtonPressNext)}>
                    <Text style={{textAlign:"center", fontSize:14, color:"white", fontWeight:700}}>Cancel</Text>
                </TouchableOpacity>
                </View>         
            </View>
            {/*DISPLAY YES DIV*/}
            {isModalVisible && (
                <View style={{flex:1, borderWidth:1, borderColor:"#E3E3E3", bottom:0, shadowOpacity: 0.25,  shadowOffset: { width: 0,  height: 2,}, shadowColor: 'black', shadowRadius: 3.84, elevation: 15, borderRadius:8,  backgroundColor:"white", zIndex:22, top:"50%", bottom:0, position:"absolute",  height:175, margin:"5%"}}>
                <View style={{orderColor:"red", height:"70%", justifyContent:"center"}}>
                    <Text style={{textAlign:"center",alignItems:"center", fontSize:18, fontWeight:600}}>Are you sure you want to cancel the appointment?</Text>
                </View>
                        
                <View style={{flexDirection:"row", borderColor:"red", flexDirection:"row",  height:"25%"}}>
                      <View style={{width:"40%", borderColor:"red"}}></View>
                        <View style={{width:"60%", flexDirection:"row", borderColor:"red"}}>
                          <View style={{ borderColor:"red", justifyContent:"center", alignItems:"center", height:"100%", width:"50%"}}>
                            <TouchableOpacity style={{borderColor:"blue", borderRadius:24, justifyContent:"center", height:"60%", width:"80%"}} onPress={(handleButtonPressNo)}>
                              <Text style={{textAlign:"center",  fontSize:18, color:"#30B3DE", fontWeight:700, textAlign:"right"}}>No</Text>
                            </TouchableOpacity>
                          </View>
                          <View style={{ borderColor:"red", justifyContent:"center", alignItems:"center", height:"100%", width:"50%"}}>
                            <TouchableOpacity style={{borderColor:"blue", alignItems:"center",  borderRadius:24, justifyContent:"center", flexDirection:"row", height:"70%", width:"98%"}}>
                              <Text style={{textAlign:"left", width:"40%", borderColor:"red", fontSize:17, color:"#30B3DE", fontWeight:700}}>Yes</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                </View>
                )}      
            </View>
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

export default orderPlacing;
