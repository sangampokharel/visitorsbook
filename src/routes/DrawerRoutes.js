import * as React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./DrawerContent";
import HomeScreen from "../screens/HomeScreen";
import AboutUsScreen from "../screens/AboutUsScreen";
import SettingsScreen from "../screens/Settings";
import EventsListScreen from "../screens/EventsListScreen";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";
import InformationScreen from "../screens/InformationScreen";

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const EventStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Events">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Events"
        component={EventsListScreen}
      />
      <Stack.Screen name="Information" component={InformationScreen} />
    </Stack.Navigator>
  );
};

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Events" component={EventStackNavigator} />
      <Drawer.Screen name="AboutUs" component={AboutUsScreen} />

      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Profile" component={UpdateProfileScreen} />
    </Drawer.Navigator>
  );
}
