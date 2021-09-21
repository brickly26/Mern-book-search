const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require("../modles");
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('savedBooks');
    },
    user: async () => {
      return User.findOne
    }
  }
}