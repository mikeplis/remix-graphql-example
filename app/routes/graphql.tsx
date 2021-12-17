import { ActionFunction } from "remix";
import { graphql } from "graphql";
import { schema } from "~/graphql";

export const action: ActionFunction = async ({ request }) => {
    switch (request.method) {
        case "POST":
            const { query, variables } = await request.json();
            return await graphql({ schema, source: query, variableValues: variables });
        default:
            return "Method not supported";
    }
};
