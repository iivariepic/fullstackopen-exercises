import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationMessage(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const {
  setNotificationMessage,
  clearNotification
} = notificationSlice.actions

let timeoutId

export const setNotification = (message) => {
  return dispatch => {
    clearTimeout(timeoutId)
    dispatch(setNotificationMessage(message))

    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}
export default notificationSlice.reducer