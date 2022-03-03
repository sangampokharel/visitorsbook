import React, { useState } from "react";
import { View, Switch, Dimensions } from "react-native";
import {
  Center,
  SectionList,
  Heading,
  Flex,
  Spacer,
  Divider,
} from "native-base";
import AppHeader from "../components/AppHeader";
const SettingsScreen = ({ navigation }) => {
  const [settingsData, setSettingsData] = useState([
    {
      title: "Personal Details",
      data: [{ name: "Change Password", isChecked: true }],
    },
    {
      title: "System Settings",
      data: [
        { name: "Push Notifications", isChecked: false },
        { name: "Location", isChecked: false },
      ],
    },
  ]);
  var tempData = [...settingsData];
  const toggleSwitch = (item) => {
    for (var i = 0; i < settingsData.length; i++) {
      for (var j = 0; j < settingsData[i].data.length; j++) {
        if (item === settingsData[i].data[j].name) {
          tempData[i].data[j].isChecked = !tempData[i].data[j].isChecked;
        }
      }
    }
    setSettingsData(tempData);
  };

  return (
    <View>
      <AppHeader title="Settings" navigation={navigation} />
      <Center h={Dimensions.get("window").height}>
        <SectionList
          w="100%"
          mb="4"
          sections={settingsData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View>
              <Flex direction="row" px="4" py="4">
                {item.name}
                <Spacer />
                <Switch
                  value={item.isChecked}
                  onValueChange={(value) => {
                    toggleSwitch(item.name);
                  }}
                  size="sm"
                />
              </Flex>
              <Divider />
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Center>
              <Heading fontSize="md" mt="8" pb="4">
                {title}
              </Heading>
            </Center>
          )}
        />
      </Center>
    </View>
  );
};

export default SettingsScreen;
