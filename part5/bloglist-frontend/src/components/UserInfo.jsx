import blogService from '../services/blogs'

const UserInfo = ({ user, setUser, setNotification }) => {

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
    setNotification({
      message: `Logged out successfully`,
      isError: false
    })
    setTimeout(() => {
      setNotification({ message: null, isError: false });
    }, 5000);
  }

  return (
    <div data-testid="user-info">
      <label>{user.name} logged in</label>
      <button name="logout" data-testid="logout" onClick={logout}>log out</button>
    </div>
  )
}

export default UserInfo