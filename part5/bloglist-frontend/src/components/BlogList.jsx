import Blog from '../components/Blog'
import { useState } from 'react'

const BlogList = ({ blogs, setBlogs, user }) => {
  const [sortedBlogs, setSortedBlogs] = useState([...blogs].sort((a, b) => b.likes - a.likes))

  const changeBlogs = newBlogs => {
    setSortedBlogs([...newBlogs].sort((a, b) => b.likes - a.likes))
    setBlogs(newBlogs)
  }

  return (
    <div>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} changeBlogs={changeBlogs} blogs={sortedBlogs} />
      )}
    </div>
  )
}

export default BlogList