# Dockerfile para Frontend
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Nginx para servir o frontend
FROM nginx:alpine

# Corrigir caminho de build do Vite
COPY --from=build /app/dist /usr/share/nginx/html

# Configuração customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
