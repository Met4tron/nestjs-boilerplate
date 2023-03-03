<h1 align="center">nestjs-boilerplate </h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

## Dependencies

- ORM: Prisma + PostgreSQL
- Logs: Pino + NestJS Pino
- Auth: Token + Refresh Token
- Service Repository Pattern

## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

## Run tests

```sh
# unit tests
npm run test

# watch mode
npm run test:watch

# e2e tests
npm run test:e2e
```

## Docker 
```sh
docker build . -t -p 3000:3000 nestjs-api

docker-compose up -d
```

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_