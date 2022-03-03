import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DrawerNavigator from "./DrawerNavigator";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LoginStack"   screenOptions={{headerShown: false}}>
      <Stack.Screen name="Principal" component={DrawerNavigator} />
      <Stack.Screen name="Settings" component={DrawerNavigator} />
      <Stack.Screen name="Perfil" component={DrawerNavigator} />
      <Stack.Screen name="LoginStack" component={LoginScreen} />
    </Stack.Navigator>
  );
}


export { MainStackNavigator };