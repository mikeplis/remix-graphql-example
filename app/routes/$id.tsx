import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import type { Joke } from "~/lib/graphql";
import { graphql } from "~/lib/graphql";

type LoaderData = {
    joke: Joke;
};

export let loader: LoaderFunction = async ({ params }) => {
    const result = await graphql({
        query: `
            query GetJoke($id: ID!) {
                joke(id: $id) {
                    id
                    name
                    content
                }
            }
        `,
        variables: {
            id: params.id,
        },
    });

    return result.data;
};

export default function Joke() {
    let { joke } = useLoaderData<LoaderData>();

    return (
        <div>
            <h1>{joke.name}</h1>
            <p>{joke.content}</p>
        </div>
    );
}
