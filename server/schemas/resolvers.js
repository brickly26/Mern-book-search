const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require("../modles");
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      return User.findOne({userName})
    },
    books: async (parent, { username }) => {
      const user = User.findOne({ username }).populate('savedBooks')
      const { savedBooks } = user;
      return savedBooks
    }
  },

  Mutation: {
    addUser: async (parent, arg) => {
      const user  = await User.create(arg);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError ("Incorrect email and password");
      }

      const correctPw = user.isCorrectPassword(password)

      if(!correctPw) {
        throw new AuthenticationError('Incorrect email or password');
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, {user, body} ) => {

      const user = await User.findOneAndUpdate(
        { _id: user.id },
        { $addToSet: { savedBooks: body }}
      );

      return user;
    },
    removeBook: async (parent, { user, params }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      )
    }
  }
}

module.exports = resolvers;