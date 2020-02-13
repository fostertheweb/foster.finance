const { ApolloServer } = require("apollo-server");
const { schema, context } = require("./app");

const options = {
  cors: {
    origin: true,
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Origin", "Accept", "Authorization"],
  },
};

const server = new ApolloServer({
  schema,
  context,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
