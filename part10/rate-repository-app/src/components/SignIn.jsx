import { useFormik } from "formik"
import { Keyboard, Pressable, StyleSheet, TextInput, View } from "react-native"

import Text from './Text';
import theme from "../theme"

const initialValues = {
  username: '',
  password: '',
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.contentBackground,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 15,
    padding: 15
  },
  textField: {
    borderRadius: 5,
    borderColor: theme.colors.light,
    borderWidth: 1,
    padding: 15,
    paddingTop: 15,
    paddingBottom: 15,
    width: "100%",
    textAlign: "left",
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.textPrimary
  },
  button: {
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    padding: 15,
    width: "100%",
    alignItems: "center"
  }
});

const SignIn = () => {
  const onSubmit = (values) => {
    Keyboard.dismiss()
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textField}
        placeholder="Username"
        textContentType="nickname"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      <TextInput
        style={styles.textField}
        placeholder="Password"
        textContentType="password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      <Pressable
        onPress={() => formik.handleSubmit()}
        style={({ pressed }) => [
          styles.button,
          pressed && { opacity: 0.8 }
        ]}>
        <Text color="white" fontSize="subheading" fontWeight="bold">Sign in</Text>
      </Pressable>
    </View>
  )
};

export default SignIn;