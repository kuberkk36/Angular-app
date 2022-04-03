FROM node:12-alpine as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
WORKDIR /usr/share/ng/html
COPY --from=builder /app/dist/ecommerce-digitalgreen /usr/share/ng/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
