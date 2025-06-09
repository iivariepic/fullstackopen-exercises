const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const User = require('../models/user')
const { existingUser, tooShortUsername, tooShortPassword, newUser } = require('./dummy_data')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const userObject =  new User(existingUser)
  await userObject.save()
})

describe('user creation', () => {
  test('when user fills all criteria, creates successfully', async () => {
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const returnedUser = response.body

    assert.strictEqual(returnedUser.username, newUser.username)
    assert.strictEqual(returnedUser.name, newUser.name)
  })
  test('when username is too short returns status code 400', async () => {
    await api
      .post('/api/users')
      .send(tooShortUsername)
      .expect(400)
  })
  test('when password is too short returns status code 400', async () => {
    await api
      .post('/api/users')
      .send(tooShortPassword)
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})