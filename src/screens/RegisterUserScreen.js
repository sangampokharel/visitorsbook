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
  Select,
  ScrollView,
  useToast,
  Image,
  Text,
} from "native-base";
import { Entypo, AntDesign } from "@expo/vector-icons";
import colors from "../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
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
const RegisterUser = ({ navigation }) => {
  const auth = getAuth();
  const db = getFirestore();
  const [image, setImage] = React.useState(null);
  const [fullname, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cPassword, setCPassword] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [gender, setGender] = React.useState("1");
  const [events, setEvents] = React.useState([]);
  const [imageUrl, setImageUrl] = React.useState("");
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [imageProgress, setImageProgress] = React.useState(0);
  const [isLoading, setLoading] = React.useState(false);
  const toast = useToast();

  const handleSubmit = () => {
    if (
      image === null ||
      fullname === "" ||
      email === "" ||
      password === "" ||
      cPassword === "" ||
      address === "" ||
      mobile === "" ||
      gender === ""
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
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          setDoc(doc(db, "Users", cred.user.uid), {
            fullname,
            email,
            address,
            mobile,
            imageUrl,
            gender,
            selectedEvent,
            createdAt: serverTimestamp(),
          })
            .then(() => {
              setLoading(true);
              toast.show({
                render: () => {
                  return (
                    <Box bg="teal.500" px={4} py={3} rounded="md" mb={5}>
                      User Registration Successful !
                    </Box>
                  );
                },
                placement: "top",
              });
              navigation.navigate("Info");
            })
            .catch((error) => {
              setLoading(true);
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
          setLoading(true);
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

    console.log(result);

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
      <Center w="100%" style={styles.container}>
        <Box safeArea w="100%" px="8">
          <Heading size="lg" color={colors.primaryColor} fontWeight="bold">
            Register User !
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>
                <Text color={colors.primaryColor}>Profile Picture </Text>

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
                <TouchableOpacity
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
                  onPress={() => {
                    pickImage();
                  }}
                >
                  <AntDesign name="plus" size={150} color="#ddd" />
                </TouchableOpacity>
              )}

              {imageProgress > 0 && (
                <Center w="100%">
                  <Box w="100%">
                    <Progress value={imageProgress} mx="4" />
                  </Box>
                </Center>
              )}
            </FormControl>
            <FormControl>
              <FormControl.Label>
                <Text color={colors.primaryColor}>Full Name </Text>
              </FormControl.Label>
              <Input
                value={fullname}
                onChangeText={(value) => setFullName(value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>
                <Text color={colors.primaryColor}>Email </Text>
              </FormControl.Label>
              <Input value={email} onChangeText={(value) => setEmail(value)} />
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
                <Text color={colors.primaryColor}>Address</Text>
              </FormControl.Label>
              <Input
                value={address}
                onChangeText={(value) => setAddress(value)}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>
                <Text color={colors.primaryColor}>Mobile Number</Text>
              </FormControl.Label>
              <Input
                value={mobile}
                onChangeText={(value) => setMobile(value)}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>
                <Text color={colors.primaryColor}>Gender</Text>
              </FormControl.Label>
              <Radio.Group
                name="gender"
                defaultValue={gender}
                accessibilityLabel="pick a size"
                onChange={(value) => {
                  setGender(value);
                }}
              >
                <Stack
                  direction={{
                    base: "row",
                    md: "row",
                  }}
                  // alignItems="center"
                  space={4}
                  w="100%"
                >
                  <Radio value="1" size="sm" my={1} color={colors.primaryColor}>
                    Male
                  </Radio>

                  <Radio value="2" size="sm" my={1} color={colors.primaryColor}>
                    Female
                  </Radio>
                </Stack>
              </Radio.Group>
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
            <Button
              mt="2"
              bg={colors.primaryColor}
              isLoading={isLoading}
              onPress={() => {
                handleSubmit();
              }}
            >
              Sign up
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};

export default RegisterUser;

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
