const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const {blogs, listWithOneBlog} = require('./dummy_lists')

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