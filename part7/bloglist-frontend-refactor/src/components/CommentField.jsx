import { useState } from "react";
import { useDispatch } from 'react-redux'
import { commentOn } from "../reducers/blogReducer.js";

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
      <input
        id="comment"
        type="text"
        value={comment}
        name="comment"
        onChange={({ target }) => setComment(target.value)}
      />
      <button type="submit">{" add comment "}</button>
    </form>
  )
}

export default CommentField;
