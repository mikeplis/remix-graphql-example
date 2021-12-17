import { makeExecutableSchema } from "graphql-tools";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";

export type Joke = {
    id: number;
    name: string;
    content: string;
};

const jokes: Joke[] = [
    {
        id: 1,
        name: "Road worker",
        content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
    },
    {
        id: 2,
        name: "Frisbee",
        content: `I was wondering why the frisbee was getting bigger, then it hit me.`,
    },
    {
        id: 3,
        name: "Trees",
        content: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
    },
];

const typeDefs = gql`
    type Joke {
        id: Int!
        name: String!
        content: String!
    }

    type Query {
        jokes: [Joke]
    }
`;

const resolvers = {
    Query: {
        jokes: () => jokes,
    },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    ssrMode: true,
    link: new SchemaLink({ schema }),
});
