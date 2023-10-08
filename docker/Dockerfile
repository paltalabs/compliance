# Use the Node 18 image as the base image
FROM node:18

WORKDIR /app

COPY my-next-app/package.json my-next-app/package-lock.json* /app/

# Install the dependencies and pm2 globally
RUN npm install && npm install -g pm2

COPY my-next-app/ /app/

# Build the application for production (uncomment the next line if you have a build script in your package.json)
RUN npm run build

# Start the application with pm2 in cluster mode
CMD ["pm2-runtime", "start", "npm", "--", "run", "start"]
