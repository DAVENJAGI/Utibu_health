import { View, ScrollView, SafeAreaView, Text, Image, ImageBackground, Alert } from "react-native";
import { useNavigation } from "expo-router"; // Correct import
/*import { ProfileScreen } from '../screens/profile'*/
/*import Navigator from '../routes/drawer'*/

import { COLORS, icons, SIZES } from "../jobsift-starter/constants";
import { ScreenHeaderBtn, Welcome } from "../jobsift-starter/components";
import { useState } from "react";
import { TouchableOpacity } from "react-native"; // Might need replacement

import places from "../icons/icons/png/filled/places/home_alt.png";
import medicine from "../icons/icons/png/filled/medications/medicines.png";
import calendar from "../icons/icons/png/filled/symbols/calendar.png";
import orders from "../icons/icons/png/filled/symbols/i_documents_accepted.png";
import settings from "../icons/icons/png/filled/symbols/ui_settings.png"
import medicine1 from "../icons/icons/png/filled/medications/pills_3.png";
import medicine2 from "../icons/icons/png/filled/devices/syringe.png";
import medicine4 from "../icons/icons/png/filled/devices/medicine_bottle.png";
import medicine3 from "../icons/icons/png/filled/medications/blister_pills_oval_x14.png";
import profile from "../icons/icons/png/filled/symbols/ui_user_profile.png";
import menu from "../icons/icons/png/filled/symbols/ui_menu.png";
import completed from "../icons/icons/png/filled/symbols/yes.png";
import call from "../icons/icons/png/filled/objects/phone.png";
import card from "../icons/icons/png/filled/objects/credit_card.png";
import { useRouter } from "expo-router";

const Orders = () => {
  const navigation = useNavigation();
/*  const route = useRouter();*/

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {/* HEADER */}
      <View style={{width: "100%", height: 60, justifyContent:"center", top:0, position:"sticky",borderBottomColor:"#cfcfcf", borderBottomWidth:1}}>
          <View style={{height: "100%", flexDirection:"row", alignItems: "center", borderBottom:"solid 2px #cfcfcf"}}>
            <View style={{borderColor:"red", width:"100%", height:"100%", justifyContent:"center"}}>
              <Text style={{textAlign:"center", fontSize:25, fontWeight:700}}>My Orders</Text>
            </View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "#DDDDDD"}}>
        
            <View style={{position: "relative", justifyContent: "space-between", flex: 1, flexDirection: "row", height: 100, marginTop: 10, borderRadius: 8, width: "99%",left: "0.5%", backgroundColor: "#CCCCCC"}}>
                <View style={{padding: SIZES.large}}>
                    <Image
                        source={orders}
                        resizeMode="contain"
                    />
                </View>
                <View style={{padding: SIZES.xSmall, justifyContent: "center"}}>
                    <Text style={{fontSize: 13}}>Sulfonylurea</Text>
                </View>
                <View style={{padding: SIZES.xSmall, justifyContent: "center"}}>
                    <Text style={{fontSize: 13}}>Diabetes</Text>
                </View>
                <View style={{padding: SIZES.xSmall, justifyContent: "center"}}>
                    <Text style={{fontSize: 13}}>12/Jan/2022</Text>
                </View>
            </View>

            <View style={{position: "relative", justifyContent: "space-between", flex: 1, flexDirection: "row", height: 100, marginTop: 10, borderRadius: 8, width: "99%",left: "0.5%", backgroundColor: "#CCCCCC"}}>
                <View style={{padding: SIZES.large}}>
                    <Image
                        source={orders}
                        resizeMode="contain"
                    />
                </View>
                <View style={{padding: SIZES.xSmall, justifyContent: "center"}}>
                    <Text style={{fontSize: 13}}>Insulin</Text>
                </View>
                <View style={{padding: SIZES.xSmall, justifyContent: "center"}}>
                    <Text style={{fontSize: 13}}>Diabetes</Text>
                </View>
                <View style={{padding: SIZES.xSmall, justifyContent: "center"}}>
                    <Text style={{fontSize: 13}}>12/March/2022</Text>
                </View>
            </View>

            <View style={{position: "relative", justifyContent: "space-between", flex: 1, flexDirection: "row", height: 100, marginTop: 10, borderRadius: 8, width: "99%",left: "0.5%", backgroundColor: "#CCCCCC"}}>
                <View style={{padding: SIZES.large}}>
                    <Image
                        source={orders}
                        resizeMode="contain"
                    />
                </View>
                <View style={{padding: SIZES.xSmall, justifyContent: "center"}}>
                    <Text style={{fontSize: 13}}>Felodipine</Text>
                </View>
                <View style={{padding: SIZES.xSmall, justifyContent: "center"}}>
                    <Text style={{fontSize: 13}}>Hypertension</Text>
                </View>
                <View style={{padding: SIZES.xSmall, justifyContent: "center"}}>
                    <Text style={{fontSize: 13}}>27/05/2022</Text>
                </View>
            </View>

            <View style={{position: "relative", justifyContent: "space-between", flex: 1, flexDirection: "row", height: 100, marginTop: 10, borderRadius: 8, width: "99%",left: "0.5%", backgroundColor: "#CCCCCC"}}>
                <View style={{padding: SIZES.large}}>
                    <Image
                        source={orders}
                        resizeMode="contain"
                    />
                </View>
                <View style={{padding: SIZES.large, justifyContent: "center"}}>
                    <Text style={{fontSize: 13}}>ARVs</Text>
                </View>
                <View style={{padding: SIZES.large, justifyContent: "center"}}>
                    <Text style={{fontSize: 13}}>HIV</Text>
                </View>
                <View style={{padding: SIZES.large, justifyContent: "center"}}>
                    <Text style={{fontSize: 13}}>10/07/2022</Text>
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
          <Text style={{fontSize:9, color:"black", textAlign:"center"}}>Apps</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{borderRadius:10, borderColor: '#B9EEE9', borderWidth:1, backgroundColor:"#B7B7D6", height:"90%", marginTop:2, justifyContent:"center"}}  onPress={() => {
          navigation.navigate('previousOrders')
        }}>
          <Image source={orders} style={{height:30}}  resizeMode="contain" />
          <Text style={{fontSize:9, color:"white", textAlign:"center"}}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{borderColor:"red", height:"90%", marginTop:2, justifyContent:"center"}} onPress={() => {
          navigation.navigate('profile')
        }}>
          <Image source={settings} style={{height:30}}  resizeMode="contain" />
          <Text style={{fontSize:9, textAlign:"center"}}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Orders;
