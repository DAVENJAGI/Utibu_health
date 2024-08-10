import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { login } from "./app/login";
import { signUp } from "./app/signUp";
import { profile } from "./app/profile";
import { home } from "./app/home";
import { prescriptions } from "./app/previousOrders";
import { notMember } from "./app/notMember";
import { medicationDetails } from "./app/medicationDetails";
import { completedAppointments } from "./app/completedAppointments";
import { cancelledOrders } from "./app/cancelledOrders";
import { approvedOrders } from "./app/approvedOrders";
import { myProfile } from "./app/myProfile";
import { appointmentBooking } from "./app/appointmentBooking";
import { orderPlacing } from "./app/orderPlacing";
import { payment } from"./app/payment";
import { upcomingAppointments } from"./app/upcomingAppointments";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName= "Login">
        <Stack.Screen name="Login" component={login}/>
        <Stack.Screen name="signUp" component={signUp}/>
        <Stack.Screen name="Home" component={home} />
        <Stack.Screen name="myDoctor" component={myDoctor}/>
        <Stack.Screen name="Prescriptions" component={prescriptions}/>
        <Stack.Screen name="PreviousOrders" component={previousOrders}/>
        <Stack.Screen name="notMember" component={notMember} />
        <Stack.Screen name="medicationDetails" component={medicationDetails} />
        <Stack.Screen name="completedAppointments" component={completedAppointments}/>
        <Stack.Screen name="cancelledAppointments" component={cancelledAppointments}/>
        <Stack.Screen name="upcomingAppointments" component={upcomingAppointments}/>
        <Stack.Screen name="appointmentBooking" component={appointmentBooking}/>
        <Stack.Screen name="cancelledOrders" component={cancelledOrders}/>
        <Stack.Screen name="approvedOrders" component={approvedOrders}/>
        <Stack.Screen name="myProfile" component={myProfile}/>
        <Stack.Screen name="orderPlacing" component={orderPlacing}/>
        <Stack.Screen name="payment" component={payment}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
