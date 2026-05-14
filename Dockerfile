FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Ensure primevue expected image exists (placeholder) so webpack can resolve it in container builds
RUN node -e "const fs=require('fs');const dir='node_modules/primevue/resources/images';fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(dir+'/password-meter.png',Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=','base64'))"

RUN NODE_OPTIONS=--openssl-legacy-provider npx vue-cli-service build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]