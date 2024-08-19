import { View, ScrollView, SafeAreaView, Text, Image, ImageBackground, Alert } from "react-native";
import { useNavigation } from "expo-router"; // Correct import
/*import { ProfileScreen } from '../screens/profile'*/
/*import Navigator from '../routes/drawer'*/

import { COLORS, icons, SIZES } from "../jobsift-starter/constants";
import { ScreenHeaderBtn, Welcome } from "../jobsift-starter/components";
import { useState } from "react";
import { TouchableOpacity, TextInput } from "react-native";
// import { profile } from "../app/profile";
// import { home } from "../app/home";
// import { prescriptions } from "../app/prescriptions";

import places from "../icons/icons/png/filled/places/home_alt.png";
import medicine from "../icons/icons/png/outline/people/person.png";
import calendar from "../icons/icons/png/filled/symbols/calendar.png";
import emotion from "../icons/icons/png/filled/emotions/neutral.png";
import orders from "../icons/icons/png/filled/symbols/i_documents_accepted.png";
import settings from "../icons/icons/png/outline/symbols/ui_settings.png"
import info from "../icons/icons/png/outline/symbols/info.png"
import menu from "../icons/icons/png/filled/symbols/ui_menu.png";
import call from "../icons/icons/png/filled/objects/phone.png";
import card from "../icons/icons/png/outline/objects/credit_card.png";
import { useRouter } from "expo-router";

