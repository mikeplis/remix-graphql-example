import { ActionFunction } from "remix";
import { graphql } from "~/lib/graphql";

export const action: ActionFunction = async ({ request }) => {
    switch (request.method) {
        case "POST":
            const { query, variables } = await request.json();
            return await graphql({ query, variables });
        default:
            return "Method not supported";
    }
};
