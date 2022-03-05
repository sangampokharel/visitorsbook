import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import InfoScreen from "../screens/InfoScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterCompanyScreen from "../screens/RegisterCompanyScreen";
import RegisterUserScreen from "../screens/RegisterUserScreen";
import DrawerRoutes from "./DrawerRoutes";
import { NavigationContainer } from "@react-navigation/native";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { View, ImageBackground } from "react-native";
import { Text } from "native-base";
import splash from "../../assets/splash.png";
const Stack = createStackNavigator();

export default function mainRoutes() {
  const [user, setUser] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  const auth = getAuth();

  const unsubAuth = onAuthStateChanged(auth, (user) => {
    console.log("user status changed:", user);
    setLoading(false);
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });
  if (isLoading) {
    return (
      <ImageBackground
        source={splash}
        resizeMode="cover"
        style={{ flex: 1 }}
      ></ImageBackground>
    );
  } else {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Info">
            {user ? (
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Drawer"
                component={DrawerRoutes}
              />
            ) : (
              <>
                <Stack.Screen
                  options={{
                    headerShown: false,
                  }}
                  name="Info"
                  component={InfoScreen}
                />
                <Stack.Screen
                  options={{
                    title: "",
                    headerStyle: {
                      backgroundColor: "none",
                      borderBottomWidth: 0,
                    },
                    headerTintColor: "#000",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }}
                  name="Login"
                  component={LoginScreen}
                />
                <Stack.Screen
                  options={{
                    title: "",
                    headerStyle: {
                      backgroundColor: "none",
                      borderBottomWidth: 0,
                    },
                    headerTintColor: "#000",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }}
                  name="ForgotPassword"
                  component={ForgotPasswordScreen}
                />
                <Stack.Screen
                  name="RegisterUser"
                  options={{
                    title: "",
                    headerStyle: {
                      backgroundColor: "none",
                      borderBottomWidth: 0,
                    },
                    headerTintColor: "#000",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }}
                  component={RegisterUserScreen}
                />
                <Stack.Screen
                  name="RegisterCompany"
                  options={{
                    title: "",
                    headerStyle: {
                      backgroundColor: "none",
                      borderBottomWidth: 0,
                    },
                    headerTintColor: "#000",
                    headerTitleStyle: {
                      fontWeight: "bold",
                    },
                  }}
                  component={RegisterCompanyScreen}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
