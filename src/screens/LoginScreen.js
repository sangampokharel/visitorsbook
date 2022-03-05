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
  useToast,
} from "native-base";
import colors from "../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const toast = useToast();
  const auth = getAuth();
  const handleSubmit = () => {
    if (email === "" || password === "") {
      return toast.show({
        render: () => {
          return (
            <Box bg="red.500" px={4} py={3} rounded="md" mb={5}>
              Please fill out the form completely !
            </Box>
          );
        },
        placement: "top",
      });
    } else {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast.show({
            render: () => {
              return (
                <Box bg="red.500" px={4} py={3} rounded="md" mb={5}>
                  {error.message}
                </Box>
              );
            },
            placement: "top",
          });
        });
    }
  };
  return (
    <Center w="100%" style={styles.container}>
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="bold" color={colors.primaryColor}>
          Login !
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>
              <Text color={colors.primaryColor}>Email</Text>
            </FormControl.Label>
            <Input
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label color={colors.primaryColor}>
              <Text color={colors.primaryColor}>Password</Text>
            </FormControl.Label>
            <Input
              type="password"
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
            >
              <Text color={colors.primaryColor} alignSelf="flex-end" mt="1">
                Forget Password?
              </Text>
            </TouchableOpacity>
          </FormControl>
          <Button
            isLoading={isLoading}
            mt="2"
            bg={colors.primaryColor}
            onPress={() => {
              handleSubmit();
            }}
          >
            Sign in
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
