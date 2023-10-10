# Stellar Transaction Compliance Tool

This tool allows users to enter their Stellar address and download a `.csv` file of all their transactions on the blockchain for tax compliance purposes.

## Live Demo

To test the functionality, visit [https://compliance-hackathon.paltalabs.io/](https://compliance-hackathon.paltalabs.io/) and paste your Stellar wallet address.

## Running Locally

To run the project on your local machine, follow these steps:

### Development Environment

1. **Docker installed**: make sure you have docker and docker-compose installed on your local machine.
2. **Docker Setup**: Ensure you've created the `compliance_kwickbit_paltalabs_network` network.
    If you need to create it `docker network create compliance_kwickbit_paltalabs_network`.
3. **Dependencies**: Run `npm install`.
4. **Indexer**: you should have your indexer up and running and set the environment variable `NEXT_APP_GRAPHQL_ENDPOINT` to its endpoint.
    If you are unsure about this, for dev mode you can check next session.
5. **Docker-Compose**: Launch the project using `docker-compose up --build`.

PS: changes are interac

### Stellar Indexer

If you're uncertain about which Stellar indexer to use in development mode:

1. Download this [subquery_sandbox](https://github.com/kwickbit/subquery_sandbox) in another directory.
2. Launch it using `docker-compose up --build` at the root of the subquery_sandbox project.



## Deployment

For deploying in a production environment:

1. **Hosting**: You can choose your preferred hosting platform (AWS, Google Cloud, Azure, etc.).
2. **Docker Image**: Deploy the image built using the Dockerfile located at `docker/Dockerfile`.
3. **Node Indexer Access**: Ensure that your deployed image can access the Stellar node indexer of your choice.
4. **Environment Variable**: Set the `NEXT_APP_GRAPHQL_ENDPOINT` variable to the endpoint of your Stellar indexer.

PS: if you need to deploy a stellar indexer in production please refer to the instructions README of the [subquery_sandbox](https://github.com/kwickbit/subquery_sandbox) repo. 
