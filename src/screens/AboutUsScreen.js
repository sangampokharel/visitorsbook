import { Avatar, Center, Text } from "native-base";
import { View } from "react-native";
import React from "react";
import AppHeader from "../components/AppHeader";

function AboutUsScreen({ navigation }) {
  return (
    <View>
      <AppHeader title="About Us" navigation={navigation} />
      <Center w="100%" px="8" mt="8">
        <Avatar
          bg="purple.600"
          alignSelf="center"
          size="2xl"
          source={{
            uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
          }}
        >
          RB
        </Avatar>
        <Text mt="8" textAlign="justify">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </Text>
      </Center>
    </View>
  );
}

export default AboutUsScreen;
