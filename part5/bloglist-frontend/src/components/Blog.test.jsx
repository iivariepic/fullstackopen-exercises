import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
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

  render(<Blog blog={blog} user={user}/>)

  // Title and author are rendered,
  const element = screen.getByText('This is the best way to learn functional programming Dwayne Johnson')
  expect(element).toBeDefined()
  // but not likes or url
  expect(element).not.toHaveTextContent('likes')
  expect(element).not.toHaveTextContent(blog.url)
})