const Notification = ({ message, isError }) => {
  if (message === ("" || null)) {
    return null
  }

  return (
    isError === true ? <div className='error'>{message}</div>
      : <div className='success'>{message}</div>
  )
}

export default Notification