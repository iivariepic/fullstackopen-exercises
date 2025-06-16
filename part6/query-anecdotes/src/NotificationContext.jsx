import { createContext, useReducer, useContext, useEffect } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return action.payload
    case "EMPTY":
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  // Timeout after 5 seconds
  useEffect(() => {
    if (notification) {
      const timeout = setTimeout(() => {
        notificationDispatch({ type: 'EMPTY' })
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={ [notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const valueAndDispatch = useContext(NotificationContext)
  return valueAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const valueAndDispatch = useContext(NotificationContext)
  return valueAndDispatch[1]
}

export default NotificationContext