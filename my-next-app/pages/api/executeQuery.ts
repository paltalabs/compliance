// pages/api/executeQuery.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import fetch from 'node-fetch';

// Read the .graphql file
const graphqlQuery: string = fs.readFileSync('queries/getStarted.graphql', 'utf-8').toString();
// Define the GraphQL endpoint
const GRAPHQL_ENDPOINT: string = process.env.NEXT_APP_GRAPHQL_ENDPOINT ?? "";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }
    console.log("graphqlQuery:", graphqlQuery)

    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: graphqlQuery,
            variables: {},
        }),
    });
    console.log("response:", response)

    const data = await response.json();
    console.log("data:", data)
    res.status(200).json(data);
}
