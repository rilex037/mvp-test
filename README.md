Kanban board: https://trello.com/b/oN2ZLAoC/mvp-test

# MVP - TEST

## Running smart contract tests:

- If we are staring project for the first time, we should run `make dockerize`.
  If all dependencies are already installed then we can just run `make start-containers`.
- Run `make test`

## Running the project:

- If we are staring project for the first time, we should run `make dockerize`.
  if all dependencies are already installed then we can just run `make start-containers`.
- To start local blockchain network, run `make run-network`, and leave this console tab running.
- We deploy our smart contracts with `make deploy` command.
- To start the font-end , run `make run-client`
- In the next terminal we can start api with `make run-api`. Migration and seeding should have already been done with the dockerize command.

## Port Bindings:

- http://localhost/ - Frontend
- http://localhost:8545 - Local Ethereum network
- http://localhost:3000 - API
