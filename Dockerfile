# Stage 1 - Build the application
FROM node:18-alpine AS build

WORKDIR /src

COPY package*.json ./

RUN npm install --legacy-peer-deps --ignore-scripts

COPY ./environments /src/environments
COPY ./src	/src/src
COPY ./babel.config.json /src/babel.config.json
COPY ./Dockerfile /src/Dockerfile
COPY ./jest.config.js /src/jest.config.js
COPY ./nginx.conf /src/nginx.conf
COPY ./package.json /src/package.json
COPY ./package-lock.json /src/package-lock.json
COPY ./paths.js /src/paths.js
COPY ./postcss.config.js /src/postcss.config.js
COPY ./prettier.config.js /src/prettier.config.js
COPY ./README.md /src/README.md
COPY ./sonar-project.properties	 /src/sonar-project.properties
COPY ./tailwind.config.js /src/tailwind.config.js
COPY ./tsconfig.json /src/tsconfig.json
COPY ./webpack.config.js /src/webpack.config.js


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
