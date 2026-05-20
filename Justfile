set shell := ["sh", "-cu"]

## Show the available commands with descriptions.
help:
	just --list

## Start the Windows compose stack.
start-windows:
	docker compose -f docker-compose.windows.yml up -d --build

## Start the Unix compose stack.
start-unix:
	docker compose -f docker-compose.unix.yml up -d --build

## Stop both compose stacks.
stop:
	docker compose -f docker-compose.unix.yml down
	docker compose -f docker-compose.windows.yml down

## Show running Docker containers.
status:
	docker ps
