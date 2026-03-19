login: 
	@npm login
	
publish:
	@npm publish --access public

release:
	@bash scripts/release.sh

tests:
	npm run test

