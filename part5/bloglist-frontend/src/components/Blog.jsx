import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const like = async () => {
    try {
      const updatedBlog = {...blog, likes: likes + 1}
      await blogService.like(updatedBlog)
      setLikes(likes + 1)
    } catch (error) {
     alert("Like Failed")
    }
  }

  const collapsedView =
    <div className="blog">
      {blog.title} {blog.author} <button onClick={() => setExpanded(true)}> view </button>
    </div>

  const expandedView =
    <div className="blog">
      <div>{blog.title} {blog.author} <button onClick={() => setExpanded(false)}> hide </button></div>
      <div>{blog.url}</div>
      <div>likes {likes} <button onClick={like}> like </button></div>
      <div>{blog.user.name}</div>
    </div>

  return (
    <>
      {expanded
        ? expandedView
        : collapsedView}
    </>
  )
}


export default Blog