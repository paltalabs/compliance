# compliance

If running local, use subquery_sandbox

## start
 
 Set environment variables:
 ```
 cp .env.example .env
 ```
 Let it like this if you are running subquery_sandbox locally. If not choose the URL for your graphql endpoint.
 
2. Go to docker container
```
cd docker
bash run.sh
```

3. Open my-next-app folder and install packages
```
cd my-next-app
yarn
```

4. Serve the next app in development mode
```
yarn dev
```