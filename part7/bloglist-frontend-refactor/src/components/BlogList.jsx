import Blog from "../components/Blog";
import { useState } from "react";
import { useSelector } from 'react-redux'

const BlogList = ({ user }) => {
  const blogs = useSelector(state => state.blogs)

  const [sortedBlogs, setSortedBlogs] = useState(
    [...blogs].sort((a, b) => b.likes - a.likes),
  );

  const changeBlogs = (newBlogs) => {
    setSortedBlogs([...newBlogs].sort((a, b) => b.likes - a.likes));
  };

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          changeBlogs={changeBlogs}
          blogs={sortedBlogs}
        />
      ))}
    </div>
  );
};

export default BlogList;
