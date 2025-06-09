const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({page, request}) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Superuser',
        username: 'root',
        password: 'salainen'
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Superuser2',
        username: 'root2',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({page}) => {
    const locator = await page.getByText('blogs')
    await expect(locator).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({page}) => {
      await page.getByTestId('username').fill('root')
      await page.getByTestId('password').fill('salainen')
      await expect(page.getByTestId('password')).toHaveValue('salainen')
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
    const superuser = {
      username: 'root',
      password: 'salainen'
    }

    const superuser2 = {
      username: 'root2',
      password: 'salainen'
    }

    const logIn = async (page, user) => {
      await page.getByTestId('username').fill(user.username)
      await page.getByTestId('password').fill(user.password)
      await expect(page.getByTestId('username')).toHaveValue(user.username)
      await expect(page.getByTestId('password')).toHaveValue(user.password)
      await page.getByTestId('login-button').click()
    }

    const createBlog = async (page, {title, author, url}) => {
      await page.getByTestId('new-blog').click()
      await page.getByTestId('title-input').fill(title)
      await page.getByTestId('author-input').fill(author)
      await page.getByTestId('url-input').fill(url)
      await expect(page.getByTestId('title-input')).toHaveValue(title)
      await expect(page.getByTestId('author-input')).toHaveValue(author)
      await expect(page.getByTestId('url-input')).toHaveValue(url)
      await page.getByTestId('create-blog').click()
      await expect(page.getByTestId('notification')).toContainText(title)
    }

    const createBlogViaApi = async (request, blog, token) => {
      await request.post('http://localhost:3003/api/blogs', {
        data: blog,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    }

    const getToken = async (request, username, password) => {
      const res = await request.post('http://localhost:3003/api/login', {
        data: { username, password }
      })
      const body = await res.json()
      return body.token
    }

    test('a new blog can be created', async ({page}) => {
      await logIn(page, superuser)
      await createBlog(page, {
        title: 'Today I ate some pears',
        author: 'Iivari Anttila',
        url: 'http://localhost:3003/blogs/2'
      })
      const blogs = await page.getByTestId('blog-collapsed')
      const count = await blogs.count()

      await expect(blogs.nth(count - 1)).toContainText('Today I ate some pears Iivari Anttila')
    })

    test('can like a blog', async ({page, request}) => {
      const token = await getToken(request, 'root', 'salainen')
      await createBlogViaApi(request, {
        title: 'Today I ate some pears',
        author: 'Iivari Anttila',
        url: 'http://localhost:3003/blogs/2'
      }, token)
      await page.reload()
      await logIn(page, superuser)
      const blogs = await page.getByTestId('blog-collapsed')
      await blogs.nth(0).getByTestId('expand-button').click()
      await page.getByTestId('like-button').click()
      await expect(page.getByTestId('blog-expanded')).toContainText('likes 1')
    })

    test('can delete own blog', async ({page, request }) => {
      const token = await getToken(request, 'root', 'salainen')
      await createBlogViaApi(request, {
        title: 'Today I ate some pears',
        author: 'Iivari Anttila',
        url: 'http://localhost:3003/blogs/2'
      }, token)
      await page.reload()
      await logIn(page, superuser)
      const blogs = await page.getByTestId('blog-collapsed')
      await blogs.nth(0).getByTestId('expand-button').click()
      page.on('dialog', dialog => dialog.accept())
      const expandedBlogs = await page.getByTestId('blog-expanded')
      await expandedBlogs.nth(0).getByTestId('delete-button').click()
      await expect(page.getByText('This is the blog to be deleted Iivari Anttila ')).not.toBeVisible()
    })

    test('delete button is not visible to other users', async ({page, request}) => {
      const token = await getToken(request, 'root', 'salainen')
      await createBlogViaApi(request, {
        title: 'Today I ate some pears',
        author: 'Iivari Anttila',
        url: 'http://localhost:3003/blogs/2'
      }, token)
      await page.reload()
      await logIn(page, superuser2)
      await page.waitForSelector('[data-testid="blog-collapsed"]')
      const blogs = await page.getByTestId('blog-collapsed')
      await blogs.nth(0).getByTestId('expand-button').click()
      const expandedBlogs = await page.getByTestId('blog-expanded')
      await expect(expandedBlogs.nth(0).getByTestId('delete-button')).not.toBeVisible()
    })

    test('blogs are sorted by likes', async ({ page, request }) => {
      const token = await getToken(request, 'root', 'salainen')
      await createBlogViaApi(request, {
        title: 'Least liked',
        author: 'Author1',
        url: 'http://url1.com',
        likes: 1
      }, token)

      await createBlogViaApi(request, {
        title: 'Second most liked',
        author: 'Author2',
        url: 'http://url2.com',
        likes: 2
      }, token)

      await createBlogViaApi(request, {
        title: 'Most liked',
        author: 'Author3',
        url: 'http://url3.com',
        likes: 5
      }, token)

      await page.reload()
      await logIn(page, superuser)
      await page.waitForSelector('[data-testid="blog-collapsed"]')

      const blogs = await page.getByTestId('blog-collapsed')
      await expect(blogs.first()).toContainText('Most liked')
    })

  })
})