# Build stage
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Define the build-time variable
ARG API_URL

RUN sed -i "s|__API_URL__|${API_URL}|g" src/environments/environment.prod.ts

RUN npm run build

# Runtime stage
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/client/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
