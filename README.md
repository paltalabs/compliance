# compliance

If running local, use subquery_sandbox

## start
 
1. Set environment variables:
```
cp .env.example .env
```
 
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