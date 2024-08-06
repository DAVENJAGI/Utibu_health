import { View, ScrollView, SafeAreaView, Text, Image, ImageBackground, Alert, Touchable } from "react-native";
import { useNavigation } from "expo-router"; // Correct import
/*import { ProfileScreen } from '../screens/profile'*/
/*import Navigator from '../routes/drawer'*/
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, icons, SIZES } from "../jobsift-starter/constants";
import { ScreenHeaderBtn, Welcome } from "../jobsift-starter/components";
import { useState, useEffect } from "react";
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
import doctor from "../icons/icons/png/outline/people/person.png"
import padlock from "../icons/icons/png/outline/symbols/ui_secure.png"
/*import About from "../jobsift-starter/components/jobdetails/about/About";*/

const Login = () => {
    const [typedTextHello, setTypedTextHello] = useState('');
    const [typedTextWelcome, setTypedTextWelcome] = useState('');
    const [typingComplete, setTypingComplete] = useState(false);
    const targetTextHello = 'Hello there.';
    const targetTextWelcome = 'Welcome Back to Utibu Health.';
    const typingSpeed = 50;

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
           
        <View style={{borderColor:"red", height: "100%"}}>
        <LinearGradient colors={['#48D1CC', '#D6F0F7', '#009FAE']} style={{height: '100%',  borderRadius:9}} start={{ x: 0, y: 0 }}end={{ x: 0, y: 1 }}>
          <View style={{justifyContent:"center",borderColor:"red", height:"30%", margin:"2%"}}>
            <View style={{height:"60%", margin:"2%"}}>
              <Text style={{alignSelf:"center", fontSize: 22, color:"white", textAlign:"center", fontWeight: "700"}}>{typedTextHello}</Text>
              <Text style={{fontSize: 25, alignSelf:"center", color:"white", marginTop:"2%", textAlign:"center", fontWeight: "800"}}>{typedTextWelcome}</Text>
            </View>

          </View>

          <View style={{margin:"1%", zIndex:21, backgroundColor:"white", borderColor:"#D6F0F7", borderWidth:1, height:425, borderRadius: 8}}>
            <View style={{flexDirection:"row", height:"15%", borderColor:"red"}}>
              <TouchableOpacity style={{ margin:"1%", flexDirection:"row", alignItems:"center", width:"48%", borderColor:"red"}}>
                <Text style={{fontSize:20, fontWeight:700,textAlign:"center", color:"#30B3DE", flexDirection:"row", width:"100%", borderColor:"red"}}>Login</Text>
              </TouchableOpacity>
              <View style={{marginLeft:"1%", backgroundColor:"#30B3DE", borderTopRightRadius:8, flexDirection:"row", width:"49%", borderColor:"blue"}}>
                <TouchableOpacity style={{margin:"1%", flexDirection:"row", alignItems:"center", width:"100%", borderColor:"red"}} onPress={() => {navigation.navigate('signUp')}}>
                  <Text style={{fontSize:18, fontWeight:700, color:"white",textAlign:"center", flexDirection:"row", width:"100%", borderColor:"red"}}>SignUp</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{alignItems: "center", borderColor:"#30B3DE", borderRadius:8, justifyContent: "center", flex: 1, flexDirection: "column"}}>
              <View  style={{alignItems: "center", width:"95%", height:"28%", borderColor:"blue"}}>
                <Text style={{alignItems: "center", margin:"1%", color:"#AAAAAA", width:"100%", height:"30%", fontWeight:700, fontSize:18, borderColor:"blue"}}>User email</Text>
                <View style={{borderColor:"red", position:"absolute", left:1, top:40, justifyContent:"center", height:46,width:47}}>
                  <Image source={doctor} style={{height:30, alignSelf:"center"}}  resizeMode="contain" />
                </View>
                <TextInput
                    style={{width: "100%", textAlign: "center", borderColor:"#AAAAAA", borderWidth:1, borderRadius:10, marginTop:"1%",height:"45%"}}
                    placeholder="johndoe1@gmail.com"
                    value={useremail}
                    onChangeText={setUserEmail}
                />
              </View>

              <View style={{alignItems: "center", width:"95%", height:"28%", borderColor:"blue"}}>
                <Text style={{alignItems: "center", margin:"1%", width:"100%",color:"#AAAAAA", height:"30%", fontWeight:700, fontSize:18, borderColor:"blue"}}>Password</Text>
                <View style={{borderColor:"red", position:"absolute", left:1, top:40, justifyContent:"center", height:46,width:47}}>
                  <Image source={padlock} style={{height:30, alignSelf:"center"}}  resizeMode="contain" />
                </View>
                <TextInput
                    style={{width: "100%", textAlign: "center", borderColor:"#AAAAAA", borderWidth:1, borderRadius:10, marginTop:"1%",height:"45%"}}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
              </View>
              <View style={{color:"red", fontSize:12,  width:"95%"}}>
                <TouchableOpacity style={{color:"red", alignSelf:"flex-end", fontSize:12, textAlign:"right", width:"40%"}}>
                  <Text style={{textAlign:"right", color:"red", fontSize:12}}>Forgot Password??</Text>
                </TouchableOpacity>
              </View>
              <View style={{borderColor:"red", justifyContent:"center", alignItems:"center", height:"20%", marginTop:"5%", width:"100%"}}>
                <TouchableOpacity style={{borderColor:"blue", backgroundColor:"#30B3DE", borderRadius:24, justifyContent:"center", height:60, width:"95%"}} onPress={handleLogin}>
                    <Text style={{fontSize: 15, textAlign: "center", color: "white"}}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          </LinearGradient>
        </View>

    </SafeAreaView>
  );
};

export default Login;
