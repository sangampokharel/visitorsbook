import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";
import { Avatar } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getAuth, signOut } from "firebase/auth";
export function DrawerContent(props) {
  const auth = getAuth();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <TouchableOpacity
              style={{ flexDirection: "row", marginTop: 15 }}
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            >
              <Avatar
                bg="purple.600"
                alignSelf="center"
                size="md"
                source={{
                  uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
                }}
              >
                RB
              </Avatar>
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Text style={styles.title}>John Doe</Text>
                <Text style={styles.caption}>@j_doe</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <AntDesign name="home" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons name="home-work" size={24} color="black" />
              )}
              label="Events"
              onPress={() => {
                props.navigation.navigate("Events");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Feather name="settings" size={24} color="black" />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate("Settings");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <AntDesign name="infocirlceo" size={24} color="black" />
              )}
              label="About Us"
              onPress={() => {
                props.navigation.navigate("AboutUs");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons name="privacy-tip" size={24} color="black" />
              )}
              label="Privacy Policies"
              source={{
                uri: "https://api.adorable.io/avatars/50/abott@adorable.png",
              }}
              size={50}
              onPress={() => {
                props.navigation.navigate("SupportScreen");
              }}
            />
          </View>
          {/* <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                // toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>
      <DrawerItem
        icon={({ color, size }) => (
          <MaterialIcons name="logout" size={24} color="black" />
        )}
        label="Sign Out"
        onPress={() => {
          signOut(auth)
            .then(() => {})
            .catch((error) => {});
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
