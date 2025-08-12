import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
const linkStyle = { margin: 5 }

const App = () => {

  return (
    <Router>
      <div style={{ marginBottom: 10 }}>
        <Link style={linkStyle} to="/">authors</Link>
        <Link style={linkStyle} to="/books">books</Link>
        <Link style={linkStyle} to="/new-book">add</Link>
      </div>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/new-book" element={<NewBook />} />
      </Routes>

    </Router>
  )
}

export default App;
