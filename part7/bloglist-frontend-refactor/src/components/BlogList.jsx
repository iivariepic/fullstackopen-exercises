import Blog from "../components/Blog";
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const sortedBlogs= [...blogs].sort((a, b) => b.likes - a.likes)

  const like = blog => {
    dispatch(likeBlog(blog))
  }
  const removeBlog = blog => {
    dispatch(deleteBlog(blog))
  }

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          like={() => like(blog)}
          deleteBlog={() => removeBlog(blog)}
        />
      ))}
    </div>
  );
};

export default BlogList;
