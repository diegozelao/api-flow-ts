FROM node:10.16.1-alpine

WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY /build/ ./
RUN npm install

# Bundle app source
##COPY src .

EXPOSE 80
CMD [ "ts-node", "src/app.ts ]
