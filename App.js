import { NavigationContainer } from "@react-navigation/native";

import { NativeBaseProvider, Box } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import MainRoutes from "./src/routes/mainRoutes";

export default function App() {
  return (
    <NativeBaseProvider>
      <MainRoutes />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
