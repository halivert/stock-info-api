# Backend

Backend API for stock info project.

## Installation guide

This project uses [Adonisjs](https://adonisjs.com/) and mysql.

Ensure you have Nodejs 14 or superior and a mysql server running with some
database, for example: `stock_info`.

- Clone the repo `git clone https://github.com/halivert/stock-info.git`
- Go into the directory and install dependencies `cd stock-info && yarn`
- Run production build `yarn build`
- Go into build directory `cd build`
- Install prod dependencies `yarn workspaces focus --production`
- Copy `.env.example` to current (build) directory `cp ../.env.example ./.env`
- Generate a new key `node ace generate:key`
- Paste the key in the `.env` file and also fill database info and stuff
- Serve it `node server.js`
