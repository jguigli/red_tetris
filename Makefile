.PHONY: up down build rebuild logs clean help test client-logs server-logs test-all server-test client-test

all: help

build:
	docker-compose build

up:
	docker-compose up -d

rebuild:
	docker-compose up -d --build

down:
	docker-compose down

logs:
	docker-compose logs -f

client-logs:
	docker-compose logs -f client

server-logs:
	docker-compose logs -f server

clean:
	docker-compose down --rmi all --volumes

server-test:
	docker-compose run --rm server npm run test

client-test:
	docker-compose run --rm client npm run test:all

test-all: server-test client-test

server-up:
	docker-compose up -d server

client-up:
	docker-compose up -d client

help:
	@echo "RedTetris Docker Management"
	@echo "--------------------------"
	@echo "make build        - Build the Docker images"
	@echo "make up           - Start all containers in detached mode"
	@echo "make server-up    - Start only the server container"
	@echo "make client-up    - Start only the client container"
	@echo "make rebuild      - Rebuild and start all containers"
	@echo "make down         - Stop and remove containers"
	@echo "make logs         - Show logs of all containers"
	@echo "make server-logs  - Show logs of the server container"
	@echo "make client-logs  - Show logs of the client container"
	@echo "make clean        - Stop and remove containers, images, and volumes"
	@echo "make server-test  - Run tests for server in Docker container"
	@echo "make client-test  - Run tests for client in Docker container"
	@echo "make test-all     - Run all tests (both client and server)"
	@echo "make help         - Show this help message" 