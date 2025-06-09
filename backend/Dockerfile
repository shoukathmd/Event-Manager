# Use a lightweight Node.js base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# Expose the GraphQL server port
EXPOSE 4000

# Start the server
CMD ["node", "dist/index.js"]