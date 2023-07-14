# Stage 1 - Build the application
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npx tailwindcss -i ./src/styles/start.css -o ./src/styles/final.css

RUN npm run build:dev

# Stage 2 - Serve the application using Nginx
FROM nginx:1.21-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
