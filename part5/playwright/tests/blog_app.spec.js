const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Superuser',
        username: 'root',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('blogs')
    await expect(locator).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({page}) => {
      await page.getByTestId('username').fill('root')
      await page.getByTestId('password').fill('salainen')
      await page.getByTestId('login-button').click()
      await expect(page.getByTestId('user-info')).toContainText('Superuser')
    })

    test('fails with wrong credentials', async ({page}) => {
      await page.getByTestId('username').fill('root')
      await page.getByTestId('password').fill('epäsalainen')
      await page.getByTestId('login-button').click()
      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      // Log in
      await page.getByTestId('username').fill('root')
      await page.getByTestId('password').fill('salainen')
      await page.getByTestId('login-button').click()
      //
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByTestId('new-blog').click()
      await page.getByTestId('title-input').fill('Today I ate some pears')
      await page.getByTestId('author-input').fill('Iivari Anttila')
      await page.getByTestId('url-input').fill('http://localhost:3003/blogs/2')
      await page.getByTestId('create-blog').click()
      await page.getByTestId('user-info')
      await expect(page.getByText('a new blog Today I ate some pears by Iivari Anttila added')).toBeVisible()
      const blogs = await page.getByTestId('blog-collapsed')
      const count = await blogs.count()

      await expect(blogs.nth(count - 1)).toContainText('Today I ate some pears Iivari Anttila')
    })
  })
})