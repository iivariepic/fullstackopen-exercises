import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm.jsx'
import BlogList from "./components/BlogList.jsx";
import blogService from './services/blogs'
import UserInfo from "./components/UserInfo.jsx";
import Notification from "./components/Notification.jsx";
import NewBlog from "./components/NewBlog.jsx";



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, isError: false })
  const [newBlogVisible, setNewBlogVisible] = useState(false)

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

  const PageLayout = ({ children }) => (
    <div>
      <Notification message={notification.message} isError={notification.isError}/>
      <h2>blogs</h2>
      {children}
    </div>
  )

  if (user === null) {
    return (
      <div>
        <PageLayout>
          <LoginForm setUser={setUser} setNotification={setNotification}/>
        </PageLayout>
      </div>
    )
  }

  return (
    <div>
      <PageLayout>
        <UserInfo user={user} setUser={setUser} setNotification={setNotification}/>
        <br/>
        {newBlogVisible
          ? <NewBlog setBlogs={setBlogs} setNotification={setNotification} setNewBlogVisible={setNewBlogVisible}/>
          : <div>
              <button data-testid="new-blog" onClick={() => setNewBlogVisible(true)}> new blog </button>
              <BlogList blogs={blogs} setBlogs={setBlogs} user={user}/>
            </div>}
      </PageLayout>
    </div>
  )
}

export default App