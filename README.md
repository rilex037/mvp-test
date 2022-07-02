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

# Api Endpoints:

- http://localhost:3000/v1/votes
- http://localhost:3000/v1/candidates

Every 15 seconds, API will make a request to smart contract, look for the new votes, and update db accordingly.
endpoint `http://localhost:3000/v1/votes`, will group all votes by candidate, and sum all votes for that candidate. May not perform great for 6 million votes, but didn't really test it.

Scheduler instead of listener was a better option in my opinion, just so we can always be sure never to miss any event, even if the API server is offline.
