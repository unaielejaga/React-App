import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ListScreen from "../screens/ListScreen";


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Settings" component={SettingScreen} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} options={{drawerItemStyle: { height: 0 }}}/>
      <Drawer.Screen name="Compra" component={ListScreen}  options={{drawerItemStyle: { height: 0 }}} />
     
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;