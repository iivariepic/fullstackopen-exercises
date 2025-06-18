import blogService from "../services/blogs";
import { useDispatch } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'

const UserInfo = ({ user, setUser}) => {
  const dispatch = useDispatch()

  const logout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    blogService.setToken(null);
    dispatch(displayNotification(`Logged out successfully`))
  }

  return (
    <div data-testid="user-info">
      <label>{user.name} logged in</label>
      <button name="logout" data-testid="logout" onClick={logout}>
        log out
      </button>
    </div>
  );
};

export default UserInfo;
