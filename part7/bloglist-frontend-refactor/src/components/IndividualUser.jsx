import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'

const IndividualUser = () => {
  const id = useParams().id
  const userList = useSelector(state => state.userList)
  const user = userList.find(user => user.id === id)

  if (!user) return null

  return (
    <Box sx={{ p: 3 }}>
      <h2>{user.name}'s Blogs</h2>
      <List sx={{ width: '100%' }}>
        {user.blogs.map(blog => (
          <ListItem key={blog.id} sx={{ borderBottom: '1px solid #e0e0e0' }}>
            <ListItemText primary={blog.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default IndividualUser;
