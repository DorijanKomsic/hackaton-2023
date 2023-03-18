FROM node:19
WORKDIR /app
COPY ./package.json ./package.json
COPY  . .
EXPOSE  5000
RUN npm install
CMD ["npm","start"]