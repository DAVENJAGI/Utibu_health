import { View, ScrollView, SafeAreaView, Text, Image, ImageBackground, Alert, Touchable } from "react-native";
import { useNavigation } from "expo-router"; // Correct import
/*import { ProfileScreen } from '../screens/profile'*/
/*import Navigator from '../routes/drawer'*/

import { COLORS, icons, SIZES } from "../jobsift-starter/constants";
import { ScreenHeaderBtn, Welcome } from "../jobsift-starter/components";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native"; // Might need replacement
import { FlatList, TextInput } from 'react-native'
import { notMember } from "./notMember"
import { home } from "./home"
import { LinearGradient } from 'expo-linear-gradient';

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
    const [typedTextHello, setTypedTextHello] = useState('');
    const [typedTextWelcome, setTypedTextWelcome] = useState('');
    const [typingComplete, setTypingComplete] = useState(false); // Track typing completion
    const targetTextHello = 'Hello there.';
    const targetTextWelcome = 'Kindly contact your doctor to be signed up with utibu health';
    const typingSpeed = 10;

    useEffect(() => {
        if (!typingComplete) {
        const typeWriterHello = async () => {
            for (let i = 0; i < targetTextHello.length; i++) {
            await new Promise(resolve => setTimeout(resolve, typingSpeed));
            setTypedTextHello(prevText => prevText + targetTextHello[i]);
            }
            
            await new Promise(resolve => setTimeout(resolve, typingSpeed * 2));
            typeWriterWelcome();
            setTypingComplete(true);
        };

        typeWriterHello();
        }
    }, [typingComplete]);

    const typeWriterWelcome = async () => {
        for (let i = 0; i < targetTextWelcome.length; i++) {
        await new Promise(resolve => setTimeout(resolve, typingSpeed));
        setTypedTextWelcome(prevText => prevText + targetTextWelcome[i]);
        }
    };


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
    <SafeAreaView style={{ flex: 1}}>
      {/* Removed incorrect options prop */}
      
        <View style={{borderColor:"red", borderWidth:1, height: "100%"}}>
        <LinearGradient colors={['#48D1CC', '#D6F0F7', '#009FAE']} style={{height: '100%',  borderRadius:9}} start={{ x: 0, y: 0 }}end={{ x: 0, y: 1 }}>
          <View style={{margin:"1%", marginTop:"50%", backgroundColor:"white",  borderColor:"#30B3DE", borderWidth:1, height:"60%", borderRadius: 8}}>
            <View style={{flexDirection:"row", height:"15%", borderColor:"red", borderRadius:8}}>
            
              <TouchableOpacity style={{ borderTopLeftRadius:8, backgroundColor:"#30B3DE", flexDirection:"row", alignItems:"center", width:"48%", borderColor:"red"}} onPress={() => {navigation.navigate('login')}}>
                <Text style={{fontSize:18, fontWeight:700,textAlign:"center", color:"white", flexDirection:"row", width:"100%", borderColor:"red"}}>Login</Text>
              </TouchableOpacity>
              <View style={{marginLeft:"1%", borderTopRightRadius:8, flexDirection:"row", width:"49%", borderColor:"blue"}}>
                <TouchableOpacity style={{margin:"1%", flexDirection:"row", alignItems:"center", width:"100%", borderColor:"red"}}>
                  <Text style={{fontSize:20, fontWeight:700, color:"#30B3DE", textAlign:"center", flexDirection:"row", width:"100%", borderColor:"red"}}>SignUp</Text>
                </TouchableOpacity>
              </View>
              
            </View>
            <View style={{alignItems: "center", borderColor:"#30B3DE", borderRadius:8, justifyContent: "center", flex: 1, flexDirection: "column"}}>
            <View style={{justifyContent:"center", height:"60%", margin:"2%"}}>
                <View style={{height:"100%", margin:"2%"}}>
                    <Text style={{alignSelf:"center", color:"black",  fontSize: 22, textAlign:"center", fontWeight: "600"}}>{typedTextHello}</Text>
                    <Text style={{fontSize: 25, color:"black", alignSelf:"center", marginTop:"2%", textAlign:"center", fontWeight: "700"}}>{typedTextWelcome}</Text>
                </View>
                </View>
            </View>
          </View>
          </LinearGradient>
        </View>

    </SafeAreaView>
  );
};

export default Login;
