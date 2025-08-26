import { View, StyleSheet, Pressable } from 'react-native';
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
    flexGrow: 1,
    padding: 15
  },
});

const Tab = ({ text, onPress }) => {
  return (
    <Pressable style={styles.tab} onPress={onPress}>
      <Text color="white" fontWeight="bold">{text}</Text>
    </Pressable>
  )
}

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Tab text="Repositories" onPress={() => {}}/>
    </View>
  );
};

export default AppBar;