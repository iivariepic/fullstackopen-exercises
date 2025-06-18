import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm.jsx";
import BlogList from "./components/BlogList.jsx";
import blogService from "./services/blogs";
import UserInfo from "./components/UserInfo.jsx";
import Notification from "./components/Notification.jsx";
import NewBlog from "./components/NewBlog.jsx";
import { useDispatch } from 'react-redux';
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const [user, setUser] = useState(null);
  const [newBlogVisible, setNewBlogVisible] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const PageLayout = ({ children }) => (
    <div>
      <Notification/>
      <h2>blogs</h2>
      {children}
    </div>
  );

  if (user === null) {
    return (
      <div>
        <PageLayout>
          <LoginForm setUser={setUser} />
        </PageLayout>
      </div>
    );
  }

  return (
    <div>
      <PageLayout>
        <UserInfo
          user={user}
          setUser={setUser}
        />
        <br />
        {newBlogVisible ? (
          <NewBlog
            setNewBlogVisible={setNewBlogVisible}
          />
        ) : (
          <div>
            <button
              data-testid="new-blog"
              onClick={() => setNewBlogVisible(true)}
            >
              {" "}
              new blog{" "}
            </button>
            <BlogList user={user} />
          </div>
        )}
      </PageLayout>
    </div>
  );
};

export default App;
