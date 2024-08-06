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
  const [text, setText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [count, setCount] = useState(1);
  const price = 45;
   const totalAmount = count * price;

  // handle increment of the quantity on the clicking +
  const handleIncrement = () => {
    setCount(count + 1);
  };
  // HANDLE DECREMENT OF THE QUANTITY ON CLICKING -
  const handleDecrement = () => {
    if (count > 1 ){
        setCount(count - 1);
    }
  };

  //HANDLES TH HIDING AND SHOWING OF THE CONFIRMATIN DIV
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
              <TouchableOpacity style={{width:35, height:35, borderRadius:25, borderWidth:1, justifyContent:"center", alignItems:"center", borderColor: '#cfcfcf', margin:"1%", overflow:"hidden"}} onPress={() => {navigation.navigate('medicationDetails')}}>
                <ImageBackground source={require('../icons/profilephotos/arrow.jpeg')} style={{width: 30, height: 30, position:"relative", bottom:0, top:0, left:0}}></ImageBackground>
              </TouchableOpacity>
            </View>
          <View style={{height: "100%", width:"60%", borderColor:"red", alignItems: "center", borderBottom:"solid 2px #cfcfcf"}}>
            <View style={{borderColor:"red", width:"100%", height:"100%", justifyContent:"center"}}>
              <Text style={{textAlign:"center", fontSize:25, fontWeight:700}}>Place Order</Text>
            </View>
          </View>
          <View style={{width: "20%", borderColor:"red", justifyContent:"center", alignItems:"center"}}>
              
            </View>
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{borderColor:"red", marginTop:"3%", height:30}}>
          <Text style={{borderColor:"red", marginLeft:"1%", height:"100%", fontSize:16, fontWeight:600}}>Order Item</Text>
        </View>
        <View style={{borderBottomColor:"#E3E3E3", borderBottomWidth:1, flexDirection:"row", height:150}}>
          <View style={{borderColor:"red", width:"30%"}}>
            <View style={{borderColor:"#E3E3E3", borderRadius:9, justifyContent:"center", alignItems:"center", borderWidth:1, height:"96%", margin:"3%"}}>
              <ImageBackground source={require('../icons/profilephotos/inhaler.jpeg')} style={{width: 70, height: 100, position:"relative", bottom:0, top:0, left:0}}></ImageBackground>
            </View>
          </View>
          <View style={{borderColor:"red", width:"70%"}}>
            
            <View style={{borderColor:"red", height:"94%", margin:"2%"}}>
              <View style={{borderColor:"red", marginBottom:"1%", alignItems:"center", flexDirection:"row", fontSize:18, height:"20%"}}>
                <Text style={{borderColor:"red", color:"#898989", fontSize:17, fontWeight:500, width:"30%"}}>Name:</Text>
                <Text style={{borderColor:"red", fontSize:16, fontWeight:400, width:"70%"}}> Inhaler</Text>
              </View>
              <View style={{borderColor:"red", marginBottom:"1%", alignItems:"center", flexDirection:"row", fontSize:18, height:"20%"}}>
                <Text style={{borderColor:"red",color:"#898989", fontSize:15, fontWeight:500, width:"30%"}}>Status:</Text>
                <Text style={{borderColor:"red", color:"#38baee", fontSize:15, fontWeight:400, width:"70%"}}> Available</Text>
              </View>
              <View style={{borderColor:"red", marginBottom:"1%", alignItems:"center", flexDirection:"row", fontSize:18, height:"20%"}}>
                <Text style={{borderColor:"red", color:"#898989", fontSize:15, fontWeight:500, width:"30%"}}>Price:</Text>
                <Text style={{borderColor:"red", fontSize:15, fontWeight:400, width:"70%"}}> ${price}.00</Text>
              </View>
              <View style={{borderColor:"red", marginBottom:"1%", alignItems:"center", flexDirection:"row", fontSize:18, height:"20%"}}>
                <Text style={{borderColor:"red", color:"#898989", fontSize:15, fontWeight:500, width:"30%"}}>Dosage:</Text>
                <Text style={{borderColor:"red", fontSize:15, fontWeight:400, width:"70%"}}> When need be</Text>
              </View>
              <View style={{borderColor:"red", marginBottom:"1%", alignItems:"center", flexDirection:"row", fontSize:18, borderWidthheight:"20%"}}>
                <Text style={{borderColor:"red", color:"#898989", fontSize:15, fontWeight:500, width:"30%"}}>Disease:</Text>
                <Text style={{borderColor:"red", fontSize:15, fontWeight:400, width:"70%"}}> Asthma</Text>
              </View>
            </View>
          </View>
        </View>
        {/*DISPLAY YES DIV*/}
        {isModalVisible && (
            <View sytyle={{ borderRadius:9, width:"100%"}}>
                <View style={{borderWidth:2, shadowOpacity: 0.25,  shadowOffset: { width: 0,  height: 2,}, shadowColor: 'black', shadowRadius: 3.84, elevation: 15, borderRadius:8,  backgroundColor:"white", zIndex:22, top:0, bottom:0, borderColor:"red", position:"absolute", borderWidth:1, borderColor:"gray", height:180, margin:"5%", width:"90%"}}>
                    <View style={{orderColor:"red", height:"60%", justifyContent:"center"}}>
                        <Text style={{textAlign:"center",alignItems:"center", fontSize:18, fontWeight:700}}>Are you sure you want to place an order?</Text>
                    </View>
                    <View style={{flexDirection:"row", borderColor:"red", height:"40%"}}>
                        <View style={{ borderColor:"red", justifyContent:"center", alignItems:"center", height:"100%", width:"50%"}}>
                            <TouchableOpacity style={{borderColor:"blue", backgroundColor:"#0077B6", borderRadius:24, justifyContent:"center", height:"60%", width:"60%"}} onPress={(handleButtonPressNo)}>
                                <Text style={{textAlign:"center", color:"white", fontSize:14, color:"white", fontWeight:700}}>No</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderColor:"red",justifyContent:"center", alignItems:"center", height:"100%", width:"50%"}}>
                            <TouchableOpacity style={{borderColor:"blue", alignItems:"center", backgroundColor:"#30B3DE", borderRadius:24, justifyContent:"center", flexDirection:"row", height:"70%", width:"60%"}}>
                                <Text style={{textAlign:"center", width:"40%", borderColor:"red", fontSize:17, color:"white", fontWeight:700}}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )}

        

        {/*Time*/}
        <View style={{borderColor:"red", marginTop:"3%", height:30}}>
          <Text style={{marginLeft:"1%", height:"100%", fontSize:16, fontWeight:600}}>Quantity</Text>
        </View>
        <View style={{marginTop:"1%", height:80}}>
            <View style={{ borderBottomWidth:1, height:80, justifyContent:"center", alignItems:"center", borderBottomColor:"#E3E3E3"}}>
                    <View style={{flexDirection:"row", borderRadius:25, width:"60%", borderWidth:1, borderColor:"gray", height:"80%"}}>
                        <View style={{ borderLeftColor:"gray", borderRightWidth:1, justifyContent:"center", alignItems:"center", height:"100%", width:"34%"}}>
                            <TouchableOpacity style={{borderColor:"#575799", borderRadius:24, justifyContent:"center",height:60, width:60}} onPress={handleDecrement}>
                                <Text style={{textAlign:"center", fontSize:22, color:"black", fontWeight:700}}>-</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderColor:"red", justifyContent:"center", alignItems:"center", height:"100%", width:"33%"}}>
                            <View style={{borderRadius:24, justifyContent:"center", height:"60%", width:"60%"}}>
                                <Text style={{textAlign:"center", color:"gray", fontSize:19, color:"black", fontWeight:700}}>{count}</Text>
                            </View>
                        </View>
                        <View style={{ borderLeftColor:"gray", borderLeftWidth:1, justifyContent:"center", alignItems:"center", height:"100%", width:"34%"}}>
                            <TouchableOpacity style={{borderRadius:24, justifyContent:"center", height:60, width:60}} onPress={handleIncrement}>
                                <Text style={{textAlign:"center", fontSize:22, color:"black", fontWeight:700}}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        </View>

        {/*PRICE*/}
        <View style={{borderColor:"898989", marginTop:"10%", height:40, alignItems:"center", flexDirection:"row", fontSize:18}}>
              <Text style={{borderColor:"red", marginLeft:"1%", width:"50%", height:"100%", fontSize:17, fontWeight:600}}>Total Price:</Text>
             <Text style={{borderColor:"red", color:"#898989", marginRight:"4%", textAlign:"right", fontSize:17, fontWeight:500, width:"47%"}}>${totalAmount}.00</Text>
        </View>

        

        
        
        {/**NEXT BUTTON*/}
        <View style={{borderColor:"red", justifyContent:"space-evenly", alignItems:"center", flexDirection:"row", marginTop:"55%", height:55}}>
            <TouchableOpacity  style={{borderColor:"blue", backgroundColor:"#30B3DE", borderRadius:24, justifyContent:"center", height:"90%", width:"90%"}} onPress={(handleButtonPressNext)}>
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

export default orderPlacing;
