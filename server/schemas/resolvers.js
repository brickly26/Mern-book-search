const { AuthenticationError } = require('apollo-server-express');
const { User } = require("../models");
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      return User.findById(context.user._id).populate('savedBooks')
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password}) => {
      const user  = await User.create( { username, email, password });
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
    addBook: async (parent, args, context ) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user.id },
          { $addToSet: { savedBooks: args }},
          { new: true, runValidators: true }
        );
      }
    },
    removeBook: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: args.bookId } } },
          { new: true }
        )
      }
    }
  }
}

module.exports = resolvers;