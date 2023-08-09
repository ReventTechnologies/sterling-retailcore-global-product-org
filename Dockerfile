# Stage 1 - Build the application
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps --ignore-scripts

COPY ./environments /app/environments
COPY ./src	/app/src
COPY ./babel.config.json /app/babel.config.json
COPY ./Dockerfile /app/Dockerfile
COPY ./jest.config.js /app/jest.config.js
COPY ./nginx.conf /app/nginx.conf
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./paths.js /app/paths.js
COPY ./postcss.config.js /app/postcss.config.js
COPY ./prettier.config.js /app/prettier.config.js
COPY ./README.md /app/README.md
COPY ./sonar-project.properties	 /app/sonar-project.properties
COPY ./tailwind.config.js /app/tailwind.config.js
COPY ./tsconfig.json /app/tsconfig.json
COPY ./webpack.config.js /app/webpack.config.js


RUN npx tailwindcss -i ./src/styles/start.css -o ./src/styles/final.css

RUN npm run build:dev

# Stage 2 - Serve the application using Nginx
FROM nginx:stable-alpine3.17-slim

# Create a non-root user named "appuser" for Nginx
RUN addgroup -S appuser && adduser -S appuser -G appuser

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Adjust ownership of copied files to "appuser"
RUN chown -R appuser:appuser /usr/share/nginx/html && \
    chown -R appuser:appuser /var/cache/nginx && \
    chown -R appuser:appuser /var/run && \
    chown -R appuser:appuser /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown appuser:appuser /var/run/nginx.pid

# Switch to the non-root user for running Nginx
USER appuser

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
