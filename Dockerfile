FROM node
WORKDIR /leetcode
COPY package.json .
RUN npm install
EXPOSE 5000
COPY . .
ENV VITE_API_URL http://localhost:3000
RUN npm run build
CMD node server.cjs