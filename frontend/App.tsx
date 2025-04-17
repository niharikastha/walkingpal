// App.js or Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import PhoneNumberScreen from './src/screens/PhoneNumberScreen';
import OtpScreen from './src/screens/OtpScreen';
import FirstNameScreen from './src/screens/FirstNameScreen';
import DobScreen from './src/screens/DobScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="FirstName" component={FirstNameScreen} />
        <Stack.Screen name="DobScreen" component={DobScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
