# Use the official node image as a base image
FROM node:18.18.2

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Remove node_modules and package-lock.json and reinstall dependencies
RUN rm -rf node_modules package-lock.json
RUN npm install

# Build the application
RUN npm run build

# Install a simple HTTP server to serve the built files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "dist"]