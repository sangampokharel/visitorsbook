import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "native-base";
import colors from "../utils/colors";

function InfoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        style={{
          marginVertical: 10,
          width: 200,
        }}
        bg={colors.primaryColor}
        onPress={() => navigation.navigate("Login")}
      >
        Login
      </Button>
      <Button
        style={{
          marginVertical: 10,
          width: 200,
        }}
        bg={colors.primaryColor}
        onPress={() => navigation.navigate("RegisterUser")}
      >
        Register as User
      </Button>
      <Button
        style={{
          marginVertical: 10,
          width: 200,
        }}
        bg={colors.primaryColor}
        onPress={() => navigation.navigate("RegisterCompany")}
      >
        Register as Company
      </Button>
    </View>
  );
}

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
