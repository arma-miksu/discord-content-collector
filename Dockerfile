FROM node:12

WORKDIR /app

COPY src src
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json tsconfig.json

RUN npm install --production \
  && npm run build

ENTRYPOINT ["node"]
CMD ["/app/dist/index.js"]
