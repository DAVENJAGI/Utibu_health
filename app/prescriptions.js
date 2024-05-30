import { View, ScrollView, SafeAreaView, Text, Image, ImageBackground, Alert } from "react-native";
import { useNavigation } from "expo-router"; // Correct import
/*import { ProfileScreen } from '../screens/profile'*/
/*import Navigator from '../routes/drawer'*/
import { useRoute } from '@react-navigation/native';

import { COLORS, icons, SIZES } from "../jobsift-starter/constants";
import { ScreenHeaderBtn, Welcome } from "../jobsift-starter/components";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
// import { home } from "../app/home"
import { profile } from "./profile";
import { myAppointments } from "./myAppointments";
// import { payment } from "../app/payment";
// import { unavailable } from "../app/unavailable";

import places from "../icons/icons/png/filled/places/home_alt.png";
import medicine from "../icons/icons/png/filled/medications/medicines.png";
import calendar from "../icons/icons/png/filled/symbols/calendar.png";
import medicine1 from "../icons/icons/png/filled/medications/pills_3.png";
import medicine2 from "../icons/icons/png/filled/devices/syringe.png";
import medicine4 from "../icons/icons/png/filled/devices/medicine_bottle.png";
import medicine3 from "../icons/icons/png/filled/medications/blister_pills_oval_x14.png";
import menu from "../icons/icons/png/filled/symbols/ui_menu.png";
import call from "../icons/icons/png/filled/objects/phone.png";
import card from "../icons/icons/png/filled/objects/credit_card.png";
import { useRouter } from "expo-router";

const Prescription = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const diseaseId = route.params?.diseaseId;
  console.log(diseaseId);
  /* This is where it will make the API request to get user's diseases with the use of disease ID from user
  const [medications, setMedications] = useState([]); // State to store retrieved diseases

  useEffect(() => {
    const fetchMedication = async () => {
      try {
        const response = await fetch(`http://0.0.0.0:5000/api/v1/disease/${diseaseId}/medication`);
        if (!response.ok) {
          throw new Error('Network response not OK');
        }
        const data = await response.json();
        console.log(data);
        console.log(data?.name)
        setMedications(data.medications); // Update state with fetched diseases
      } catch (error) {
        console.error('Error fetching diseases:', error);
        Alert.alert('Error', 'Failed to fetch diseases. Please try again later.');
      }
    };

    fetchMedication();
  }, [diseaseId]);
  */

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {/* Removed incorrect options prop */}
      <View style={{width: "100%", height: 60, justifyContent:"center", backgroundColor: "#081b29"}}>
            <TouchableOpacity style={{marginLeft: 10, width: "50%"}} onPress={() => {
                navigation.navigate('home')}}>
                <Text style={{fontFamily: "Roboto",fontStyle: "italic", color: COLORS.lightWhite, fontWeight: "900", fontSize: 30}}>Utibu Health</Text>
                <Text style={{color: COLORS.lightWhite}}>Prescriptions</Text>
            </TouchableOpacity>
        </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "#DDDDDD"}}>
        <TouchableOpacity style={{position: "relative", flex: 1, justifyContent: "space-between", flexDirection: "row", height: 100, marginTop: 5, borderRadius: 8, width: "99%", left: "0.5%", backgroundColor: "#CCCCCC"}} onPress={() => {
                navigation.navigate('payment')}}>
            <View style={{padding: SIZES.large}}>
                <Image
                    source={medicine1}
                    resizeMode="contain"
                />
            </View>
            <View style={{paddingLef: SIZES.small, justifyContent: "center"}}>
                <Text style={{fontSize: 13}}>{"metformin" || "Loading...." }</Text>
            </View>
            <View style={{padding: SIZES.small, justifyContent: "center"}}>
                <Text style={{fontSize: 13}}>Diabetes</Text>
            </View>
            <View style={{padding: SIZES.small, justifyContent: "center"}}>
                <Text style={{fontSize: 13}}>Available</Text>
            </View>
        </TouchableOpacity>

       
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

export default Prescription;
