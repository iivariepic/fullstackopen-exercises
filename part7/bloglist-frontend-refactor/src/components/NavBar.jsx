import { Link } from "react-router-dom"
import UserInfo from "./UserInfo"

const NavBar = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div className="NavBar">
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      <UserInfo/>
    </div>
  )
}

export default NavBar