import { Link } from "react-router-dom"
import UserInfo from "./UserInfo"
import {
  AppBar,
  Toolbar,
  Button,
  Box
} from '@mui/material'
import { useSelector } from 'react-redux'

const NavBar = () => {
  const user = useSelector(state => state.user)

  return (
    <AppBar position="static" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/" sx={{ fontSize: '1.2rem' }}>
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users" sx={{ fontSize: '1.2rem' }}>
            users
          </Button>
          {user
            ? <UserInfo/>
            : null
          }
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar