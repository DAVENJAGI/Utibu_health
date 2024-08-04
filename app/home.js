import { View, ScrollView, SafeAreaView, Text, Image, ImageBackground, Alert, ImageBackgroundComponent } from "react-native";
import { useNavigation } from "expo-router"; // Correct import
/*import { ProfileScreen } from '../screens/profile'*/
/*import Navigator from '../routes/drawer'*/

import { COLORS, icons, SIZES } from "../jobsift-starter/constants";
import { ScreenHeaderBtn, Welcome } from "../jobsift-starter/components";
import { useState } from "react";
import { TouchableOpacity, TouchableHighlight } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';



import places from "../icons/icons/png/outline/places/home_alt.png";
import medicine from "../icons/icons/png/outline/medications/medicines.png";
import calendar from "../icons/icons/png/outline/symbols/calendar.png";
import smallcalendar from "../icons/icons/png/outline/symbols/calendar.png"
import clock from "../icons/icons/png/filled/symbols/clock.png"
import doctor from "../icons/icons/png/outline/people/doctor.png"
import lady from "../icons/profilephotos/lady.jpg"
import orders from "../icons/icons/png/outline/symbols/i_documents_accepted.png";
import settings from "../icons/icons/png/filled/symbols/ui_settings.png";
import { useRouter } from "expo-router";

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white" }}>
      {/* Removed incorrect options prop */}
      {/* HEADER OF THE HOME PAGE*/ }
      <View style={{width: "100%", height: 60, justifyContent:"center", top:0, position:"sticky",borderBottomColor:"#cfcfcf", borderBottomWidth:1}}>
          <View style={{height: "100%", flexDirection:"row", alignItems: "center", borderBottom:"solid 2px #cfcfcf"}}>
            <View style={{width: "50%"}}>
              <TouchableOpacity style={{width:50, height:50, borderRadius:25, borderWidth:1, borderColor: '#cfcfcf', marginLeft:"3%", overflow:"hidden"}} onPress={() => {navigation.navigate('myProfile')}}>
                <ImageBackground source={require('../icons/profilephotos/lady.jpg')} style={{width: 50, height: 50, position:"relative", bottom:0, top:0, left:0, width:60, height:60}}></ImageBackground>
              </TouchableOpacity>
            </View>
            <View style={{width: "50%", height:"100%", justifyContent:"center"}}>
              <TouchableOpacity style={{borderColor: '#cfcfcf', borderWidth:1, position:"absolute", right:0, height:30, width:30, borderRadius: 15, marginRight:10, backgroundColor:"#fff1e7"}}>
                <ImageBackground source={require('../icons/profilephotos/notification.png')} style={{position:"relative", bottom:"0", top:"0", left:"0", width:30, height:30}}></ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      
        {/*GREETING DIV*/}
          <View style={{ flex: 1, padding: SIZES.medium, backgroundColor:"rgba(255, 255, 255, 0.2)" }}>
            <Welcome />
          </View>

        {/*THE APPOINTMENTS DIV */}

          <View style={{borderTopColor:"rgba(237, 232, 208, 0.6)", borderTopWidth:1, borderTopLeftRadius:8, borderTopRightRadius:6, marginBottom:"1%", height:285}}>
            <View style={{margin:"1%", height:50, flexDirection:"row"}}>
              <View style={{borderColor:"red", flexDirection:"row", height:"100%", width: "60%", alignItems:"center", justifyContent:"center", fontWeight:"600", fontSize: "18px"}}>
                <View style={{borderColor:"red", width:"85%", height:"100%", justifyContent:"center",}}>
                  <Text style={{fontSize:15, fontWeight:800, textAlign:"left"}}>Upcoming Appointments</Text>
                </View>
                <View style={{marginLeft:0, backgroundColor:"#575799", alignItems:"center", borderRadius:11, width:22, height:22}}>
                  <Text style={{fontSize:16, color:"white", fontWeight:600, }}>3</Text>
                </View>
              </View>
              <View style={{borderColor:"red", height:"100%", width:"40%"}}>
                <TouchableOpacity style={{justifyContent:"center", height:"100%", fontSize: "18px"}}>
                  <Text style={{color:"#750137", fontSize:15, fontWeight:800, textAlign:"right", marginRight:5}}>View all</Text>
                </TouchableOpacity>
              </View>
            </View >
            
            <View style={{margin:"1%", height:200}}>
              <TouchableOpacity style={{height:210, borderRadius:9, display: "block", backgroundColor:"#1a6860"}}>
              <LinearGradient colors={['#575799', '#681A22']} style={{height: '100%',  borderRadius:9}} start={{ x: 0, y: 0 }}end={{ x: 0, y: 1 }}>
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
                          <View style={{justifyContent:"center", flexDirection:"row", height:"100%", width:"48%", color:"white", textAlign:"center", alignContent:'center'}}>
                            <View style={{width:"30%", justifyContent:"center",  alignItems:"center", left:0}}>
                              <Image source={smallcalendar} style={{width:25}} resizeMode="contain" />
                            </View>
                            <View style={{width:"70%", justifyContent:"center"}}>
                              <Text style={{textAlign:"left", fontSize:12, color:"white"}}> 07/08/2024</Text>
                            </View>
                          </View>
                          <View style={{borderRightColor:"rgba(255, 255, 255, 0.5)", borderRightWidth:1, alignSelf:"center", height:20}}></View>
                          <View style={{justifyContent:"center", flexDirection:"row", height:"100%", width:"48%", marginLeft:"2%", color:"white", textAlign:"center", alignContent:'center'}}>
                            <View style={{width:"30%", justifyContent:"center",  alignItems:"center"}}>
                              <Image source={clock} style={{width:23}} resizeMode="contain" />
                            </View>
                            <View style={{width:"70%", justifyContent:"center"}}>
                              <Text style={{textAlign:"left", fontSize:13, color:"white"}}> 08:00AM</Text>
                            </View>
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

      {/*HIGHLIGHTS*/}
        <View style={{borderColor:"red", height:260}}>
            <View style={{margin:"1%", height:50, flexDirection:"row"}}>
              <View style={{ height:"100%", width: "100%", justifyContent:"center"}}>
                <Text style={{fontSize:15, marginLeft:5, fontWeight:800, textAlign:"left"}}>My Summary</Text>
              </View>
            </View >

              <View style={{shadowColor: 'black', backgroundColor:"#F2F2F2", shadowOpacity: 0.9, shadowRadius: 10, shadowOffset: { width: 0, height: 1 }, height:70, margin:"1%", borderColor:"#E3E3E3", borderRadius:9, flexDirection:"row", borderWidth:1, justifyContent:"center", alignItems:"center"}}>
                <View style={{borderRadius:15, borderColor:"rgba(181, 199, 235, 0.6)", borderWidth:1, alignItems:"center", backgroundColor:"#fff1e7", width:30, marginLeft: "2%", justifyContent:"center", alignItems:"center", marginRight:"2%", height:30}}>
                  <Text style={{fontSize:16, fontWeight:700}}>4</Text>
                </View>
                <View style={{justifyContent:"center", width:"70%", height:30}}>
                  <Text style={{fontSize:18, color:"#750137", fontWeight:700}}>Orders awaiting approval</Text>
                </View>
              </View>
              <View style={{shadowColor: 'black', backgroundColor:"#F2F2F2", shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 1 }, height:70, margin:"1%", borderColor:"#E3E3E3", borderRadius:9, flexDirection:"row", borderWidth:1, justifyContent:"center", alignItems:"center"}}>
                <View style={{borderRadius:15, borderColor:"#cfcfcf", borderColor:"rgba(181, 199, 235, 0.6)", borderWidth:1, alignItems:"center", backgroundColor:"#fff1e7", width:30, marginLeft: "2%", justifyContent:"center", alignItems:"center", marginRight:"2%", height:30}}>
                    <Text style={{fontSize:16, fontWeight:700}}>3</Text>
                  </View>
                  <View style={{justifyContent:"center", width:"70%", height:50}}>
                    <Text style={{fontSize:18, color:"#750137", fontWeight:700}}>Appointments awaiting confirmation</Text>
                </View>
              </View> 
  
        </View>


      </ScrollView>



      
      {/*NAVIGATION MENU*/}
      <View
        style={{position: "absolute", flex: 1, backgroundColor: "#faf8f8", bottom: 0,left: 0, right: 0, height: 50, borderTopColor: "#CCCCCC", borderTopWidth: 1, flexDirection: "row", justifyContent: "space-evenly"}}
      >
        <TouchableOpacity style={{borderColor:"red", borderRadius:10, borderColor: '#B9EEE9', borderWidth:1, backgroundColor:"#B7B7D6", height:"90%", marginTop:2, justifyContent:"center"}} onPress={() => {}}>
          <Image source={places} style={{height:30}} resizeMode="contain" />
          <Text style={{fontSize:9, color:"white", textAlign:"center"}}>Home</Text>
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
          <Text style={{fontSize:9, textAlign:"center"}}>Apps</Text>
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

export default Home;
