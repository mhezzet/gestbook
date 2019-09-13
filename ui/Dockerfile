FROM node:12-alpine as builder

WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
RUN yarn run build

FROM nginx
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /app