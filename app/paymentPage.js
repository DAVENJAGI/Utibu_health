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
import Checkbox from "react-native-checkbox";

const payment = () => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
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
      <View style={{width: "100%", height: 60, justifyContent:"center", flexDirection:"row", top:0, position:"sticky",borderBottomColor:"#cfcfcf", borderBottomWidth:1}}>
            <View style={{width: "20%", borderColor:"red", justifyContent:"center", alignItems:"center"}}>
              <TouchableOpacity style={{width:35, height:35, borderRadius:25, borderWidth:1, justifyContent:"center", alignItems:"center", borderColor: '#cfcfcf', margin:"1%", overflow:"hidden"}} onPress={() => {navigation.navigate('approvedOrders')}}>
                <ImageBackground source={require('../icons/profilephotos/arrow.jpeg')} style={{width: 30, height: 30, position:"relative", bottom:0, top:0, left:0}}></ImageBackground>
              </TouchableOpacity>
            </View>
          <View style={{height: "100%", width:"60%", borderColor:"red", alignItems: "center", borderBottom:"solid 2px #cfcfcf"}}>
            <View style={{borderColor:"red", width:"80%", height:"100%", justifyContent:"center"}}>
              <Text style={{textAlign:"center", fontSize:25, fontWeight:700}}>Payment</Text>
            </View>
          </View>
          <View style={{width: "20%", borderColor:"red", justifyContent:"center", alignItems:"center"}}></View>
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>
    
        {/*Description*/}
        <View style={{borderColor:"red", marginTop:"3%", height:30}}>
          <Text style={{borderColor:"red", marginLeft:"1%", height:"100%", fontSize:20, fontWeight:700}}>Mobile Money</Text>
        </View>
        <View style={{borderColor:"#cfcfcf", borderRadius:9, borderWidth:1, margin:"3%", height:90, alignItems:"center", flexDirection:"row", fontSize:18}}>
            <View style={{ marginLeft:"1%", width:"80%", height:"100%", flexDirection:"row", fontSize:17, fontWeight:600}}>
                <View style={{ width:"40%", overflow:"hidden", justifyContent:"center", alignItems:"center"}}>
                    <ImageBackground source={require('../icons/profilephotos/images.png')} style={{width: 70, height: 60, position:"relative", bottom:0, top:0, left:0}}></ImageBackground>
                </View>
                <View style={{justifyContent:"center", width:"60%"}}>
                    <Text style={{fontSize:17, fontWeight:700, color:"#898989", textAlign:"center",  width:"100%"}}>+254 796XXXXX2</Text>
                </View>
            </View>
            <View style={{justifyContent:"center", alignItems:"center",  marginLeft:"1%", width:"20%", height:"100%", fontSize:17}}>
                <Checkbox value={isChecked} onChange={(newValue) => setIsChecked(newValue)} label=""  boxType="circle"  checkedCheckBoxColor="#30B3DE" tintColor="#30B3DE" uncheckedCheckBoxColor="red"></Checkbox>
            </View>
        </View>
        {/*DISPLAY YES DIV*/}
        {isModalVisible && (
            <View sytyle={{ borderRadius:9, width:"100%"}}>
                <View style={{borderWidth:2, shadowOpacity: 0.25,  shadowOffset: { width: 0,  height: 2,}, shadowColor: 'black', shadowRadius: 3.84, elevation: 15, borderRadius:8,  backgroundColor:"white", zIndex:22, top:0, bottom:0, borderColor:"red", position:"absolute", borderWidth:1, borderColor:"#E3E3E3", height:180, margin:"5%", width:"90%"}}>
                    <View style={{orderColor:"red", height:"70%", justifyContent:"center"}}>
                        <Text style={{textAlign:"center",alignItems:"center", fontSize:18, fontWeight:700}}>Are you sure you want to complete transaction?</Text>
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
            </View>
        )}
        <View style={{borderColor:"#cfcfcf", borderRadius:9, borderWidth:1, margin:"3%", height:90, alignItems:"center", flexDirection:"row", fontSize:18}}>
            <View style={{ marginLeft:"1%", width:"80%", height:"100%", flexDirection:"row", fontSize:17, fontWeight:600}}>
                <View style={{ width:"40%", overflow:"hidden", justifyContent:"center", alignItems:"center"}}>
                    <ImageBackground source={require('../icons/profilephotos/airtelmoney.png')} style={{width: 100, height: 100, position:"relative", bottom:0, top:0, left:0}}></ImageBackground>
                </View>
                <View style={{justifyContent:"center", width:"60%"}}>
                    <Text style={{fontSize:17, fontWeight:700, color:"#898989", textAlign:"center",  width:"100%"}}>+254 755XXXXX7</Text>
                </View>
            </View>
            <View style={{justifyContent:"center", alignItems:"center",  marginLeft:"1%", width:"20%", height:"100%", fontSize:17}}>
                <Checkbox value={isChecked} onChange={(newValue) => setIsChecked(newValue)} label=""  boxType="circle"  checkedCheckBoxColor="#30B3DE" tintColor="#30B3DE" uncheckedCheckBoxColor="red"></Checkbox>
            </View>
        </View>
        <View style={{borderColor:"red", marginTop:"15%", height:30}}>
          <Text style={{borderColor:"red", marginLeft:"1%", height:"100%", fontSize:20, fontWeight:700}}>Other Payment Options</Text>
        </View>
        <View style={{borderColor:"#cfcfcf", borderRadius:9, borderWidth:1, margin:"3%", height:90, alignItems:"center", flexDirection:"row", fontSize:18}}>
            <TouchableOpacity style={{ marginLeft:"1%", width:"80%", height:"100%", flexDirection:"row", fontSize:17, fontWeight:600}}>
                <View style={{ width:"40%", overflow:"hidden", justifyContent:"center", alignItems:"center"}}>
                    <ImageBackground source={require('../icons/profilephotos/paypal.png')} style={{width: 70, height: 60, position:"relative", bottom:0, top:0, left:0}}></ImageBackground>
                </View>
                <View style={{justifyContent:"center", width:"60%"}}>
                    <Text style={{fontSize:17, fontWeight:700, color:"#898989", textAlign:"center",  width:"100%"}}>PayPal</Text>
                </View>
            </TouchableOpacity>
        </View>

        {/**NEXT BUTTON*/}
        <View style={{borderColor:"red", justifyContent:"space-evenly", alignItems:"center", flexDirection:"row", marginTop:"35%", height:55}}>
            <TouchableOpacity  style={{borderColor:"blue", backgroundColor:"#30B3DE", borderRadius:24, justifyContent:"center", height:"90%", width:"90%"}} onPress={(handleButtonPressNext)}>
              <Text style={{textAlign:"center", fontSize:14, color:"white", fontWeight:700}}>Next</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

export default payment;
