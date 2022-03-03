import React from "react";
import { View } from "react-native";
import { StatusBar, Box, HStack, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
function AppHeader({ title, navigation }) {
  return (
    <View>
      <StatusBar bg="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="#6200ee" />
      <HStack bg="#6200ee" px="1" py="3" w="100%">
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
