import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import EditAuthor from "./components/EditAuthor.jsx"
const linkStyle = { margin: 5 }

const App = () => {

  return (
    <Router>
      <div style={{ marginBottom: 10 }}>
        <Link style={linkStyle} to="/">authors</Link>
        <Link style={linkStyle} to="/books">books</Link>
        <Link style={linkStyle} to="/new-book">add book</Link>
        <Link style={linkStyle} to="/edit-author">edit-author</Link>
      </div>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/new-book" element={<NewBook />} />
        <Route path="/edit-author" element={<EditAuthor />} />
      </Routes>

    </Router>
  )
}

export default App;
