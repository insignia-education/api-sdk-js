install:
	@cp .github/hooks/* .git/hooks/
	@chmod +x .git/hooks/*
	@echo "Hooks installed."

login:
	@npm login

publish:
	@npm publish --access public

release:
	@bash scripts/release.sh

update-sdk:
	@bash scripts/update-sdk.sh

tests:
	@npm run test
