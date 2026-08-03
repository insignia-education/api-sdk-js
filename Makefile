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
	@open coverage/test-report.html

login:
	@$(NVM) nvm use $(NODE_VERSION) && npm login

precommit:
	@$(NVM) nvm use $(NODE_VERSION) && npm run lint && npm run test

publish:
# 	@make precommit
	@$(NVM) nvm use $(NODE_VERSION) && (npm whoami 2>/dev/null || npm login) && npm publish --access public

release:
	@make install
	@bash scripts/release.sh

update-sdk:
	@bash scripts/update-sdk.sh

