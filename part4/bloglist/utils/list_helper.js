const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((total, blog) => total + blog.likes, 0)


const favouriteBlog = (blogs) => blogs.length > 0
    ? blogs.reduce((favourite, blog) => (blog.likes > favourite.likes ? blog: favourite))
    : null

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}