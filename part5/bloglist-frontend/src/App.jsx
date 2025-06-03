import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm.jsx'
import BlogList from "./components/BlogList.jsx";
import blogService from './services/blogs'
import UserInfo from "./components/UserInfo.jsx";
import NewBlog from "./components/NewBlog.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      {user === null
        ? <LoginForm setUser={setUser}/>
        : <div>
            <UserInfo user={user} setUser={setUser}/>
            <NewBlog blogs={blogs} setBlogs={setBlogs}/>
            <br/>
            <BlogList blogs={blogs}/>
          </div>}
    </div>
  )
}

export default App