# test/Dockerfile
FROM mcr.microsoft.com/playwright:v1.52.0-jammy 

WORKDIR /

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "test"]