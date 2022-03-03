import React from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import {
  Dimensions,
  Animated,
  useWindowDimensions,
  View,
  Text,
} from "react-native";
import CompanyListScreen from "./CompanyListScreen";
import ClientListScreen from "./ClientListScreen";

const renderScene = SceneMap({
  first: CompanyListScreen,
  second: ClientListScreen,
});

function InformationScreen() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Companies" },
    { key: "second", title: "Clients" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          renderLabel={({ route, color }) => (
            <Text style={{ color: "black", margin: 8 }}>{route.title}</Text>
          )}
          style={{ backgroundColor: "#fff" }}
        />
      )}
    />
  );
}

export default InformationScreen;
