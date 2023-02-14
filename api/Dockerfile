#  Dockerfile for Node Express Backend api 
FROM node:14.15.3-alpine3.12
RUN npm install -g nodemon

WORKDIR /app
# Install Dependencies

COPY package.json .

RUN npm install
# Copy app source code

COPY . .

RUN npm install

# Exports
EXPOSE 8800

CMD ["npm","run","start"]
