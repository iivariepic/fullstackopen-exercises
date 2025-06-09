import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, changeBlogs, blogs }) => {
  const [expanded, setExpanded] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const like = async () => {
    try {
      const updatedBlog = { ...blog, likes: likes + 1 }
      await blogService.like(updatedBlog)
      setLikes(likes + 1)
    } catch (error) {
     alert("Like Failed")
    }
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog)
        changeBlogs([...blogs].filter(b => b.id !== blog.id))
      } catch (error) {
        alert("Delete Failed")
      }
    }
  }

  const collapsedView =
    <div className="blog" data-testid="blog-collapsed">
      {blog.title} {blog.author} <button data-testid="expand-button" onClick={() => setExpanded(true)}> view </button>
    </div>

  const expandedView =
    <div className="blog" data-testid="blog-expanded">
      <div>{blog.title} {blog.author} <button onClick={() => setExpanded(false)}> hide </button></div>
      <div>{blog.url}</div>
      <div>likes {likes} <button data-testid="like-button" onClick={like}> like </button></div>
      {user.id === blog.user.id && (<div><button onClick={deleteBlog}> delete </button></div>)}

    </div>

  return <>{expanded ? expandedView : collapsedView}</>

}


export default Blog