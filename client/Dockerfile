# Dockerfile for client# Stage 1: Build react client
FROM node:14.15.3-alpine3.12
#RUN apk add -U --no-cache git 
#RUN go get https://github.com/sonjaarsic/proba

# Working directory be app
WORKDIR /app
COPY package.json .

# Install dependencies
RUN npm install --legacy-peer-deps
# copy local files to app folder
COPY . .

EXPOSE 3000
CMD ["npm","start"]