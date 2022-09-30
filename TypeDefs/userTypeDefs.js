const { gql } = require("apollo-server-express");

const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    accessToken: String!
  }
  input login {
    email: String!
    password: String!
  }
  input signup {
    name: String!
    email: String!
    password: String!
  }
  input getUsers {
    emails: [String!]!
  }
  extend type Query {
    login(input: login): User
    getUsers(input: getUsers): [User!]
  }
  extend type Mutation {
    signup(input: signup): User
  }
`;

module.exports = userTypeDefs;
