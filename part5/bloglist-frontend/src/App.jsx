import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm.jsx'
import BlogList from "./components/BlogList.jsx";
import blogService from './services/blogs'
import UserInfo from "./components/UserInfo.jsx";
import NewBlog from "./components/NewBlog.jsx";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({message: null, isError: false})

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
      <Notification message={notification.message} isError={notification.isError}/>
      <h2>blogs</h2>
      {user === null
        ? <LoginForm setUser={setUser} setNotification={setNotification}/>
        : <div>
            <UserInfo user={user} setUser={setUser} setNotification={setNotification}/>
            <NewBlog blogs={blogs} setBlogs={setBlogs} setNotification={setNotification}/>
            <br/>
            <BlogList blogs={blogs}/>
          </div>}
    </div>
  )
}

export default App