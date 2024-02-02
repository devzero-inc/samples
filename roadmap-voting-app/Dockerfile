# FROM node:20-alpine

# RUN apk add --no-cache docker-cli

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN chmod +x /app/entrypoint.sh

# EXPOSE 3000

# ENTRYPOINT ["/app/entrypoint.sh"]

# Use Docker's official image as the base
FROM docker:20-dind

# Install Node.js and npm
RUN apk add --no-cache nodejs npm

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) for npm install
COPY package*.json ./

# Install your application's dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Make your entrypoint script executable
RUN chmod +x /app/entrypoint.sh

# Expose the port your app runs on
EXPOSE 3000

# Start Docker daemon and run your application
ENTRYPOINT ["sh", "-c", "dockerd-entrypoint.sh &>/dev/null & /app/entrypoint.sh"]
