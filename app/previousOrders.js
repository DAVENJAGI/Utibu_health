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
import medicine1 from "../icons/icons/png/filled/medications/pills_3.png";
import medicine2 from "../icons/icons/png/filled/devices/syringe.png";
import medicine4 from "../icons/icons/png/filled/devices/medicine_bottle.png";
import medicine3 from "../icons/icons/png/filled/medications/blister_pills_oval_x14.png";
import profile from "../icons/icons/png/filled/symbols/ui_user_profile.png";
import orders from "../icons/icons/png/filled/symbols/i_documents_accepted.png";
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
      {/* Removed incorrect options prop */}
      <View style={{width: "100%", height: 60, justifyContent:"center", backgroundColor: "#081b29"}}>
            <TouchableOpacity style={{marginLeft: 10, width: "50%"}} onPress={() => {
                navigation.navigate('home')}}>
                <Text style={{fontFamily: "Roboto",fontStyle: "italic", color: COLORS.lightWhite, fontWeight: "900", fontSize: 30}}>Utibu Health</Text>
                <Text style={{color: COLORS.lightWhite}}>Previous Orders</Text>
            </TouchableOpacity>
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

      <View>
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
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity onPress={() => {
            navigation.navigate('home')
        }}>
          <Image source={places} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.navigate('prescriptions')  
        }}
        underlayColor="gray"
        >
          <Image source={medicine} resizeMode="contain" />
        </TouchableOpacity>
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
      </View>
    </SafeAreaView>
  );
};

export default Orders;
