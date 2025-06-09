const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
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
      await page.getByTestId('user-info')
      await expect(page.getByText('Logged in as Superuser')).toBeVisible()
    })

    test('fails with wrong credentials', async ({page}) => {
      await page.getByTestId('username').fill('root')
      await page.getByTestId('password').fill('epäsalainen')
      await page.getByTestId('login-button').click()
      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })
})