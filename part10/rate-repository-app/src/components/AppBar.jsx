import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from "react-router-native"

import Constants from 'expo-constants';
import theme from "../theme"
import Text from "./Text"

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    rowGap: 5
  },
  tab: {
    padding: 15
  },
});

const Tab = ({ text, path }) => {
  return (
    <Link style={styles.tab} to={path}>
      <Text color="white" fontWeight="bold">{text}</Text>
    </Link>
  )
}

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Tab text="Repositories" path="/"/>
        <Tab text="Sign In" path="/SignIn"/>
      </ScrollView>
    </View>
  );
};

export default AppBar;