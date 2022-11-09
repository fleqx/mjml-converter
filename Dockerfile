FROM node:19.0.1-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM node:19.0.1-alpine as deploy
ARG version=0.0.0-docker

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --prod
RUN npm version $version --no-git-tag-version

COPY --from=build /app/build ./build

EXPOSE 3000

RUN addgroup -S app && adduser -S -G app app && chown -R app:app /app
USER app

ENV MINIFY 1

CMD ["npm", "run", "start"]