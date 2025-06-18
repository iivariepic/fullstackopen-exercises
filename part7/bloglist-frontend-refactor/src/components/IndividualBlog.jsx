import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { displayNotification } from "../reducers/notificationReducer";

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
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes <button onClick={() => like(blog)}>{" like "}</button></div>
        <div>added by {blog.user.name}</div>
        {user.id === blog.user.id ? <div><button onClick={() => remove(blog)}>{" remove "}</button></div> : null}
      </div>
    </div>
  );
};

export default IndividualBlog;
