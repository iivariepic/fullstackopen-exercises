import blogService from "../services/blogs";
import { useDispatch, useSelector } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'
import { clearUser } from "../reducers/userReducer"

const UserInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const logout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    clearUser()
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
