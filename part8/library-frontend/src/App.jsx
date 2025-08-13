import { useState } from "react"
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { useApolloClient } from "@apollo/client"
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import EditAuthor from "./components/EditAuthor.jsx"
import LogIn from "./components/LogIn.jsx"
const linkStyle = { margin: 5 }

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const client = useApolloClient()

  const logout = async () => {
    setToken(null)
    localStorage.clear()
    await client.resetStore()
  }

  return (
    <Router>
      <div style={{ marginBottom: 10 }}>
        <Link style={linkStyle} to="/">authors</Link>
        <Link style={linkStyle} to="/books">books</Link>
        {token ?
          <>
            <Link style={linkStyle} to="/new-book">add book</Link>
            <Link style={linkStyle} to="/edit-author">edit-author</Link>
            <button onClick={logout}>logout</button>
          </>
          : <Link style={linkStyle} to="/login">login</Link>
      }
      </div>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/new-book" element={<NewBook />} />
        <Route path="/edit-author" element={<EditAuthor />} />
        <Route path="/login" element={<LogIn setToken={setToken} token={token}/>} />
      </Routes>

    </Router>
  )
}

export default App;
