import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home"   screenOptions={{headerShown: false}}>
      <Stack.Screen name="Principal" component={DrawerNavigator} />
      <Stack.Screen name="Settings" component={DrawerNavigator} />
      <Stack.Screen name="Perfil" component={DrawerNavigator} />
    </Stack.Navigator>
  );
}


export { MainStackNavigator };