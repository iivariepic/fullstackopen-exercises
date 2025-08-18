const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const Book = require("./models/book")
const Author = require("./models/author")
const { GraphQLError } = require("graphql/index")
const User = require("./models/user")
const jwt = require("jsonwebtoken")

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      let result = await Book.find({}).populate('author')
      if (args.author) {
        result = result.filter(book => book.author.name === args.author)
      }
      if (args.genre) {
        result = result.filter(book => book.genres.includes(args.genre))
      }
      return result
    },

    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}).populate('books'),

    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const existingAuthor = await Author.findOne({ name: args.author })

      let book
      let author
      if (!existingAuthor) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Author creation during book creation failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
        book = new Book({ ...args, author: author })
      } else {
        author = existingAuthor
        book = new Book({ ...args, author: existingAuthor })
      }

      try {
        await book.save()

        author.books = author.books.concat(book._id)
        await author.save()

      } catch (error) {
        throw new GraphQLError('Book creation failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) return null

      author.born = args.setBornTo
      return author.save()
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
    }
  },
}

module.exports = resolvers