import { View, ScrollView, SafeAreaView, Text, Image, ImageBackground, Alert } from "react-native";
import { useNavigation } from "expo-router"; // Correct import
/*import { ProfileScreen } from '../screens/profile'*/
/*import Navigator from '../routes/drawer'*/

import { COLORS, icons, SIZES } from "../jobsift-starter/constants";
import { ScreenHeaderBtn, Welcome } from "../jobsift-starter/components";
import { useState } from "react";
import { Switch, TouchableOpacity } from "react-native";
// import { profile } from "../app/profile";
// import { home } from "../app/home";
// import { prescriptions } from "../app/prescriptions";

import places from "../icons/icons/png/filled/places/home_alt.png";
import medicine from "../icons/icons/png/outline/people/person.png";
import calendar from "../icons/icons/png/filled/symbols/calendar.png";
import emotion from "../icons/icons/png/filled/emotions/neutral.png";
import orders from "../icons/icons/png/filled/symbols/i_documents_accepted.png";
import location from "../icons/icons/png/outline/symbols/geo_location.png"
import info from "../icons/icons/png/outline/symbols/info.png"
import menu from "../icons/icons/png/filled/symbols/ui_menu.png";
import call from "../icons/icons/png/filled/objects/phone.png";
import card from "../icons/icons/png/outline/objects/credit_card.png";
import { useRouter } from "expo-router";

