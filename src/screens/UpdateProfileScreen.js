import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Radio,
  Stack,
  Image,
  ScrollView,
  Select,
  TextArea,
  Text,
  Avatar,
  useToast,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../utils/colors";
import AppHeader from "../components/AppHeader";
const UpdateProfileScreen = ({ navigation }) => {
  const [language, setLanguage] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [companyName, setCompanyName] = React.useState("");
  const [companyEmail, setCompanyEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cPassword, setCPassword] = React.useState("");
  const [companyAddress, setCompanyAddress] = React.useState("");
  const [companyMobile, setCompanyMobile] = React.useState("");
  const [ideaDescription, setIdeaDescription] = React.useState("");

  const toast = useToast();
  const handleSubmit = () => {
    if (
      image === null ||
      companyName === "" ||
      companyEmail === "" ||
      password === "" ||
      cPassword === "" ||
      companyAddress === "" ||
      companyMobile === "" ||
      ideaDescription === "" ||
      language === ""
    ) {
      return toast.show({
        render: () => {
          return (
            <Box bg="teal.500" px={4} py={3} rounded="md" mb={5}>
              Please fill out the form completely !
            </Box>
          );
        },
        placement: "top",
      });
    }
  };

  const pickImage = async () => {
    // // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View>
      <AppHeader title="Profile" navigation={navigation} />
      <ScrollView>
        <Center w="100%" mt="10" style={styles.container}>
          <Box w="100%" px="8">
            <Heading size="lg" color={colors.primaryColor} fontWeight="bold">
              Profile
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>
                  <Text color={colors.primaryColor}>Company Logo </Text>

                  {image !== null && (
                    <TouchableOpacity
                      onPress={() => {
                        setImage(null);
                      }}
                    >
                      <Text>Remove</Text>
                    </TouchableOpacity>
                  )}
                </FormControl.Label>
                <View
                  style={{
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: "#ddd",
                    borderStyle: "dashed",
                    width: "100%",
                    height: 200,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {image ? (
                    <Image
                      source={{
                        uri: image,
                      }}
                      style={{ width: "100%", height: 200 }}
                      alt="Alternate Text"
                      size="xl"
                    />
                  ) : (
                    <AntDesign
                      name="plus"
                      size={150}
                      color="#ddd"
                      onPress={() => pickImage()}
                    />
                  )}
                </View>
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  <Text color={colors.primaryColor}>Name </Text>
                </FormControl.Label>
                <Input
                  value={companyName}
                  onChangeText={(value) => setCompanyName(value)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  <Text color={colors.primaryColor}>Email </Text>
                </FormControl.Label>
                <Input
                  value={companyEmail}
                  onChangeText={(value) => setCompanyEmail(value)}
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>
                  <Text color={colors.primaryColor}>Addess </Text>
                </FormControl.Label>
                <Input
                  value={companyAddress}
                  onChangeText={(value) => setCompanyAddress(value)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  <Text color={colors.primaryColor}>Mobile Number </Text>
                </FormControl.Label>
                <Input
                  value={companyMobile}
                  onChangeText={(value) => setCompanyMobile(value)}
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>
                  <Text color={colors.primaryColor}>
                    Describte Idea to Present
                  </Text>
                </FormControl.Label>
                <TextArea
                  h={20}
                  placeholder="Text Area Placeholder"
                  value={ideaDescription}
                  onChangeText={(value) => setIdeaDescription(value)}
                />
              </FormControl>
              <Button mt="2" colorScheme="indigo" onPress={handleSubmit}>
                Update Profile
              </Button>
            </VStack>
          </Box>
        </Center>
      </ScrollView>
    </View>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
    width: "90%",
    marginHorizontal: "auto",
  },
});
