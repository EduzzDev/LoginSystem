
# ==================================
# LoginSystem - Docker Development
# ==================================

COMPOSE = docker compose

.PHONY: help build rebuild up up-d down stop restart logs logs-backend logs-frontend ps config

# Help
help:
	@echo "LoginSystem - Available commands"
	@echo "make build"
	@echo "make rebuild"
	@echo "make up"
	@echo "make up-d"
	@echo "make down"
	@echo "make stop"
	@echo "make restart"
	@echo "make logs"
	@echo "make logs-backend"
	@echo "make logs-frontend"
	@echo "make ps"
	@echo "make config"

# Build
build:
	$(COMPOSE) build

rebuild: build
	$(COMPOSE) up

# Lifecycle
up:
	$(COMPOSE) up

up-d:
	$(COMPOSE) up -d

down:
	$(COMPOSE) down

stop:
	$(COMPOSE) stop

restart:
	$(COMPOSE) restart

# Logs
logs:
	$(COMPOSE) logs -f

logs-backend:
	$(COMPOSE) logs -f backend

logs-frontend:
	$(COMPOSE) logs -f frontend

# Status
ps:
	$(COMPOSE) ps

config:
	$(COMPOSE) config