const myProfile = () => {
  const navigation = useNavigation();
/*  const route = useRouter();*/
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleButtonPressNext = () => {
    setIsModalVisible(!isModalVisible);
    };

    const handleButtonPressNo = () => {
    setIsModalVisible(false);
    };
    
    const [isEnabled, setIsEnabled] = useState(false);
    const [locationEnabled, setLocationEnabled] = useState(false);
    const [notificationEnabled, setNotificationEnabled] = useState(false);

    const toggleLocationSwitch = () => setLocationEnabled(!locationEnabled);
    const toggleNotificationSwitch = () => setNotificationEnabled(!notificationEnabled);

  return (
    <SafeAreaView style={{ flex: 1, width:"100%", backgroundColor: COLORS.lightWhite }}>
      {/* HEADER */}
        <View style={{width: "100%", height: 60, justifyContent:"center", flexDirection:"row", top:0, position:"sticky",borderBottomColor:"#cfcfcf", borderBottomWidth:1}}>
            <View style={{width: "20%", borderColor:"red", justifyContent:"center", alignItems:"center"}}>
              <TouchableOpacity style={{width:35, height:35, borderRadius:25, borderWidth:1, justifyContent:"center", alignItems:"center", borderColor: '#cfcfcf', margin:"1%", overflow:"hidden"}} onPress={() => {navigation.navigate('myProfile')}}>
                <ImageBackground source={require('../icons/profilephotos/arrow.jpeg')} style={{width: 30, height: 30, position:"relative", bottom:0, top:0, left:0}}></ImageBackground>
              </TouchableOpacity>
            </View>
          <View style={{height: "100%", width:"60%", borderColor:"red", alignItems: "center", borderBottom:"solid 2px #cfcfcf"}}>
            <View style={{borderColor:"red", width:"100%", height:"100%", justifyContent:"center"}}>
              <Text style={{textAlign:"center", marginLeft:"1%", fontSize:25, fontWeight:700}}>Settings</Text>
            </View>
          </View>
          <View style={{width: "20%", borderColor:"red", justifyContent:"center", alignItems:"center"}}>
            </View>
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={{borderRadius:1, height:1, width:"98%", margin:"1%"}}></View>
        {/*Description*/}
        <View style={{borderColor:"red", height:500}}>
            <View style={{height:75, margin:"1%", borderColor:"#c9c8c7", marginBottom:"5%", borderWidth:1, borderRadius:9, borderRadius:9,}}>
                <View style={{borderColor:"red", alignItems:"center", justifyContent:"center", justifyContent: "space-around", alignItems:"center", margin:"1%", flexDirection:"row", height:"99%", width:"100%"}}>
                  <View style={{width:"15%"}}>
                    <View style={{borderRadius:25, alignItems:"center", justifyContent:"center",height:40, width:40, borderColor:"rgba(181, 199, 235, 0.6)"}}>
                      <Image source={location} style={{height:29}} resizeMode="contain" />
                    </View>
                  </View>
                  <View style={{width:"65%", marginRight:"1%"}}>
                    <View style={{justifyContent:"center", borderColor:"red", width:"55%"}}>
                      <Text style={{fontSize:17, fontWeight:700}}>Location</Text>
                    </View>
                  </View>
                  <View style={{width:"20%", marginRight:"1%"}}>
                    <View style={{justifyContent:"center", alignItems:"center", flexDirection:"row", borderColor:"red", width:"100%"}}>
                        <Switch trackColor={{ false: '#767577', true: '#81b0ff' }} thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'} ios_backgroundColor="#3e3e3e" onValueChange={toggleLocationSwitch} value={locationEnabled}/>
                    </View>
                  </View>

                </View>
          </View>

          <View style={{height:75, margin:"1%", borderColor:"#c9c8c7", borderWidth:1, borderRadius:9, borderRadius:9,}}>
                <View style={{borderColor:"red", alignItems:"center", justifyContent:"center", justifyContent: "space-around", alignItems:"center", margin:"1%", flexDirection:"row", height:"99%", width:"100%"}}>
                  <View style={{width:"15%"}}>
                    <View style={{borderRadius:25, alignItems:"center", justifyContent:"center",height:40, width:40, borderColor:"rgba(181, 199, 235, 0.6)"}}>
                        <ImageBackground source={require('../icons/profilephotos/notification.png')} style={{position:"relative", bottom:"0", top:"0", left:"0", width:33, height:33}}></ImageBackground>
                    </View>
                  </View>
                  <View style={{width:"65%", marginRight:"1%"}}>
                    <View style={{justifyContent:"center", borderColor:"red", width:"55%"}}>
                      <Text style={{fontSize:17, fontWeight:700}}>Notification</Text>
                    </View>
                  </View>
                  <View style={{width:"20%", marginRight:"1%"}}>
                    <View style={{justifyContent:"center", alignItems:"center", flexDirection:"row", borderColor:"red", width:"100%"}}>
                        <Switch trackColor={{ false: '#767577', true: '#81b0ff' }} thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'} ios_backgroundColor="#3e3e3e" onValueChange={toggleNotificationSwitch} value={notificationEnabled}/>
                    </View>
                  </View>

                </View>
          </View>
                       
            {/*DISPLAY YES DIV*/}
            {isModalVisible && (
                <View style={{shadowOpacity: 0.25, shadowOffset: { width: 0,  height: 2,}, shadowColor: 'black', shadowRadius: 3.84, elevation: 15, alignSelf:"center", top: '40%', borderRadius:8, backgroundColor:"white", zIndex:22, borderColor:"red", position:"absolute", borderWidth:1, borderColor:"#E3E3E3", height:180, margin:"5%", width:"90%"}}>
                    <View style={{orderColor:"red", height:"70%", justifyContent:"center"}}>
                        <Text style={{textAlign:"center",alignItems:"center", color:"#898989", fontSize:18, fontWeight:600}}>Are you sure you want to save changes?</Text>
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
      </ScrollView>
      <View style={{borderTopColor:"#EFEFEF", borderTopWidth:1, justifyContent:"space-evenly", alignItems:"center", flexDirection:"row", height:66}}>
            <TouchableOpacity style={{borderColor:"blue", backgroundColor:"#30B3DE", borderRadius:24, justifyContent:"center", height:"80%", width:"90%"}} onPress={(handleButtonPressNext)}>
                <Text style={{textAlign:"center", fontSize:16, color:"white", fontWeight:700}}>Save</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default myProfile;
