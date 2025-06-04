import { useState } from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setUser, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification({
        message: `Logged in as ${user.name}`,
        isError: false
      })
    } catch (error) {
      if (error.response) {
        setNotification({ message: error.response.data.error, isError: true })
      } else if (error.request) {
        setNotification({ message: error.request, isError: true })
      } else {
        setNotification({ message: error.message, isError: true })
      }
    } finally {
      setTimeout(() => {
        setNotification({ message: null, isError: false });
      }, 5000);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username<br/>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password<br/>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
}

export default LoginForm