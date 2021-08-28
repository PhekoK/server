#Create image based off of the node image
FROM node:12-alpine as build-step

# Create directory our app will be placed
RUN mkdir -p /usr/src/app

# Change dir so that our commands run inside the new dir
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /app

# Install dependencies
RUN npm install

# Get all the code needed to run the app
COPY . /app

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]