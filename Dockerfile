FROM node AS build

WORKDIR /app

# RUN apt update && apt install dos2unix

COPY package*.json .

RUN npm install

COPY . . 

RUN npm build

ENTRYPOINT ["npm", "run", "start"]