const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/',  async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(400).json({ error: 'UserId missing or not valid' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return response.status(400).send(error.message)
    }
    if (error.name === 'JsonWebTokenError') {
      return response.status(401).send(error.message)
    }
    response.status(500).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  deletedBlog
    ? response.status(204).end()
    : response.status(404).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true }
  )

  updatedBlog
    ? response.status(200).json(updatedBlog)
    : response.status(404).end()
})

module.exports = blogsRouter