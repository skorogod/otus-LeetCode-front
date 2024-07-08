FROM node
WORKDIR /leetcode
COPY package.json .
RUN npm install
EXPOSE 5000
COPY . .
ARG API_HOST
ENV API_URL=$API_HOST
ARG API_PORT
ENV API_URL=$API_PORT
RUN npm run build
CMD node server.cjs