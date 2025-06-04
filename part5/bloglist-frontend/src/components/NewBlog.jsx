import blogService from '../services/blogs'
import { useState } from 'react'

const NewBlog = ({ setBlogs, setNotification, setNewBlogVisible }) => {
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
      setNewBlogVisible(false)
      setNotification({
        message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
        isError: false
      })
    } catch (error) {
      if (error.response) {
        setNotification({ message: error.response.data, isError: true })
      } else if (error.request) {
        setNotification({ message: error.request, isError: true })
      } else {
        setNotification({ message: error.message, isError: true })
      }
      setTimeout(() => {
        setNotification({ message: null, isError: false });
      }, 5000);
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
      <br/>
      <button type="button" onClick={() => setNewBlogVisible(false)}> cancel </button>
    </form>
  )
}

export default NewBlog