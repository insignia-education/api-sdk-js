NVM_SH := $(HOME)/.nvm/nvm.sh
NVM := . $(NVM_SH) &&
NODE_VERSION := $(shell node -p "require('./package.json').engines.node.replace('>=', '')")

install:
	@$(NVM) nvm install $(NODE_VERSION)
	@cp .github/hooks/* .git/hooks/
	@chmod +x .git/hooks/*
	@echo "Hooks installed."
	@npm install

lint:
	@$(NVM) nvm use $(NODE_VERSION) && npm run lint

test:
	@$(NVM) nvm use $(NODE_VERSION) && npm run test

login:
	@$(NVM) nvm use $(NODE_VERSION) && npm login

precommit:
	@$(NVM) nvm use $(NODE_VERSION) && npm run lint && npm run test

publish:
	@make precommit
	@make login
	@npm publish --access public

release:
	@make install
	@bash scripts/release.sh
	@echo "in 60 seconds will update this package in all our package.json"
	@sleep 60
	@bash scripts/update-sdk.sh

update-sdk:
	@bash scripts/update-sdk.sh

