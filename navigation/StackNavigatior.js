import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DrawerNavigator from "./DrawerNavigator";
import LoginScreen from "../screens/LoginScreen";
import AddScreen from "../screens/AddScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LoginStack"   screenOptions={{headerShown: false}}>
      <Stack.Screen name="Principal" component={DrawerNavigator} />
      <Stack.Screen name="Settings" component={DrawerNavigator} />
      <Stack.Screen name="Perfil" component={DrawerNavigator} />
      <Stack.Screen name="Compra" component={DrawerNavigator} />
      <Stack.Screen name="LoginStack" component={LoginScreen} />
      <Stack.Screen name="Add" component={AddScreen} />
      <Stack.Screen name="Registro" component={RegisterScreen} />
    </Stack.Navigator>
  );
}


export { MainStackNavigator };