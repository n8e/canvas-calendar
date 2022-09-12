import { createServer } from "@graphql-yoga/node";

const typeDefs = /* GraphQL */ `
  type Event {
    id: ID!
    title: String!
    start: Int!
    end: Int!
  }

  type Query {
    events: [Event!]!
  }
`;

const resolvers = {
  Query: {
    async events() {
      return [
        {
          id: 1,
          title: "Call with Bob",
          start: 420,
          end: 440,
        },
        {
          id: 2,
          title: "Lunch",
          start: 720,
          end: 780,
        },
        {
          id: 3,
          title: "Meeting with Claire",
          start: 780,
          end: 840,
        },
        {
          id: 4,
          title: "Review OKRs",
          start: 870,
          end: 900,
        },
        {
          id: 5,
          title: "Interview Ahmed",
          start: 870,
          end: 930,
        },
      ];
    },
  },
};

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  endpoint: "/api/graphql",
  // graphiql: false // uncomment to disable GraphiQL
});

export default server;
