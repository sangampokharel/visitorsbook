import React from "react";
import { View } from "react-native";
import { StatusBar, Box, HStack, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import colors from "../utils/colors";
function AppHeader({ title, navigation }) {
  return (
    <View>
      <StatusBar bg={colors.primaryColor} barStyle="light-content" />
      <Box safeAreaTop bg="#6200ee" />
      <HStack
        bg={colors.primaryColor}
        px="1"
        py="3"
        w="100%"
        alignItems="center"
      >
        <Ionicons
          name="reorder-three-sharp"
          size={24}
          onPress={() => {
            navigation.toggleDrawer();
          }}
          color="white"
        />
        <Text px="4" color="#fff">
          {title}
        </Text>
      </HStack>
    </View>
  );
}

export default AppHeader;
