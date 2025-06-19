import { useSelector } from 'react-redux'
import {
  Alert
} from '@mui/material'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const { message, isError } = notification

  if (!message) {
    return null;
  }

  return isError === true ? (
    <Alert severity="error" data-testid="notification">
      {message}
    </Alert>
  ) : (
    <Alert severity="success" data-testid="notification">
      {message}
    </Alert>
  );
};

export default Notification;
