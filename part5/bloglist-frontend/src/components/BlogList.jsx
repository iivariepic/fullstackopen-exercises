import Blog from '../components/Blog'

const BlogList = ({ blogs, user }) => {
  return (
    <div>
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
}

export default BlogList