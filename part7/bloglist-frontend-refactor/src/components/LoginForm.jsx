import { useState } from "react";
import PropTypes from "prop-types";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useDispatch } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'
import { setUser } from "../reducers/userReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()

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
        username
        <br />
        <input
          data-testid="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <br />
        <input
          data-testid="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button data-testid="login-button" type="submit">
        login
      </button>
    </form>
  );
}
export default LoginForm
