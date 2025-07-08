# Stage 1: Build Angular app
FROM node:20 as builder


WORKDIR /app
RUN npm install -g @angular/cli

COPY package*.json ./
RUN npm install --force

COPY . ./
RUN ng build  --configuration=production --base-href=/chat/

# Stage 2: Serve with NGINX
FROM nginx:alpine
COPY --from=builder app/dist/kyc-chat-frontend/browser /usr/share/nginx/html/chat
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]