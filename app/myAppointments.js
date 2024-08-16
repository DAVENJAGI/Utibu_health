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
import doctor from "../icons/icons/png/outline/people/doctor.png"
import emotion from "../icons/icons/png/filled/emotions/neutral.png";
import orders from "../icons/icons/png/outline/symbols/i_documents_accepted.png";
import settings from "../icons/icons/png/filled/symbols/ui_settings.png"
import menu from "../icons/icons/png/filled/symbols/ui_menu.png";
import call from "../icons/icons/png/filled/objects/phone.png";
import card from "../icons/icons/png/filled/objects/credit_card.png";
import { useRouter } from "expo-router";

const Appointment = () => {
  const navigation = useNavigation();
/*  const route = useRouter();*/
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleButtonPressNext = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleButtonPressNo = () => {
    setIsModalVisible(false);
  };

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
      <View style={{borderColor:"red", height:700}} >
        <View style={{borderBottomColor:"#DBD0C8", borderBottomWidth:1, height:40}}>
          <View style={{borderColor:"red", height:30, flexDirection:"row", justifyContent:"space-between"}}>
            <TouchableOpacity style={{borderColor:"blue", flexDirection:"row", justifyContent:"center", width:"30%"}}>
              <Text style={{textAlign:"center", alignSelf:"center", borderColor:"red", fontWeight:700, color:"#30B3DE", fontSize:15}}>Upcoming</Text>
              <Text style={{borderColor:"blue", marginTop:"6%", fontWeight:700, color:"white", position:"relative", textAlign:"center", backgroundColor:"#30B3DE", marginLeft:"2%", height:18, fontSize:12, borderRadius:11, width:18}}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderColor:"blue", justifyContent:"center", width:"30%"}} onPress={() => {navigation.navigate('completedAppointments')}}>
              <Text style={{textAlign:"center", fontWeight:600,  color:"#747C8B", fontSize:14}}>Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderColor:"blue",  justifyContent:"center", width:"30%"}} onPress={() => {navigation.navigate('cancelledAppointments')}}>
              <Text style={{textAlign:"center", fontWeight:600, color:"#747C8B", fontSize:14}}>Cancelled</Text>
            </TouchableOpacity>          
          </View>
          <View style={{borderColor:"black", height:8, flexDirection:"row", justifyContent:"space-between"}}>
            <View style={{borderColor:"blue", backgroundColor:"#30B3DE", borderTopLeftRadius:4, borderTopRightRadius:4, borderBottomRightRadius:4, borderBottomLeftRadius:4, justifyContent:"center", height:"60%", width:"25%", marginLeft:"2.5%"}}></View>
          </View>
        </View>

        <View style={{borderColor:"red", margin:"1%", height:250}}>
          <View style={{borderColor:"#898989", borderWidth:1, margin:"1%", height:240, borderRadius:9}}>
            <View style={{borderBottomColor:"#898989", borderBottomWidth:1, margin:"1%", height:40, alignItems:"center", flexDirection:"row"}}>
              <Text style={{borderColor:"red", fontSize:18, fontWeight:700, width:"100%"}}>August 10, 2024 - 10:00AM</Text>
            </View>
            <View style={{flexDirection:"row", margin:"1%", height:120}}>
              <View  style={{borderColor:"blue", width:"33%", flexDirection:"row"}}>
                <ImageBackground source={require('../icons/profilephotos/doctor.jpg')} style={{width:"100%"}}></ImageBackground>
              </View>
              <View style={{borderColor:"red", width:"60%", marginLeft:"4%"}}>
                
                <View style={{borderColor:"red", flexDirection:"row", fontSize:12, height:"25%"}}>
                  <View style={{width:"30%", borderColor:"red"}}>
                    <Text style={{fontWeight:700}}>Doctor:</Text>
                  </View>
                  <View style={{width:"70%", borderColor:"red"}}>
                    <Text style={{fontSize:15, fontWeight:700}}>Susan Wahome</Text>
                  </View>
                </View>
                <View style={{borderColor:"red", flexDirection:"row", fontSize:12, height:"25%"}}>
                  <View style={{width:"30%", borderColor:"red"}}>
                    <Text style={{fontWeight:700}}>Type:</Text>
                  </View>
                  <View style={{width:"70%", borderColor:"red"}}>
                    <Text style={{}}>General Consultation</Text>
                  </View>
                </View>
                <View style={{borderColor:"red", flexDirection:"row", fontSize:12, height:"25%"}}>
                  <View style={{width:"30%", borderColor:"red"}}>
                    <Text style={{fontWeight:700}}>Status:</Text>
                  </View>
                  <View style={{width:"70%", borderColor:"red"}}>
                    <Text style={{color:"#30B3DE"}}>Confirmed</Text>
                  </View>
                </View>
                <View style={{borderColor:"red", flexDirection:"row", fontSize:12, height:"25%"}}>
                  <View style={{width:"30%", borderColor:"red"}}>
                    <Text style={{fontWeight:700}}>App Id:</Text>
                  </View>
                  <View style={{width:"70%", borderColor:"red"}}>
                    <Text numberOfLines={1} ellipsizeMode="tail">145bd-685gd41-2231155.</Text>
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
            <View style={{flex:1, borderWidth:1, borderColor:"#E3E3E3", bottom:0, shadowOpacity: 0.25,  shadowOffset: { width: 0,  height: 2,}, shadowColor: 'black', shadowRadius: 3.84, elevation: 15, borderRadius:8,  backgroundColor:"white", zIndex:22, top:"50%", bottom:0, position:"absolute",  height:180, margin:"3%"}}>
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
        <TouchableOpacity style={{borderColor:"red", borderRadius:10, borderColor: '#B9EEE9', borderWidth:1, backgroundColor:"#B4E4F3", height:"90%", marginTop:2, justifyContent:"center"}}  onPress={() => {
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

export default Appointment;
