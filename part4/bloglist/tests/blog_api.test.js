const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')
const { blogs } = require('./dummy_lists')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of blogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('unique identifier is named \'id\'', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  for (const blog of blogs) {
    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  }
})

after(async () => {
  await mongoose.connection.close()
})