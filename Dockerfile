# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (for layer caching)
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy all source code
COPY . .

# App listens on port 7777
EXPOSE 7777

# Start the app
CMD ["node", "src/app.js"]
