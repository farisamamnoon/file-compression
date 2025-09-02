FROM node:20
WORKDIR /app
COPY package*.json ./

ENV PORT=8000

RUN npm install 

COPY . .

CMD [ "npm", "start" ]