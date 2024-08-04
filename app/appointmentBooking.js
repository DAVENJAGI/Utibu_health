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

const appointmentBooking = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
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
              <TouchableOpacity style={{width:35, height:35, borderRadius:25, borderWidth:1, justifyContent:"center", alignItems:"center", borderColor: '#cfcfcf', margin:"1%", overflow:"hidden"}} onPress={() => {navigation.navigate('myDoctor')}}>
                <ImageBackground source={require('../icons/profilephotos/arrow.jpeg')} style={{width: 30, height: 30, position:"relative", bottom:0, top:0, left:0}}></ImageBackground>
              </TouchableOpacity>
            </View>
          <View style={{height: "100%", width:"60%", borderColor:"red", alignItems: "center", borderBottom:"solid 2px #cfcfcf"}}>
            <View style={{borderColor:"red", width:"100%", height:"100%", justifyContent:"center"}}>
              <Text style={{textAlign:"center", fontSize:25, fontWeight:700}}>Book Appointment</Text>
            </View>
          </View>
          <View style={{width: "20%", borderColor:"red", justifyContent:"center", alignItems:"center"}}>
              
            </View>
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{borderBottomColor:"#898989", borderBottomWidth:1, height:200}}>
            <View style={{borderColor:"red", marginTop:"3%", height:30}}>
                <Text style={{borderColor:"red", marginLeft:"1%", height:"100%", fontSize:16, fontWeight:600}}>Appointment Description</Text>
            </View>
            <View style={{borderColor:"red"}}>
                <TextInput placeholder="A brief description for the reason of the appointment" onChangeText={(newText) => setText(newText)} value={text} style={{margin:"1%", borderColor:"gray", justifyContent:"flex-start", textAlignVertical:"top", borderWidth:1, borderRadius:9, padding:"1%", height:150}} multiline></TextInput>
            </View>
        </View>
        {/*DISPLAY YES DIV*/}
        {isModalVisible && (
            <View sytyle={{ borderRadius:9, width:"100%"}}>
                <View style={{borderWidth:2, shadowOpacity: 0.25,  shadowOffset: { width: 0,  height: 2,}, shadowColor: 'black', shadowRadius: 3.84, elevation: 15, borderRadius:8,  backgroundColor:"white", zIndex:22, top:0, bottom:0, borderColor:"red", position:"absolute", borderWidth:1, borderColor:"gray", height:180, margin:"5%", width:"90%"}}>
                    <View style={{orderColor:"red", height:"60%", justifyContent:"center"}}>
                        <Text style={{textAlign:"center",alignItems:"center", fontSize:18, fontWeight:700}}>Are you sure you want to set up an appointment?</Text>
                    </View>
                    <View style={{flexDirection:"row", borderColor:"red", height:"40%"}}>
                        <View style={{ borderColor:"red", justifyContent:"center", alignItems:"center", height:"100%", width:"50%"}}>
                            <TouchableOpacity style={{borderColor:"blue", backgroundColor:"#FE9EA3", borderRadius:24, justifyContent:"center", height:"60%", width:"60%"}} onPress={(handleButtonPressNo)}>
                                <Text style={{textAlign:"center", color:"white", fontSize:14, color:"black", fontWeight:700}}>No</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderColor:"red",justifyContent:"center", alignItems:"center", height:"100%", width:"50%"}}>
                            <TouchableOpacity style={{borderColor:"blue", alignItems:"center", backgroundColor:"#2e6f40", borderRadius:24, justifyContent:"center", flexDirection:"row", height:"70%", width:"60%"}}>
                                <Text style={{textAlign:"center", width:"40%", borderColor:"red", fontSize:17, color:"white", fontWeight:700}}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )}

        {/*Day*/}
        <View style={{borderColor:"red", marginTop:"3%", height:30}}>
          <Text style={{borderColor:"red", marginLeft:"1%", height:"100%", fontSize:16, fontWeight:600}}>Day</Text>
        </View>
        <View style={{marginTop:"1%", borderColor:"red", height:100}}>
            <ScrollView horizontal={true} style={{flexDirection:"row", borderColor:"#AAAAAA", width:400}}>
                <View style={{overflow:"scroll", alignItems:"center", flexDirection:"row", justifyContent:"space-between", borderRadius:9, width:800, height:100}}>
                    <TouchableOpacity style={{borderColor:"blue", margin:"1%", backgroundColor:"#575799", borderRadius:24, justifyContent:"center", height:"55%",  width:120}}>
                        <Text style={{textAlign:"center", fontSize:14, color:"white", fontWeight:700}}>Today</Text>
                        <Text style={{textAlign:"center", fontSize:14, color:"white", fontWeight:700}}>Aug 4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderColor:"#575799", borderWidth:1, borderRadius:24, justifyContent:"center", height:"55%", width:120}}>
                        <Text style={{textAlign:"center", fontSize:14, fontWeight:700}}>Mon</Text>
                        <Text style={{textAlign:"center", fontSize:14, fontWeight:700}}>Aug 5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderColor:"#575799", margin:"1%", borderWidth:1, borderRadius:24, justifyContent:"center", height:"55%",  width:120}}>
                        <Text style={{textAlign:"center", fontSize:14, fontWeight:700}}>Tue</Text>
                        <Text style={{textAlign:"center", fontSize:14, fontWeight:700}}>Aug 6</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderColor:"#575799", margin:"1%", borderWidth:1, borderRadius:24, justifyContent:"center", height:"55%",  width:120}}>
                        <Text style={{textAlign:"center", fontSize:14, fontWeight:700}}>Wed</Text>
                        <Text style={{textAlign:"center", fontSize:14, fontWeight:700}}>Aug 7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderColor:"#575799", margin:"1%", borderWidth:1, borderRadius:24, justifyContent:"center", height:"55%",  width:120}}>
                        <Text style={{textAlign:"center", fontSize:14, fontWeight:700}}>Thur</Text>
                        <Text style={{textAlign:"center", fontSize:14, fontWeight:700}}>Aug 8</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>


        {/*Time*/}
        <View style={{borderColor:"red", marginTop:"3%", height:30}}>
          <Text style={{marginLeft:"1%", height:"100%", fontSize:16, fontWeight:600}}>Time</Text>
        </View>
        <View style={{marginTop:"1%", height:80}}>
            <ScrollView horizontal={true} style={{flexDirection:"row", width:400}}>
                <View style={{overflow:"scroll", alignItems:"center", flexDirection:"row", justifyContent:"space-between", borderRadius:9, width:1500, height:80}}>
                    <TouchableOpacity style={{margin:"1%", backgroundColor:"#575799", borderRadius:24, justifyContent:"center", height:"55%",  width:120}}>
                        <Text style={{textAlign:"center", fontSize:14, color:"white", fontWeight:700}}>00:00AM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderColor:"575799", borderWidth:1, margin:"1%", borderRadius:24, justifyContent:"center", height:"55%",  width:120}}>
                        <Text style={{textAlign:"center", fontSize:14, fontWeight:700}}>01:00AM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderColor:"575799", borderWidth:1, margin:"1%", borderRadius:24, justifyContent:"center", height:"55%",  width:120}}>
                        <Text style={{textAlign:"center", fontSize:14, fontWeight:700}}>02:00AM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderColor:"575799", borderWidth:1, margin:"1%", borderRadius:24, justifyContent:"center", height:"55%",  width:120}}>
                        <Text style={{textAlign:"center", fontSize:14, fontWeight:700}}>03:00AM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderColor:"575799", borderWidth:1, margin:"1%", borderRadius:24, justifyContent:"center", height:"55%",  width:120}}>
                        <Text style={{textAlign:"center", fontSize:14, fontWeight:700}}>04:00AM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderColor:"575799", borderWidth:1, margin:"1%", borderRadius:24, justifyContent:"center", height:"55%",  width:120}}>
                        <Text style={{textAlign:"center", fontSize:14, fontWeight:700}}>05:00AM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderColor:"575799", borderWidth:1, margin:"1%", borderRadius:24, justifyContent:"center", height:"55%",  width:120}}>
                        <Text style={{textAlign:"center", fontSize:14, fontWeight:700}}>06:00AM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderColor:"575799", borderWidth:1, margin:"1%", borderRadius:24, justifyContent:"center", height:"55%",  width:120}}>
                        <Text style={{textAlign:"center", fontSize:14, fontWeight:700}}>07:00AM</Text>
                    </TouchableOpacity>
                    
                </View>
            </ScrollView>
        </View>

        

        
        
        {/**NEXT BUTTON*/}
        <View style={{borderColor:"red", justifyContent:"space-evenly", alignItems:"center", flexDirection:"row", marginTop:"20%", height:55}}>
            <TouchableOpacity  style={{borderColor:"blue", backgroundColor:"#575799", borderRadius:24, justifyContent:"center", height:"90%", width:"90%"}} onPress={(handleButtonPressNext)}>
              <Text style={{textAlign:"center", fontSize:14, color:"white", fontWeight:700}}>Next</Text>
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

export default appointmentBooking;
