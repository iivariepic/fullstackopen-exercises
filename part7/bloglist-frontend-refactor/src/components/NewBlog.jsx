import { useState } from "react";
import { useDispatch } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'
import { createBlog } from "../reducers/blogReducer.js";
import { Link } from "react-router-dom";
import {
  Button,
  TextField,
  Box
} from '@mui/material'

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    try {
      await dispatch(createBlog(newBlog))
      setTitle("");
      setAuthor("");
      setUrl("");
      dispatch(displayNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`))

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
    <form onSubmit={create}>
      <h2>Create Blog</h2>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          id="title"
          type="text"
          value={title}
          name="title"
          label="title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextField
          id="author"
          type="text"
          value={author}
          name="author"
          label="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <TextField
          id="url"
          type="text"
          value={url}
          name="url"
          label="url"
          onChange={({ target }) => setUrl(target.value)}
        />
        <Box display="flex" gap={1}>
          <Button
            type="submit"
            data-testid="create-blog"
            variant="contained"
            color="primary"
          >
            create
          </Button>
          <Button
            type="button"
            data-testid="cancel-new-blog"
            variant="contained"
            color="primary"
            component={Link}
            to="/"
          >
            cancel
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default NewBlog;
