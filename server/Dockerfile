# Create image based on the official Node 6 image from dockerhub
FROM node:6

# Create a directory where our app will be placed
RUN mkdir /app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
ADD /server/package.json /app/server/
ADD /client/package.json /app/client/
ADD /package.json /app/

# Install dependecies
RUN npm install
RUN cd ./server && npm install
RUN cd ./client && npm install

# Expose the port the app runs in
EXPOSE 3000

# Link current folder to container
ADD . /app/

# Serve the app
CMD ["npm", "start"]