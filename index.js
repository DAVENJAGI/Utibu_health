import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { login } from "./app/login";
import { profile } from "./app/profile";
import { home } from "./app/home";
import { prescriptions } from "./app/previousOrders";
import { notMember } from "./app/notMember";

const Stack = createStackNavigator();

console.log("enter")

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName= "Prescriptions">
        <Stack.Screen name="LogIn" component={login}/>
        <Stack.Screen name="Home" component={home} />
        <Stack.Screen name="Profile" component={profile}/>
        <Stack.Screen name="Prescriptions" component={prescriptions}/>
        <Stack.Screen name="PreviousOrders" component={previousOrders}/>
        <Stack.Screen name="notMember" component={notMember} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
