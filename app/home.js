import { View, ScrollView, SafeAreaView, Text, Image, ImageBackground, Alert } from "react-native";
import { useNavigation } from "expo-router"; // Correct import
// import { useRouter } from "expo-router";
import { useRoute } from '@react-navigation/native';
/*import { ProfileScreen } from '../screens/profile'*/
/*import Navigator from '../routes/drawer'*/

import { COLORS, icons, SIZES } from "../jobsift-starter/constants";
import { ScreenHeaderBtn, Welcome } from "../jobsift-starter/components";
import { useState, useEffect } from "react";
import { TouchableOpacity, TouchableHighlight } from "react-native"; // Might need replacement



import places from "../icons/icons/png/filled/places/home_alt.png";
import medicine from "../icons/icons/png/filled/medications/medicines.png";
import calendar from "../icons/icons/png/filled/symbols/calendar.png";
import orders from "../icons/icons/png/filled/symbols/i_documents_accepted.png";
import menu from "../icons/icons/png/filled/symbols/ui_menu.png";
// import { useRouter } from "expo-router";

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userObject = route.params?.userObject;
  console.log(userObject);

  const [greeting, setGreeting] = useState('');
  // A function that handles greetings
  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 0 && hours < 12) {
      setGreeting('Good morning');
    } else if (hours >= 12 && hours < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);
  // console.log(userObject.first_name);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {/* Removed incorrect options prop */}
      <View style={{width: "100%", height: 60, justifyContent:"center", backgroundColor: "#081b29"}}>
            <TouchableOpacity style={{marginLeft: 10, width: "50%"}} onPress={() => {
                navigation.navigate('home')}}>
                <Text style={{fontFamily: "Roboto",fontStyle: "italic", color: COLORS.lightWhite, fontWeight: "900", fontSize: 30}}>Utibu Health</Text>
                <Text style={{color: COLORS.lightWhite}}>Home</Text>
            </TouchableOpacity>
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <View>
            <View >
              <Text style={{fontSize: 40, fontWeight: "800", marginBottom: SIZES.medium}}>{greeting}, David</Text>
              <Text style={{fontSize: 20, fontWeight: "600"}}>Welcome to Utibu Health.</Text>
              <Text style={{fontSize: 15, fontWeight: "600"}}>Your go to medical clinic</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
        <TouchableOpacity onPress={() => {}}>
          <Image source={places} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableHighlight onPress={() => {
          // console.log(userObject.disease_id);
          // console.log{ diseaseId: userObject.disease_id }
          navigation.navigate('prescriptions');
        }}
        activeOpacity={0.8}
        underlayColor="gray"
        >
          <Image source={medicine} resizeMode="contain" />
        </TouchableHighlight>
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
    </SafeAreaView>
  );
};

export default Home;
