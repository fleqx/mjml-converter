FROM node:16.3.0-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM node:16.3.0-alpine as deploy

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --prod
COPY --from=build /app/build ./build

EXPOSE 3000

RUN addgroup -S app && adduser -S -G app app && chown -R app:app /app
USER app

ENV MINIFY 1

CMD ["npm", "run", "start"]