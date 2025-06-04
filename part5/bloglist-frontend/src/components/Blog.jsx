import { useState } from 'react'

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)

  const collapsedView =
    <div className="blog">
      {blog.title} {blog.author} <button onClick={() => setExpanded(true)}> view </button>
    </div>

  const expandedView =
    <div className="blog">
      <div>{blog.title} {blog.author} <button onClick={() => setExpanded(false)}> hide </button></div>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button> like </button></div>
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