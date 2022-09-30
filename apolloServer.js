const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./TypeDefs/index");
const resolvers = require("./Resolvers/index");
const context = require("./Context/context");

const apolloServer = new ApolloServer({ typeDefs, resolvers, context });

module.exports = apolloServer;
