// pages/api/searchTxFromAddress.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';

// Read the .graphql file
// const graphqlQuery: string = fs.readFileSync('queries/getTransfersFromAccount.graphql', 'utf-8').toString();
const isProd = process.env.NODE_ENV === 'production';
const filePath = isProd
    ? path.join(process.cwd(), './queries/getTransfersFromAccount.graphql')
    : 'queries/getTransfersFromAccount.graphql';

const graphqlQuery: string = fs.readFileSync(filePath, 'utf-8').toString();


// Define the GraphQL endpoint
const GRAPHQL_ENDPOINT: string = process.env.NEXT_APP_GRAPHQL_ENDPOINT ?? "";

async function getAccountDetails(accountId: string) {
    // Fetch using the query
    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: graphqlQuery,
            variables: { accountId: accountId }
        })
    });

    const data = await response.json();
    console.log("Data:", data)
    return data;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { address } = req.body

    try {
        const data = await getAccountDetails(address)
        res.status(200).json(data);
    } catch (e) {
        console.error("Error while fetching graphQl data: ", e)
        res.status(500).json({ error: 'Failed to fetch account details' });
    }


}
