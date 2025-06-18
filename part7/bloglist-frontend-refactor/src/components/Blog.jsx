import { useState } from "react";
import { useSelector } from "react-redux";

const Blog = ({ blog, like, deleteBlog }) => {
  const [expanded, setExpanded] = useState(false);
  const user = useSelector(state => state.user)


  const collapsedView = (
    <div className="blog" data-testid="blog-collapsed">
      {blog.title} {blog.author}{" "}
      <button data-testid="expand-button" onClick={() => setExpanded(true)}>
        {" "}view{" "}
      </button>
    </div>
  );

  const expandedView = (
    <div className="blog" data-testid="blog-expanded">
      <div>
        {blog.title} {blog.author}{" "}
        <button data-testid="hide-button" onClick={() => setExpanded(false)}>
          {" "}hide{" "}
        </button>
      </div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}{" "}
        <button data-testid="like-button" onClick={like}>
          {" "}like{" "}
        </button>
      </div>
      {user.id === blog.user.id && (
        <div>
          <button data-testid="delete-button" onClick={deleteBlog}>
            {" "}delete{" "}
          </button>
        </div>
      )}
    </div>
  );

  return <>{expanded ? expandedView : collapsedView}</>;
};

export default Blog;
