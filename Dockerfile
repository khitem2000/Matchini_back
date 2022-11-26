FROM node:16
WORKDIR /Users/khitemmathlouthi/Desktop/images

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 9090

CMD [ "npm", "start" ]