#Create image based off of the node image
#FROM node:12-alpine as build-step

 # Create image based on the official Node 6 image from the dockerhub
FROM node:latest

# Create directory our app will be placed
RUN mkdir -p /usr/src/app

# Change dir so that our commands run inside the new dir
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app

# Install dependencies
RUN npm install

#RUN npm install nodemon

# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]