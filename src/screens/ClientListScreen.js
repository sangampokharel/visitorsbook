import {
  Avatar,
  Box,
  FlatList,
  HStack,
  SectionList,
  Spacer,
  Icon,
  Input,
  Heading,
  VStack,
} from "native-base";
import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ModalComponent from "../components/ModalComponent";
import { TouchableOpacity } from "react-native-gesture-handler";

function ClientListScreen({ navigation }) {
  const [companyList, setCompanyList] = React.useState([
    {
      id: 1,
      name: "Sangam Pokharel",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
      email: "e@gmail.com",
      address: "Ahemdabad Gujarat",
      mobileNumber: "32423434",
      date: "2022/12/1",
    },

    {
      id: 2,
      name: "Sandeep Biswakarma",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
      email: "e@gmail.com",
      address: "Ahemdabad Gujarat",
      mobileNumber: "32423434",
      date: "2022/12/1",
    },

    {
      id: 3,
      name: "Bhargav Sutariya",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
      email: "e@gmail.com",
      address: "Ahemdabad Gujarat",
      mobileNumber: "32423434",
      date: "2022/12/1",
    },

    {
      id: 4,
      name: "Sagar Kimsurya",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
      email: "e@gmail.com",
      address: "Ahemdabad Gujarat",
      mobileNumber: "32423434",
      date: "2022/11/1",
    },
  ]);

  const [selectedItem, setSelectedItem] = React.useState(null);

  const [showModal, setModal] = React.useState(false);

  useEffect(() => {
    if (selectedItem) {
      setModal(true);
    } else {
      setModal(false);
    }
  }, [selectedItem]);

  const closeModal = () => setModal(false);

  return (
    <>
      <View style={styles.container}>
        <ModalComponent
          showModal={showModal}
          closeModal={closeModal}
          name={selectedItem?.name}
          email={selectedItem?.email}
          address={selectedItem?.address}
          mobile={selectedItem?.mobileNumber}
        />
        <VStack w="100%" space={5} alignSelf="center">
          <Input
            placeholder="Search"
            variant="filled"
            width="100%"
            borderRadius="10"
            py="2"
            px="2"
            borderWidth="0"
            InputLeftElement={
              <Icon
                ml="2"
                size="4"
                color="gray.400"
                as={<Ionicons name="ios-search" />}
              />
            }
          />
        </VStack>

        <VStack space={5} />
        <FlatList
          w="100%"
          mt="4"
          data={companyList}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedItem(item);
              }}
            >
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "gray.600",
                }}
                borderColor="coolGray.200"
                pl="4"
                pr="5"
                py="2"
                mt="4"
              >
                <HStack space={3} justifyContent="space-between">
                  <Avatar
                    size="48px"
                    source={{
                      uri: item.imageUrl,
                    }}
                  />
                  <VStack>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      bold
                    >
                      {item.name}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.email}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Text
                    fontSize="xs"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    alignSelf="flex-start"
                  >
                    {item.address}
                  </Text>
                </HStack>
              </Box>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
}

export default ClientListScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
});
