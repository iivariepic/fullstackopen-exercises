import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries/auth.js"
import { useNavigate } from "react-router-dom"

const LogIn = ({ token, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ login ] = useMutation(LOGIN)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token, navigate])

  const handleLogIn = async (event) => {
    try {
      event.preventDefault()

      const { data } = await login({ variables: { username, password } })

      const token = data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)

      navigate("/")
    } catch (error) {
      console.error("Login failed", error)
    }
  }

  return (
    <form onSubmit={handleLogIn}>
      <div>
        {"username "}
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        {"password "}
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LogIn