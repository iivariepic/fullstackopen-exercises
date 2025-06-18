import blogService from "../services/blogs";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'

const NewBlog = ({ setBlogs, setNewBlogVisible }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch()

  const createBlog = async (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    try {
      const createdBlog = await blogService.create(newBlog);
      setTitle("");
      setAuthor("");
      setUrl("");
      setBlogs((prevBlogs) => prevBlogs.concat(createdBlog));
      setNewBlogVisible(false);
      dispatch(displayNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`))

    } catch (error) {
      if (error.response) {
        dispatch(displayNotification(error.response.data.error, true))
      } else if (error.request) {
        dispatch(displayNotification(error.request, true))
      } else {
        dispatch(displayNotification(error.message, true))
      }
    }
  };

  return (
    <form onSubmit={createBlog}>
      <div>
        <label htmlFor="title" data-testid="title-input">
          title:
        </label>
        <input
          id="title"
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <label htmlFor="author" data-testid="author-input">
          author:
        </label>
        <input
          id="author"
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <label htmlFor="url" data-testid="url-input">
          url:
        </label>
        <input
          id="url"
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit" data-testid="create-blog">
        {" "}
        create{" "}
      </button>
      <br />
      <button
        type="button"
        data-testid="cancel-new-blog"
        onClick={() => setNewBlogVisible(false)}
      >
        {" "}
        cancel{" "}
      </button>
    </form>
  );
};

export default NewBlog;
