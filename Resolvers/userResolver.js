const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userResolver = {
  Query: {
    login: async (_, { input }) => {
      const existUser = await User.findOne({ email: input.email });
      if (!existUser) throw new Error("Plaese provide correct info");
      const valid = await bcrypt.compare(input.password, existUser.password);
      if (!valid) throw new Error("Plaese provide correct info");
      const accessToken = jwt.sign(
        { email: existUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1hr" }
      );
      existUser.accessToken = accessToken;
      return existUser;
    },
    getUsers: async (_, { input }, { auth }) => {
      if (!auth) throw new Error("Authentication required");
      const query = { email: { $in: input.emails } };
      const result = await User.find(query);
      return result;
    },
  },
  Mutation: {
    signup: async (_, { input }) => {
      const exist = await User.findOne({ email: input.email });
      if (exist) throw new Error("Email already exist");
      const password = await bcrypt.hash(input.password, 10);
      const newUser = new User({ ...input, password });
      const result = await newUser.save();
      const accessToken = jwt.sign(
        { email: result.email },
        process.env.JWT_SECRET,
        { expiresIn: "1hr" }
      );
      result.accessToken = accessToken;
      return result;
    },
  },
};

module.exports = userResolver;
