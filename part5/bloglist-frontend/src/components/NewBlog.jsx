import blogService from '../services/blogs'
import { useState } from 'react'

const NewBlog = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    try {
      const createdBlog = await blogService.create(newBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(prevBlogs => prevBlogs.concat(createdBlog))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={createBlog}>
      <div>
        title: <input
        type="text"
        value={title}
        name="Title"
        onChange={({target}) => setTitle(target.value)}
      />
      </div>
      <div>
        author: <input
        type="text"
        value={author}
        name="Author"
        onChange={({target}) => setAuthor(target.value)}
      />
      </div>
      <div>
        url: <input
        type="text"
        value={url}
        name="Url"
        onChange={({target}) => setUrl(target.value)}
      />
      </div>
      <button type="submit"> create </button>
    </form>
  )
}

export default NewBlog