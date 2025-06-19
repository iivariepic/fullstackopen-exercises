import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { displayNotification } from "../reducers/notificationReducer";
import CommentField from "./CommentField";
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableContainer,
  TableCell,
  Typography,
  Button,
  Paper
} from '@mui/material'

const IndividualBlog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector(state => state.user)

  const id = useParams().id
  const blogList = useSelector(state => state.blogs)
  const blog = blogList.find(blog => blog.id === id)

  if (!blog) return null

  const like = (blog) => {
    dispatch(likeBlog(blog))
  }

  const remove = (blog) => {
    if (window.confirm(`Are you sure? This will delete blog ${blog.title} permanently`)) {
      dispatch(deleteBlog(blog))
      const redirectPath = location.state?.from?.pathname || "/"
      navigate(redirectPath, { replace: true })
      displayNotification(`Blog ${blog.title} by ${blog.author} deleted.`)
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}><Typography>{blog.url}</Typography></a>
        <Box display="flex" gap={1} alignItems="center">
          <Typography>{blog.likes} likes</Typography>
          <Button onClick={() => like(blog)} variant="contained" color="primary">like</Button>
        </Box>
        <Typography>added by {blog.user.name}</Typography>
        {user.id === blog.user.id
          ? <div>
              <Button variant="contained" color="primary" onClick={() => remove(blog)}>remove</Button>
            </div>
          : null}
        <div>
          <h3>Comments</h3>
          <CommentField blog={blog}/>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {blog.comments.map((comment) => (
                  <TableRow>
                    <TableCell>
                      {comment}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default IndividualBlog;
