const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')
const { blogs } = require('./dummy_data')

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

test('new blog post is created successfully', async () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const returnedBlog = response.body

  assert.strictEqual(returnedBlog.title, newBlog.title)
  assert.strictEqual(returnedBlog.author, newBlog.author)
  assert.strictEqual(returnedBlog.url, newBlog.url)
  assert.strictEqual(returnedBlog.likes, newBlog.likes)
})

test('undefined like amount defaults to 0', async () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const returnedBlog = response.body

  assert.strictEqual(returnedBlog.likes, 0)
})

test('undefined title returns status code 400', async () => {
  const newBlog = {
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('undefined url returns status code 400', async () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('remove blog', async () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  await api
    .delete(`/api/blogs/${response.body.id}`)
    .expect(204)
})

test('update blog information', async () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  newBlog.likes = 1

  const updatedBlog = await api
    .put(`/api/blogs/${response.body.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(updatedBlog.body.likes, newBlog.likes)
})

after(async () => {
  await mongoose.connection.close()
})