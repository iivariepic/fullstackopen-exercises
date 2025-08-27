import { useFormik } from "formik"
import { Keyboard, Pressable, StyleSheet, TextInput, View } from "react-native"
import * as yup from 'yup';

import Text from './Text';
import theme from "../theme"

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required"),
  password: yup
    .string()
    .required("Password is required"),
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.contentBackground,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    padding: 15
  },
  textFieldContainer: {
    width: "100%",
    gap: 5
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
  textFieldError: {
    borderColor: theme.colors.error,
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
    validationSchema,
    onSubmit
  })

  return (
    <View style={styles.container}>
      <View style={styles.textFieldContainer}>
        <TextInput
          style={[
            styles.textField,
            formik.touched.username && formik.errors.username && styles.textFieldError,
          ]}
          placeholder="Username"
          textContentType="nickname"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
        />
        {formik.touched.username && formik.errors.username && (
          <Text color="error" style={{ alignSelf: "left" }}>{formik.errors.username}</Text>
        )}
      </View>
      <View style={styles.textFieldContainer}>
        <TextInput
          style={[
            styles.textField,
            formik.touched.password && formik.errors.password && styles.textFieldError,
          ]}
          placeholder="Password"
          textContentType="password"
          secureTextEntry
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
        />
        {formik.touched.password && formik.errors.password && (
          <Text color="error" style={{ alignSelf: "left" }}>{formik.errors.password}</Text>
        )}
      </View>
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