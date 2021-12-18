import { graphql as graphqljs } from "graphql";
import { makeExecutableSchema } from "graphql-tools";

export type Joke = {
    id: string;
    name: string;
    content: string;
};

const jokes: Joke[] = [
    {
        id: "1",
        name: "Road worker",
        content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
    },
    {
        id: "2",
        name: "Frisbee",
        content: `I was wondering why the frisbee was getting bigger, then it hit me.`,
    },
    {
        id: "3",
        name: "Trees",
        content: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
    },
];

const typeDefs = `
    type Joke {
        id: ID!
        name: String!
        content: String!
    }

    type Query {
        jokes: [Joke]
        joke(id: ID!): Joke
    }
`;

const resolvers = {
    Query: {
        jokes: () => jokes,
        joke: (_: any, { id }: any) => {
            return jokes.find((joke) => joke.id === id);
        },
    },
};

/**
 * We need to somehow get access to a GraphQLSchema that we can pass to graphql-js.
 * Here, we're just generating it from a type definition string and a resolver map, but there
 * are other ways.
 *
 * For example, here's how you can get the schema with TypeGraphQL:
 * https://typegraphql.com/docs/emit-schema.html
 */
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Wrap the call to graphql-js, passing in our schema
export const graphql = (params: { query: string; variables?: { [k: string]: any } }) => {
    const { query, variables } = params;
    return graphqljs({ schema, source: query, variableValues: variables });
};
