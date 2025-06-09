const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const {blogs, listWithOneBlog} = require('./dummy_data')

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
  test('when list has multiple blogs, equals the total likes', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 7 + 5 + 12 + 10 + 2)
  })
  test('when list is empty, equals 0', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })
})

describe('favourite blog', () => {
  test('when list has only one blog, returns the blog', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })
  test('when list has multiple blogs, returns the blog with the most likes', () => {
    const result = listHelper.favouriteBlog(blogs)
    const BLOG_WITH_MAX_LIKES = blogs[2]
    assert.deepStrictEqual(result, BLOG_WITH_MAX_LIKES)
  })
  test('when list is empty, returns null', () => {
    assert.strictEqual(listHelper.favouriteBlog([]), null)
  })
})

describe('most blogs', () => {
  test('when list has multiple blogs, returns the author with the most blogs and the amount of blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    const DESIRED_RESULT = { author: "Robert C. Martin", blogs: 3 }
    assert.deepStrictEqual(result, DESIRED_RESULT)
  })
  test('when list has one blog, returns the author of that blog and the value 1', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    const DESIRED_RESULT = { author: "Edsger W. Dijkstra", blogs: 1 }
    assert.deepStrictEqual(result, DESIRED_RESULT)
  })
  test('when list has no blogs, returns an empty object', () => {
    const result = listHelper.mostBlogs([])
    const DESIRED_RESULT = {}
    assert.deepStrictEqual(result, DESIRED_RESULT)
  })
})

describe('most likes', () => {
  test('when list has multiple blogs, returns the author with the most likes and the amount of likes', () => {
    const result = listHelper.mostLikes(blogs)
    const DESIRED_RESULT = { author: "Edsger W. Dijkstra", likes: 17 }
    assert.deepStrictEqual(result, DESIRED_RESULT)
  })
  test('when list has one blog, returns the author of that blog and amount of likes of that blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    const DESIRED_RESULT = { author: "Edsger W. Dijkstra", likes: 5 }
    assert.deepStrictEqual(result, DESIRED_RESULT)
  })
  test('when list has no blogs, returns an empty object', () => {
    const result = listHelper.mostLikes([])
    const DESIRED_RESULT = {}
    assert.deepStrictEqual(result, DESIRED_RESULT)
  })
})