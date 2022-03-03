import React from "react";
import { StyleSheet } from "react-native";
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Link,
  HStack,
  Text,
} from "native-base";
import colors from "../utils/colors";

const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <Center w="100%" style={styles.container}>
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="bold" color={colors.primaryColor}>
          Forgot Password !
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>
              <Text color={colors.primaryColor}>Email</Text>
            </FormControl.Label>
            <Input />
          </FormControl>

          <Button
            mt="2"
            colorScheme="indigo"
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Forgot Password
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
