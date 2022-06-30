NODE_CONTAINER=docker-compose exec -T node sh -c

# PROJECT
dockerize:
	docker-compose down
	docker network create --driver bridge test-net || true
	docker-compose up -d --build
	$(NODE_CONTAINER) "cd blockchain && npm install"
	$(NODE_CONTAINER) "cd client && npm install"

start-containers:
	docker-compose down
	docker network create --driver bridge test-net || true
	docker-compose up -d

# BLOCKCHAIN
run-network:
	$(NODE_CONTAINER) "cd blockchain && npx hardhat node"

deploy:
	$(NODE_CONTAINER) "cd blockchain && npx hardhat run scripts/deploy.js --network localhost"

test:
	clear && $(NODE_CONTAINER) "cd blockchain && npx hardhat test"

# VUE
run-client:
	$(NODE_CONTAINER) "cd client && npm run dev"

# API
run-api:
	$(NODE_CONTAINER) "cd api && npm run dev"