const jwt = require("jsonwebtoken");
const User = require("../models/user");
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }

  next()
}

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({error: 'token invalid'})
    }
    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(400).json({error: 'UserId missing or not valid'})
    }

    request.user = user
    next()
  } catch (error) {
    return response.status(401).json({ error: 'invalid token' })
  }
}

module.exports = {
  tokenExtractor,
  userExtractor
}
