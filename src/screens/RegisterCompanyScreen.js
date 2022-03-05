import React, { useEffect } from "react";
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
import { getEvents, uploadImage } from "../firebasedatabase";
import {
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const RegisterCompany = ({ navigation }) => {
  const [image, setImage] = React.useState(null);
  const [companyName, setCompanyName] = React.useState("");
  const [companyEmail, setCompanyEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cPassword, setCPassword] = React.useState("");
  const [companyAddress, setCompanyAddress] = React.useState("");
  const [companyMobile, setCompanyMobile] = React.useState("");
  const [ideaDescription, setIdeaDescription] = React.useState("");
  const [events, setEvents] = React.useState([]);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [imageProgress, setImageProgress] = React.useState(0);
  const [imageUrl, setImageUrl] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const toast = useToast();
  const auth = getAuth();
  const db = getFirestore();
  const handleSubmit = () => {
    if (
      image === null ||
      companyName === "" ||
      companyEmail === "" ||
      password === "" ||
      cPassword === "" ||
      companyAddress === "" ||
      companyMobile === "" ||
      ideaDescription === ""
    ) {
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
      createUserWithEmailAndPassword(auth, companyEmail, password)
        .then((cred) => {
          setDoc(doc(db, "Companies", cred.user.uid), {
            companyName,
            companyEmail,
            companyAddress,
            companyMobile,
            imageUrl,
            ideaDescription,
            selectedEvent,
            createdAt: serverTimestamp(),
          })
            .then(() => {
              setLoading(false);
              toast.show({
                render: () => {
                  return (
                    <Box bg="teal.500" px={4} py={3} rounded="md" mb={5}>
                      Company Registration Successful !
                    </Box>
                  );
                },
                placement: "top",
              });
              navigation.navigate("Info");
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
        })
        .catch((err) => {
          setLoading(false);
          console.log("eror message", err.message);
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

    if (!result.cancelled) {
      setImage(result.uri);
      result.name = `img-${Math.random() * 100}`;
      const uploadTask = uploadImage(result);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageProgress(prog);
        },
        (error) => console.log(error.message),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            console.log("image url", downloadUrl);
            setImageUrl(downloadUrl);
          });
        }
      );
    }
  };

  useEffect(() => {
    const newEvent = getEvents();
    onSnapshot(newEvent, (snapshot) => {
      setEvents(
        snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  }, []);
  return (
    <ScrollView>
      <Center w="100%" mt="10" style={styles.container}>
        <Box w="100%" px="8">
          <Heading size="lg" color={colors.primaryColor} fontWeight="bold">
            Register Company
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
                <Text color={colors.primaryColor}>Company Name </Text>
              </FormControl.Label>
              <Input
                value={companyName}
                onChangeText={(value) => setCompanyName(value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>
                <Text color={colors.primaryColor}>Company Email </Text>
              </FormControl.Label>
              <Input
                value={companyEmail}
                onChangeText={(value) => setCompanyEmail(value)}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>
                <Text color={colors.primaryColor}>Password </Text>
              </FormControl.Label>
              <Input
                type="password"
                value={password}
                onChangeText={(value) => setPassword(value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>
                <Text color={colors.primaryColor}>Confirm Password </Text>
              </FormControl.Label>
              <Input
                type="password"
                value={cPassword}
                onChangeText={(value) => setCPassword(value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>
                <Text color={colors.primaryColor}>Company Addess </Text>
              </FormControl.Label>
              <Input
                value={companyAddress}
                onChangeText={(value) => setCompanyAddress(value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>
                <Text color={colors.primaryColor}>Company Mobile Number </Text>
              </FormControl.Label>
              <Input
                value={companyMobile}
                onChangeText={(value) => setCompanyMobile(value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>
                <Text color={colors.primaryColor}>Select Event</Text>
              </FormControl.Label>

              <Select
                value={selectedEvent}
                minWidth={200}
                accessibilityLabel="Select Event"
                placeholder="Select Event"
                onValueChange={(itemValue) => {
                  console.log(itemValue);
                  setSelectedEvent(itemValue);
                }}
                _selectedItem={{
                  bg: "cyan.600",
                  endIcon: (
                    <Entypo name="chevron-down" size={24} color="black" />
                  ),
                }}
              >
                {events.map((item) => {
                  return (
                    <Select.Item
                      label={item?.eventName}
                      value={item?.id}
                      key={item?.id}
                    />
                  );
                })}
              </Select>
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
            <Button
              mt="2"
              bg={colors.primaryColor}
              isLoading={isLoading}
              onPress={handleSubmit}
            >
              Sign up
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};

export default RegisterCompany;

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
