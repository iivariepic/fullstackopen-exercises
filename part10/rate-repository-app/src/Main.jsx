import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from "./components/RepositoryList"
import AppBar from "./components/AppBar"
import theme from "./theme"
import SignIn from "./components/SignIn"

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.background
  },
});

const Main = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <AppBar/>
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Main;