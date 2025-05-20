FROM node:22-slim

RUN mkdir -p /app && chown -R node:node /app

WORKDIR /app

COPY package*.json ./

RUN npm install -g tsx
RUN npm install --registry=https://registry.npmjs.org/

COPY . .

ENV APP_PORT 3232

EXPOSE ${APP_PORT}

CMD ["npm", "run", "start"]