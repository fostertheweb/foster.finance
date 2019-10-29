const resolvers = {
  Mutation: {
    async createUser(_parent, { input }, { db }) {
      try {
        return await db.collection("users").add(input);
      } catch (err) {
        console.error(err);
        return err;
      }
    },
  },
};

export default resolvers;
