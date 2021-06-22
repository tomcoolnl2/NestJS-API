
## Description

<p>A boilerplate for building efficient and scalable server-side applications with NodeJS, [Nest](https://github.com/nestjs/nest) and TypeScript.</p>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# local production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Swagger

Visit `/swagger`

## TODO
[x] Add Validation / Error handling
[x] Introduce TypeORM for Data Persistence
[x] Authenticate with JWT
[x] Add VSCode Debugging
[x] Add to a Repo in Gitlab
[x] Introduce Authorization / Ownership     
[x] Implement logging
[x] Introduce environment dependent config
[x] Introduce .env(.local) variables (e.g. Production ready)
[x] Write extensive Unit Tests to promote TTD
[x] Introduce i18n for response messages
[ ] Introduce QraphQL
[ ] Replace PostGres for MongoDB
[ ] Add finalized PostMan config to the Repo?
[ ] Implement extensive logging, through env.NODE_ENVs 9e.g. SingIn/Up)

## Wish list
[x] Add Swagger, incl Authorisation
[ ] Hang everything in NX - MicroServices in a MonoRepo
[ ] Connect to a dummy Frontend SPA (React?)
[ ] Containerize API and DB seperately and combine using Docker-compose
[ ] Connect to a S3 with Beanstalk and a production ready PostGres DB
[ ] AWS Pipelines for deployment
[ ] Clone/Fork to builda multiple Assessement tool - write a technical design for it
[ ] Test containers with K8s
[ ] Authenticate through our Okta / Office 365
[ ] Use this boilerplate to build a single Assessement 
[ ] https://wanago.io/2020/05/11/nestjs-api-controllers-routing-module/
