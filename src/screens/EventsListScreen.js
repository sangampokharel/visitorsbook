import {
  AspectRatio,
  Box,
  Center,
  Heading,
  HStack,
  Stack,
  View,
  Image,
  FlatList,
  Text,
  VStack,
  Input,
  Icon,
} from "native-base";
import React from "react";
import AppHeader from "../components/AppHeader";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const EventsListScreen = ({ navigation }) => {
  const [events, setEvents] = React.useState([
    {
      id: 1,
      image:
        "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
      title: "Tech Festival",
      date: "2022/12/1",
      address: "Gujarat University,Navarangapura",
      description: `Bengaluru (also called Bangalore) is the center of India's high-tech industry. The city is also known for its parks and nightlife.`,
    },
    {
      id: 2,
      image:
        "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
      title: "Tech Festival",
      date: "2022/12/1",
      address: "Memnagar,Ahemdabad",
      description: `Bengaluru (also called Bangalore) is the center of India's high-tech industry. The city is also known for its parks and nightlife.`,
    },
    {
      id: 3,
      image:
        "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
      title: "Tech Festival",
      date: "2022/12/1",

      address: "Gulbai Tekra,Ahemdabad",
      description: `Bengaluru (also called Bangalore) is the center of India's high-tech industry. The city is also known for its parks and nightlife.`,
    },
  ]);
  return (
    <>
      <AppHeader title="Events" navigation={navigation} />
      <Center w="100%" px="4" mt="4">
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

        <FlatList
          data={events}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Information");
              }}
            >
              <Box alignItems="center" mt="4">
                <Box
                  maxW="100%"
                  rounded="lg"
                  overflow="hidden"
                  borderColor="coolGray.200"
                  borderWidth="1"
                  _dark={{
                    borderColor: "coolGray.600",
                    backgroundColor: "gray.700",
                  }}
                  _web={{
                    shadow: 2,
                    borderWidth: 0,
                  }}
                  _light={{
                    backgroundColor: "gray.50",
                  }}
                >
                  <Box>
                    <AspectRatio w="100%" ratio={16 / 9}>
                      <Image
                        source={{
                          uri: item.image,
                        }}
                        alt="image"
                      />
                    </AspectRatio>
                    <Center
                      bg="violet.500"
                      _dark={{
                        bg: "violet.400",
                      }}
                      _text={{
                        color: "warmGray.50",
                        fontWeight: "700",
                        fontSize: "xs",
                      }}
                      position="absolute"
                      bottom="0"
                      px="3"
                      py="1.5"
                    >
                      {item.date}
                    </Center>
                  </Box>
                  <Stack p="4" space={3}>
                    <Stack space={2}>
                      <Heading size="md" ml="-1">
                        {item.title}
                      </Heading>
                      <Text
                        fontSize="xs"
                        _light={{
                          color: "violet.500",
                        }}
                        _dark={{
                          color: "violet.400",
                        }}
                        fontWeight="500"
                        ml="-0.5"
                        mt="-1"
                      >
                        {item.address}
                      </Text>
                    </Stack>
                    <Text fontWeight="400">{item.description}</Text>
                  </Stack>
                </Box>
              </Box>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </Center>
    </>
  );
};

export default EventsListScreen;
