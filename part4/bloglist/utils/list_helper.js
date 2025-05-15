const _ = require("lodash");

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((total, blog) => total + blog.likes, 0)

const favouriteBlog = (blogs) => blogs.length > 0
    ? blogs.reduce((favourite, blog) => (blog.likes > favourite.likes ? blog: favourite))
    : null

const mostBlogs = (blogs) => {
  if (blogs.length < 1) return {}
  const authors = _.countBy(blogs, "author")
  const topAuthor = _.maxBy(_.keys(authors), author => authors[author])
  return {author: topAuthor, blogs: authors[topAuthor]}
}

const mostLikes = (blogs) => {
  if (blogs.length < 1) return {}
  const groupedByAuthors = _.groupBy(blogs, "author")
  const authorLikes = _.map(groupedByAuthors,
    (blogs, author) => ({
      author,
      likes: _.sumBy(blogs, "likes")
    }))
  return _.maxBy(authorLikes, "likes")
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}