const Notification = ({ message, isError }) => {
  if (!message) {
    return null;
  }

  return (
    isError === true ? <div className='error' data-testid="notification">{message}</div>
      : <div className='success' data-testid="notification">{message}</div>
  )
}

export default Notification