const myProfile = () => {
  const navigation = useNavigation();
/*  const route = useRouter();*/
    const [isModalVisible, setIsModalVisible] = useState(false);

    /*Function responsible for handling the showing and hiding of the confirmation message*/
    const handleButtonPressNext = () => {
    setIsModalVisible(!isModalVisible);
    };
    const handleButtonPressNo = () => {
    setIsModalVisible(false);
    };

    /*Setting the variables for editing profile */
    const [isEditingFirstName, setIsEditingFirstName] = useState(false);
    const [isEditingLastName, setIsEditingLastName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingDob, setIsEditingDob] = useState(false)
    const [isEditingPhone, setIsEditingPhone] = useState(false)

    /*Loading the textInput with user data */
    const [first_name, setFirstName] = useState('David');
    const [last_name, setLastName] = useState('Njagi');
    const [email, setEmail] = useState('njagidave39@gmail.com');
    const [date_of_birth, setDob] = useState('02-09-2002');
    const [phone_no, setPhone] = useState('+254796894542');

    /*Handling the editing on pressing the view*/
    const handleFirstNameEditPress = () => {
        setIsEditingFirstName(true);
    };
    const handleLastNameEditPress = () => {
        setIsEditingLastName(true);
    };
    const handleEmailEditPress = () => {
        setIsEditingEmail(true);
    };
    const handleDobEditPress = () => {
        setIsEditingDob(true);
    };
    const handlePhoneEditPress = () => {
        setIsEditingPhone(true);
    };

  return (
    <SafeAreaView style={{ flex: 1, width:"100%", backgroundColor: COLORS.lightWhite }}>
      {/* HEADER */}
        <View style={{width: "100%", height: 60, justifyContent:"center", flexDirection:"row", top:0, position:"sticky",borderBottomColor:"#cfcfcf", borderBottomWidth:1}}>
            <View style={{width: "20%", borderColor:"red", justifyContent:"center", alignItems:"center"}}>
              <TouchableOpacity style={{width:35, height:35, borderRadius:25, borderWidth:1, justifyContent:"center", alignItems:"center", borderColor: '#cfcfcf', margin:"1%", overflow:"hidden"}} onPress={() => {navigation.navigate('myProfile')}}>
                <ImageBackground source={require('../icons/profilephotos/arrow.jpeg')} style={{width: 30, height: 30, position:"relative", bottom:0, top:0, left:0}}></ImageBackground>
              </TouchableOpacity>
            </View>
          <View style={{height: "100%", width:"60%", borderColor:"red", alignItems: "center", borderBottom:"solid 2px #cfcfcf"}}>
            <View style={{borderColor:"red", width:"100%", height:"100%", justifyContent:"center"}}>
              <Text style={{textAlign:"center", marginLeft:"1%", fontSize:25, fontWeight:700}}>Edit Profile</Text>
            </View>
          </View>
          <View style={{width: "20%", borderColor:"red", justifyContent:"center", alignItems:"center"}}>
            </View>
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{borderBottomColor:"#DBD0C8", justifyContent:"center", alignItems:"center", borderBottomWidth:1, height:220}}>
          <View style={{alignItems:"center", justifyContent:"center", height:120, width:120, borderRadius:60}}>
            <View style={{borderColor:"#AAAAAA", borderWidth:1, borderRadius:9, justifyContent:"center", alignItems:"center", height:120, width:120, borderRadius:60, overflow:'hidden'}}>
              <ImageBackground source={require('../icons/profilephotos/lady.jpg')} style={{width: 120, height: 120, position:"relative"}}></ImageBackground>
            </View>
          </View>
                    
        </View>
        <TouchableOpacity style={{alignSelf:"center", borderRadius:30, overflow:"hidden", width:45, backgroundColor:"white", borderWidth:1, justifyContent:"center", alignItems:"center", position:"absolute", height:45, marginTop:140, borderColor:"#AAAAAA"}}>
            <View style={{borderColor:"red", justifyContent:"center", alignItems:"center", width:40, height:40, overflow:"hidden"}}>
                <ImageBackground source={require('../icons/profilephotos/camera.png')} style={{width: 35, height: 20}}></ImageBackground>
            </View>
        </TouchableOpacity>
        <View style={{borderRadius:1, height:1, width:"98%", margin:"1%"}}></View>
        {/*Description*/}
        <View style={{borderColor:"red", height:"auto"}}>
            <View style={{marginBottom:"1%", height:80}}>
                <View style={{borderColor:"red", backgroundColor:"white", marginLeft:"4%", zIndex:11, width:80, position:"absolute", top:3, height:30}}>
                    <Text style={{borderColor:"red", color:"#898989", textAlign:"center", marginLeft:"1%", height:"100%", fontSize:16, fontWeight:600}}>First Name</Text>
                </View>
                <View style={{borderColor:"#c9c8c7", borderWidth:1, borderRadius:9, justifyContent:"center", margin:"2%", marginTop:15, height:60}}>
                    <TouchableOpacity style={{ marginTop: "1%", borderRadius: 9, borderColor: "red", justifyContent: "center", height: 60 }}  onPress={handleFirstNameEditPress}>
                        {isEditingFirstName ? (
                            <TextInput
                                style={{ fontSize: 17, margin: "1%", paddingLeft: "5%", borderRadius: 9 }}
                                value={first_name}
                                onChangeText={(text) => setFirstName(text)}
                                onBlur={handleFirstNameEditPress}
                            />
                        ) : (
                            <Text style={{ fontSize: 17, margin: "1%", paddingLeft: "5%", borderRadius: 9 }}>{first_name}</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{marginBottom:"1%", height:80}}>
                <View style={{borderColor:"red", backgroundColor:"white", marginLeft:"4%", zIndex:11, width:80, position:"absolute", top:3, height:30}}>
                    <Text style={{borderColor:"red", color:"#898989", textAlign:"center", marginLeft:"1%", height:"100%", fontSize:16, fontWeight:600}}>Last Name</Text>
                </View>
                <View style={{borderColor:"#c9c8c7", borderWidth:1, borderRadius:9, justifyContent:"center", margin:"2%", marginTop:15, height:60}}>
                    <TouchableOpacity style={{ marginTop: "1%", borderRadius: 9, borderColor: "red", justifyContent: "center", height: 60 }}  onPress={handleLastNameEditPress}>
                        {isEditingLastName ? (
                            <TextInput
                                style={{ fontSize: 17, margin: "1%", paddingLeft: "5%", borderRadius: 9 }}
                                value={last_name}
                                onChangeText={(text) => setLastName(text)}
                                onBlur={handleLastNameEditPress}
                            />
                        ) : (
                            <Text style={{ fontSize: 17, margin: "1%", paddingLeft: "5%", borderRadius: 9 }}>{last_name}</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            {/*DISPLAY YES DIV*/}
            {isModalVisible && (
                <View style={{shadowOpacity: 0.25,  shadowOffset: { width: 0,  height: 2,}, shadowColor: 'black', shadowRadius: 3.84, elevation: 15, borderRadius:8,  backgroundColor:"white", zIndex:22, top:0, bottom:0, borderColor:"red", position:"absolute", borderWidth:1, borderColor:"#E3E3E3", height:180, margin:"5%", width:"90%"}}>
                    <View style={{orderColor:"red", height:"70%", justifyContent:"center"}}>
                        <Text style={{textAlign:"center",alignItems:"center", color:"#898989", fontSize:18, fontWeight:600}}>Are you sure you want to save changes?</Text>
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
            )}
            <View style={{marginBottom:"1%", height:80}}>
                <View style={{borderColor:"red", backgroundColor:"white", marginLeft:"4%", zIndex:11, width:50, position:"absolute", top:3, height:30}}>
                    <Text style={{borderColor:"red", color:"#898989", textAlign:"center", marginLeft:"1%", height:"100%", fontSize:16, fontWeight:600}}>Email</Text>
                </View>
                <View style={{borderColor:"#c9c8c7", borderWidth:1, borderRadius:9, justifyContent:"center", margin:"2%", marginTop:15, height:60}}>
                    <TouchableOpacity style={{ marginTop: "1%", borderRadius: 9, borderColor: "red", justifyContent: "center", height: 60 }}  onPress={handleEmailEditPress}>
                        {isEditingEmail ? (
                            <TextInput
                                style={{ fontSize: 17, margin: "1%", paddingLeft: "5%", borderRadius: 9 }}
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                onBlur={handleEmailEditPress}
                            />
                        ) : (
                            <Text style={{ fontSize: 17, margin: "1%", paddingLeft: "5%", borderRadius: 9 }}>{email}</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{marginBottom:"1%", height:80}}>
                <View style={{borderColor:"red", backgroundColor:"white", marginLeft:"4%", zIndex:11, width:90, position:"absolute", top:3, height:30}}>
                    <Text style={{borderColor:"red", color:"#898989", textAlign:"center", marginLeft:"1%", height:"100%", fontSize:16, fontWeight:600}}>Date of Birth</Text>
                </View>
                <View style={{borderColor:"#c9c8c7", borderWidth:1, borderRadius:9, justifyContent:"center", margin:"2%", marginTop:15, height:60}}>
                    <TouchableOpacity style={{ marginTop: "1%", borderRadius: 9, borderColor: "red", justifyContent: "center", height: 60 }}  onPress={handleDobEditPress}>
                        {isEditingDob ? (
                            <TextInput
                                style={{ fontSize: 17, margin: "1%", paddingLeft: "5%", borderRadius: 9 }}
                                value={date_of_birth}
                                onChangeText={(text) => setDob(text)}
                                onBlur={handleDobEditPress}
                            />
                        ) : (
                            <Text style={{ fontSize: 17, margin: "1%", paddingLeft: "5%", borderRadius: 9 }}>{date_of_birth}</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{marginBottom:"1%", height:80}}>
                <View style={{borderColor:"red", backgroundColor:"white", marginLeft:"4%", zIndex:11, width:80, position:"absolute", top:3, height:30}}>
                    <Text style={{borderColor:"red", color:"#898989", textAlign:"center", marginLeft:"1%", height:"100%", fontSize:16, fontWeight:600}}>Phone No</Text>
                </View>
                <View style={{borderColor:"#c9c8c7", borderWidth:1, borderRadius:9, justifyContent:"center", margin:"2%", marginTop:15, height:60}}>
                    <TouchableOpacity style={{ marginTop: "1%", borderRadius: 9, borderColor: "red", justifyContent: "center", height: 60 }}  onPress={handlePhoneEditPress}>
                        {isEditingPhone ? (
                            <TextInput
                                style={{ fontSize: 17, margin: "1%", paddingLeft: "5%", borderRadius: 9 }}
                                value={phone_no}
                                onChangeText={(text) => setPhone(text)}
                                onBlur={handlePhoneEditPress}
                            />
                        ) : (
                            <Text style={{ fontSize: 17, margin: "1%", paddingLeft: "5%", borderRadius: 9 }}>{phone_no}</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <View style={{borderTopColor:"#EFEFEF", borderTopWidth:1, justifyContent:"space-evenly", marginTop:"5%", alignItems:"center", flexDirection:"row", height:66}}>
            <TouchableOpacity style={{borderColor:"blue", backgroundColor:"#30B3DE", borderRadius:24, justifyContent:"center", height:"80%", width:"90%"}} onPress={(handleButtonPressNext)}>
                <Text style={{textAlign:"center", fontSize:16, color:"white", fontWeight:700}}>Save</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
      
    </SafeAreaView>
  );
};

export default myProfile;
