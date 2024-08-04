import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { login } from "./app/login";
import { profile } from "./app/profile";
import { home } from "./app/home";
import { prescriptions } from "./app/previousOrders";
import { notMember } from "./app/notMember";
import { medicationDetails } from "./app/medicationDetails";
import { completedAppointments } from "./app/completedAppointments";
import { cancelledOrders } from "./app/cancelledOrders";
import { approvedOrders } from "./app/approvedOrders";
import { myProfile } from "./app/myProfile";

const Stack = createStackNavigator();

console.log("enter")

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName= "home">
        <Stack.Screen name="LogIn" component={login}/>
        <Stack.Screen name="Home" component={home} />
        <Stack.Screen name="myDoctor" component={myDoctor}/>
        <Stack.Screen name="Prescriptions" component={prescriptions}/>
        <Stack.Screen name="PreviousOrders" component={previousOrders}/>
        <Stack.Screen name="notMember" component={notMember} />
        <Stack.Screen name="medicationDetails" component={medicationDetails} />
        <Stack.Screen name="completedAppointments" component={completedAppointments}/>
        <Stack.Screen name="cancelledAppointments" component={cancelledAppointments}/>
        <Stack.Screen name="cancelledOrders" component={cancelledOrders}/>
        <Stack.Screen name="approvedOrders" component={approvedOrders}/>
        <Stack.Screen name="myProfile" component={myProfile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
