import { View, ScrollView, SafeAreaView, Text, Image, ImageBackground, Alert } from "react-native";
import { useNavigation } from "expo-router"; // Correct import
/*import { ProfileScreen } from '../screens/profile'*/
/*import Navigator from '../routes/drawer'*/

import { COLORS, icons, SIZES } from "../jobsift-starter/constants";
import { ScreenHeaderBtn, Welcome } from "../jobsift-starter/components";
import { useState } from "react";
import { TouchableOpacity } from "react-native"; // Might need replacement
import { FlatList, TextInput } from 'react-native'
import { notMember } from "./notMember"
import { home } from "./home"


import places from "../icons/icons/png/filled/places/home_alt.png";
import medicine from "../icons/icons/png/filled/medications/medicines.png";
import calendar from "../icons/icons/png/filled/symbols/calendar.png";
import emotion from "../icons/icons/png/filled/emotions/neutral.png";
import menu from "../icons/icons/png/filled/symbols/ui_menu.png";
import call from "../icons/icons/png/filled/objects/phone.png";
import card from "../icons/icons/png/filled/objects/credit_card.png";
import { useRouter } from "expo-router";
/*import About from "../jobsift-starter/components/jobdetails/about/About";*/

const Login = () => {

    const navigation = useNavigation();

    const [useremail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');

    console.log(useremail);
    console.log(password);

    const handleLogin = () => {
    const correctEmail = 'njagidave@gmail.com';
    const correctPassword = '12345';

    if (useremail === correctEmail && password === correctPassword) {
      // Login successful, navigate to home screen
      navigation.navigate('home');
    } else {
      Alert.alert('Login Error', 'Invalid email or password');
    }
    };
    
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EEEEEE" }}>
      {/* Removed incorrect options prop */}
      
        <View style={{backgroundColor: "#EEEEEE", height: 300, marginTop: "40%", justifyContent:"center", alignItems: "center"}}>
          <Text style={{fontSize: 40, fontWeight: "800", marginBottom: SIZES.large}}>Utibu Health</Text>
          <View style={{width: "90%", borderRadius: 8, height: "120%", backgroundColor: "gray"}}>
            <View style={{alignItems: "center", justifyContent: "center", flex: 1, flexDirection: "column"}}>
                <TextInput
                    style={{width: "90%", textAlign: "center", height: "20%", backgroundColor: "white", marginBottom: SIZES.medium}}
                    placeholder="User-Email"
                    value={useremail}
                    onChangeText={setUserEmail}
                />
                <TextInput
                    style={{width: "90%", height: "20%", textAlign: "center", backgroundColor: "white", marginBottom: SIZES.medium}}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={{width: "90%", justifyContent: "center", borderRadius: 10, height: "20%", backgroundColor: "black"}} onPress={handleLogin}>
                    <Text style={{fontSize: 15, textAlign: "center", color: "white"}}>Login</Text>
                </TouchableOpacity>
            </View>
          </View>
          <View style={{position: "relative", flexDirection: "row"}}>
              <TouchableOpacity onPress={() => {
                navigation.navigate('notMember')}}>
                  <Text style={{color: "red"}}>Not Yet Signed Up?</Text>
              </TouchableOpacity>
            </View>
        </View>

    </SafeAreaView>
  );
};

export default Login;
