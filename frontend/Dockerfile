# Step 1: Build the app with Vite
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Serve the build with Nginx
FROM nginx:stable-alpine

# Copy build output to Nginx public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Replace default nginx.conf with your own if needed
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
