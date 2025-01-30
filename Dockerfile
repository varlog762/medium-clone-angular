# --- Build Stage ---
FROM node:lts-alpine AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# --- Production Stage ---
FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/dist/medium-clone-angular/browser /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
