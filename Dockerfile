# build stage
FROM node:lts-alpine as build-stage
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /dist /usr/share/nginx/html
EXPOSE 80
RUN sed -i '/index.html/a \ \ \ \ \ \ \ \ try_files $uri $uri/ /index.html;' /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
