import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const CollapsedBlog = ({ blog }) =>
  <div className="blog" data-testid="blog-collapsed">
    <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
  </div>

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs= [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <CollapsedBlog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
};

export default BlogList;
