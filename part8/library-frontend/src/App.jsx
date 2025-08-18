import { useState } from "react"
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { useApolloClient, useSubscription } from "@apollo/client"
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import EditAuthor from "./components/EditAuthor.jsx"
import LogIn from "./components/LogIn.jsx"
import { Recommendations } from "./components/Recommendations.jsx"
import { BOOK_ADDED } from "./queries/subscriptions.js"
import { ALL_BOOKS } from "./queries/books.js"
const linkStyle = { margin: 5 }

export const updateCache = (cache, query, addedBook) => {
  const uniqueByTitle = (bookList) => {
    const seen = new Set()
    return bookList.filter(item => {
      const title = item.title
      return seen.has(title) ? false : seen.add(title)
    })
  }

  cache.updateQuery(query, (data) => {
    if (!data) {
      return { allBooks: [addedBook] }
    }

    return {
      allBooks: uniqueByTitle(data.allBooks.concat(addedBook))
    }
  })
}

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const client = useApolloClient()

  const logout = async () => {
    setToken(null)
    localStorage.clear()
    await client.resetStore()
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      window.alert(`a book has been added: ${addedBook.title}`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  return (
    <Router>
      <div style={{ marginBottom: 10 }}>
        <Link style={linkStyle} to="/">authors</Link>
        <Link style={linkStyle} to="/books">books</Link>
        {token ?
          <>
            <Link style={linkStyle} to="/new-book">add book</Link>
            <Link style={linkStyle} to="/edit-author">edit-author</Link>
            <Link style={linkStyle} to="/recommend">recommend</Link>
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
        <Route path="/recommend" element={<Recommendations/>} />
      </Routes>

    </Router>
  )
}

export default App;
