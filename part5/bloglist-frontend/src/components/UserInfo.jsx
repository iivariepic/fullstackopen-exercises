import blogService from '../services/blogs'

const UserInfo = ({ user, setUser }) => {

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
  }

  return (
    <div>
      <label>{user.name} logged in</label>
      <button name="logout" onClick={logout}>log out</button>
    </div>
  )
}

export default UserInfo