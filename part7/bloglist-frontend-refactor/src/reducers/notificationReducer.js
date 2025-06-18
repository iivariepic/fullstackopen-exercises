import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return {message: '', isError: false}
    }
  }
})

export const {
  setNotification,
  clearNotification
} = notificationSlice.actions

let timeoutId

export const displayNotification = (message, isError = false, seconds = 5) => {
  return dispatch => {
    clearTimeout(timeoutId)
    dispatch(setNotification({message, isError}))

    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}
export default notificationSlice.reducer