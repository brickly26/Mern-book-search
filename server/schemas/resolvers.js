const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require("../modles");
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('savedBooks');
    },
    user: async (parent, { username }) => {
      return User.findOne({userName}).populate('savedBooks')
    },
    books
  }
}

module.exports = resolvers;