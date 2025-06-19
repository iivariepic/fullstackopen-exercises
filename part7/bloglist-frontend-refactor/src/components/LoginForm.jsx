import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useDispatch } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'
import { setUser } from "../reducers/userReducer";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  TextField
} from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
      dispatch(displayNotification(`Logged in as ${user.name}`))

      const redirectPath = location.state?.from?.pathname || "/"
      navigate(redirectPath, { replace: true })

    } catch (error) {
      if (error.response) {
        dispatch(displayNotification(error.response.data.error, true))
      } else if (error.request) {
        dispatch(displayNotification(error.request, true))
      } else {
        dispatch(displayNotification(error.message, true))
      }
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <br />
        <TextField
          data-testid="username"
          label="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <br />
        <TextField
          label="password"
          type="password"
          data-testid="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        data-testid="login-button"
        type="submit">
        login
      </Button>
    </form>
  );
}
export default LoginForm
