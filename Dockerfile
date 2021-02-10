FROM  node:12.17.0

RUN mkdir /root/app

WORKDIR /root/app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY .prettierrc.js .

RUN npm install

COPY config /root/app/config
COPY src /root/app/src

EXPOSE 3000

CMD ["npm", "run", "start"]
