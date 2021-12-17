import { gql } from "@apollo/client";
import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import { client, Joke } from "~/graphql";

type LoaderData = {
    jokes: Joke[];
};

export let loader: LoaderFunction = async () => {
    const result = await client.query({
        query: gql`
            query {
                jokes {
                    id
                    content
                }
            }
        `,
    });

    return result.data;
};
// https://remix.run/guides/routing#index-routes
export default function Index() {
    let { jokes } = useLoaderData<LoaderData>();

    return (
        <div>
            <h1>Hello world</h1>
            <ul>
                {jokes.map((joke) => (
                    <li key={joke.id}>{joke.content}</li>
                ))}
            </ul>
        </div>
    );
}
