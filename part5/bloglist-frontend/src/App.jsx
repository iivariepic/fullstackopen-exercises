import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm.jsx'
import BlogList from "./components/BlogList.jsx";
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      {user === null
      ? <LoginForm setUser={setUser}/>
      : <BlogList blogs={blogs} user={user}/>}
    </div>
  )
}

export default App