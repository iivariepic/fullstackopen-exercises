import blogService from "../services/blogs";
import { useDispatch, useSelector } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'
import { clearUser } from "../reducers/userReducer"
import {
  Button,
  Box,
  Typography
} from '@mui/material'

const UserInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const logout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(clearUser())
    blogService.setToken(null);
    dispatch(displayNotification(`Logged out successfully`))
  }

  return (
    <Box display="flex" gap={2} alignItems="center">
      <Typography variant="body1">{user.name} logged in</Typography>
      <Button
        name="logout"
        data-testid="logout"
        onClick={logout}
        variant="contained"
        color="secondary">
        log out
      </Button>
    </Box>
  );
};

export default UserInfo;
