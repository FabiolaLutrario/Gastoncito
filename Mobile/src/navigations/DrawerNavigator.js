import React, { useContext, useEffect } from "react";

//Icons
import {
  MaterialIcons,
  Ionicons,
  AntDesign,
  Entypo,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";

//Views
import HomeNavigator from "./HomeNavigator";

//Components
import DrawerCustom from "../components/DrawerCustom/DrawerCustom";

//Navigation
import ROUTES from "../constants/routes.js";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerCustom {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name={ROUTES.DRAWER_HOME}
        component={HomeNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color="black"/>
          ),
          title: "Inicio",
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
