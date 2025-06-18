import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const { message, isError } = notification

  if (!message) {
    return null;
  }

  return isError === true ? (
    <div className="error" data-testid="notification">
      {message}
    </div>
  ) : (
    <div className="success" data-testid="notification">
      {message}
    </div>
  );
};

export default Notification;
