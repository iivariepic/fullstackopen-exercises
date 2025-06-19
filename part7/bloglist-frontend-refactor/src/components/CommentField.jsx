import { useState } from "react";
import { useDispatch } from 'react-redux'
import { commentOn } from "../reducers/blogReducer.js";
import {
  TextField,
  Button, Box
} from '@mui/material'

const CommentField = ({ blog }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch()

  const onSubmit = (event) => {
    event.preventDefault()
    dispatch(commentOn(blog, comment))
    setComment('')
  }

  return (
    <form onSubmit={onSubmit}>
      <Box display="flex">
        <TextField
          id="comment"
          type="text"
          value={comment}
          name="comment"
          label="comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <Button variant="contained" color="primary" type="submit">{" add comment "}</Button>
      </Box>
    </form>
  )
}

export default CommentField;
