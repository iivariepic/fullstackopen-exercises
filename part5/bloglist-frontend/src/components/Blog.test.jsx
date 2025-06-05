import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

// Components and objects used in tests:
const user = {
  username: "ivriant",
  name: "Iivari Anttila",
  id: "2agdadfggfgf"
}

const blog = {
  title: "This is the best way to learn functional programming",
  author: "Dwayne Johnson",
  likes: 300,
  url: "https://rockblog.com/article/2",
  user
}
//

test('renders only title and author when not expanded', () => {
  render(<Blog blog={blog} user={user}/>)

  // Title and author are rendered,
  const element = screen.getByText('This is the best way to learn functional programming Dwayne Johnson')
  expect(element).toBeDefined()
  // but not likes or url
  expect(element).not.toHaveTextContent(`likes ${blog.likes}`)
  expect(element).not.toHaveTextContent(blog.url)
})

test('renders likes and url when expanded', async () => {
  render(
    <Blog blog={blog} user={user}/>
  )

  const interactiveUser = userEvent.setup
  const button = screen.getByText('view')
  await interactiveUser().click(button)

  const element = screen.getByTestId('blog-expanded')
  expect(element).toHaveTextContent(`likes ${blog.likes}`)
  expect(element).toHaveTextContent(blog.url)
})