import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;