const app = require("./app");
const apolloServer = require("./apolloServer");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.get("/", (_, res) => res.send("Server running"));

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connection success");
  } catch (error) {
    console.log("Database connection failed");
  }

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

startServer();
