const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware');

blogsRouter.get('/',  async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  try {
    const body = request.body

    const user = request.user

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

    const populatedResult = await result.populate('user', { username: 1, name: 1, id: 1 })
    response.status(201).json(populatedResult)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return response.status(400).json({error: error.message})
    }
    if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({error: error.message})
    }
    response.status(500).end()
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body

  if (!comment || typeof comment !== 'string' || comment.trim() === '') {
    return response.status(400).json({ error: 'Comment must be a non-empty string' })
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(400).json({error: 'Blog Id missing or not valid'})
  }

  blog.comments.push(comment)
  const updatedBlog = await blog.save()

  response.status(201).json(updatedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(400).json({error: 'Blog Id missing or not valid'})
  }

  const userid = request.user.id
  if (!userid || userid.toString() !== blog.user.toString()) {
    return response.status(401).json({error: 'token invalid'})
  }

  await blog.deleteOne()
  response.status(204).end()

})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true }
  ).populate('user', { username: 1, name: 1, id: 1 })

  updatedBlog
    ? response.status(200).json(updatedBlog)
    : response.status(404).end()
})

module.exports = blogsRouter