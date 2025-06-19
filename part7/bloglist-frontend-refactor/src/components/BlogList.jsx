import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Table,
  Paper,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography
} from '@mui/material'

const CollapsedBlog = ({ blog }) =>
  <TableRow className="blog" data-testid="blog-collapsed">
    <TableCell>
      <Link to={`/blogs/${blog.id}`}><Typography>{blog.title}</Typography></Link>
    </TableCell>
    <TableCell>
      <Typography>{blog.author}</Typography>
    </TableCell>
  </TableRow>

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs= [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>Blogs</h2>
      <Button
        variant="contained"
        color="primary"
        data-testid="new-blog"
        component={Link}
        to="/create"
      >
        new blog
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {sortedBlogs.map((blog) => (
              <CollapsedBlog
                key={blog.id}
                blog={blog}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
      );
};

export default BlogList;
