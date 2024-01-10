# L2-B2-assignment-2

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## API

| Method | URL                                                                                      | Description                           |
| ------ | ---------------------------------------------------------------------------------------- | ------------------------------------- |
| POST   | `https://l2-b2-assignment-2-production.up.railway.app/api/users`                         | To Create User                        |
| GET    | `https://l2-b2-assignment-2-production.up.railway.app/api/users`                         | To get All users                      |
| GET    | `https://l2-b2-assignment-2-production.up.railway.app/api/users/{id}`                    | To get A specific user                |
| PUT    | `https://l2-b2-assignment-2-production.up.railway.app/api/users/{id}`                    | To update specific user               |
| PUT    | `https://l2-b2-assignment-2-production.up.railway.app/api/users/{id}`                    | To delete specific user               |
| PUT    | `https://l2-b2-assignment-2-production.up.railway.app/api/users/{id}/orders`             | To Create an order                    |
| GET    | `https://l2-b2-assignment-2-production.up.railway.app/api/users//{id}/orders`            | To get order from specific user       |
| GET    | `https://l2-b2-assignment-2-production.up.railway.app/api/users/{id}/orders/total-price` | To get total price from specific user |

```
yarn
```

## Installation

```
yarn
```

## **Build**

```
yarn build
```

Run TypeScript compiler (tsc) to build the project.

## **Start (Production)**

```
yarn start:prod
```

Starts the server in production mode using ts-node-dev.

## **Start (Development)**

```
yarn start:dev
```

Starts the server in development mode using ts-node-dev.

## **Lint**

```
yarn lint
```

Runs ESLint to lint TypeScript files in the src directory.

## **Lint (Fix)**

```
yarn lint:fix
```

Runs ESLint with auto-fix to fix linting issues.

## **Prettier**

```
yarn prettier
```

Runs Prettier to format source files according to defined rules.

## **Prettier (Fix)**

```
yarn prettier:fix
```

Runs Prettier to fix and format source files.
