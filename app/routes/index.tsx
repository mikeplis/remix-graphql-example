import { Link, LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import type { Joke } from "~/lib/graphql";
import { graphql } from "~/lib/graphql";

type LoaderData = {
    jokes: Joke[];
};

export let loader: LoaderFunction = async () => {
    const result = await graphql({
        query: `
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
export default function Jokes() {
    let { jokes } = useLoaderData<LoaderData>();

    return (
        <div>
            <h1>Hello world</h1>
            <ul>
                {jokes.map((joke) => (
                    <li key={joke.id}>
                        <Link to={joke.id}>{joke.content}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
