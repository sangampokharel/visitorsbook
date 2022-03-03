import { ScrollView } from "react-native";
import {
  View,
  Text,
  Center,
  Box,
  Stack,
  Heading,
  HStack,
  Flex,
  Spacer,
} from "native-base";
import React, { useEffect } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from "expo-chart-kit";
import AppHeader from "../components/AppHeader";
import { Dimensions } from "react-native";
import { getFirestore, onSnapshot } from "firebase/firestore";
import { getCompanies, getEvents, getUsers } from "../firebasedatabase";

const HomeScreen = ({ navigation }) => {
  const [eventCount, setEventCount] = React.useState(0);
  const [companyCount, setCompanyCount] = React.useState(0);
  const [usersCount, setUserCount] = React.useState(0);

  const events = getEvents();
  const companies = getCompanies();
  const users = getUsers();

  onSnapshot(events, (snapshot) => {
    setEventCount(snapshot.docs.length);
  });

  onSnapshot(companies, (snapshot) => {
    setCompanyCount(snapshot.docs.length);
  });

  onSnapshot(users, (snapshot) => {
    setUserCount(snapshot.docs.length);
  });

  const chartConfig = {
    backgroundColor: "#383736",
    backgroundGradientFrom: "#383736",
    backgroundGradientTo: "#3d2b2a",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const piedata = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  const evenPer = (eventCount * 100) / 360;
  const compPer = (companyCount * 100) / 360;
  const userPer = (usersCount * 100) / 360;
  const progressData = {
    data: [evenPer, compPer, userPer],
  };
  const screenWidth = Dimensions.get("window").width;
  return (
    <View>
      <AppHeader title="Home" navigation={navigation} />
      <ScrollView>
        <Center w="100%" py="16">
          <Flex direction="row">
            <Spacer />
            <Box
              width="40%"
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
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" alignItems="center">
                    {usersCount}
                  </Heading>
                </Stack>
                <Text fontWeight="400">Total {"\n"} Users</Text>
              </Stack>
            </Box>
            <Spacer />
            <Box
              width="40%"
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
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" alignItems="center">
                    {companyCount}
                  </Heading>
                </Stack>
                <Text fontWeight="400">Total Companines</Text>
              </Stack>
            </Box>
            <Spacer />
          </Flex>

          <Box
            width="80%"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            mt="8"
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
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" style={{ textAlign: "center" }}>
                  <Text>{eventCount}</Text>
                </Heading>
              </Stack>
              <Text fontWeight="400" style={{ textAlign: "center" }}>
                Total Events
              </Text>
            </Stack>
          </Box>

          <Box
            mt="8"
            width="80%"
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
            <Text p="4">Infos</Text>
            <ProgressChart
              data={progressData.data}
              width={screenWidth}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={false}
            />
          </Box>
        </Center>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
