# Use Node.js base image with the desired version
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port on which your Node.js app runs
EXPOSE 3000

# Command to run your Node.js application
CMD ["node", "index.js"]