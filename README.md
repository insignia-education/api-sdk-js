# @insignia-education/api-sdk-js

JavaScript SDK for the [Insignia Education](https://insigniaeducation.com) API.

## Installation

```bash
npm install @insignia-education/api-sdk-js
```

## Configuration

### Environment variable (recommended)

Set `INSIGNIA_EDUCATION_API_BASE_URL` in your environment and construct with no arguments:

```bash
export INSIGNIA_EDUCATION_API_BASE_URL=https://your-instance.com
```

```js
import Insignia from '@insignia-education/api-sdk-js/src/index.js';

const sdk = new Insignia(); // uses INSIGNIA_EDUCATION_API_BASE_URL or defaults to https://insigniaeducation.com
```

### Explicit base URL

```js
const sdk = new Insignia('https://your-instance.com');
```

### With authentication token

```js
const sdk = new Insignia(null, 'your-bearer-token');
// or
const sdk = new Insignia('https://your-instance.com', 'your-bearer-token');
```

**URL resolution priority:** explicit `baseUrl` → `INSIGNIA_EDUCATION_API_BASE_URL` → `https://insigniaeducation.com`

## Token management

```js
sdk.setToken('your-bearer-token');
sdk.getToken(); // 'your-bearer-token'
```

## Usage

All resources live under `sdk.api.v1`:

```js
const { v1 } = sdk.api;
```

---

## Authentication

```js
// Check if email belongs to an existing user or a new registration
await v1.auth.loginOrRegister('user@example.com');

// Register a new user
await v1.auth.register({ email: 'user@example.com', password: 'secret', name: 'John' });

// Login
const { token } = await v1.auth.login({ email: 'user@example.com', password: 'secret' });
sdk.setToken(token);

// Login with Google
await v1.auth.googleLogin({ id_token: 'google-id-token' });

// Refresh token
await v1.auth.refresh();

// Logout
await v1.auth.logout();

// Get authenticated user
await v1.auth.user();
```

---

## Resources

### Accounts

```js
await v1.accounts.get();        // list all
await v1.accounts.get(5);       // get by id
await v1.accounts.create(data);
await v1.accounts.edit(5, data);
await v1.accounts.delete(5);

// Nested: account moves
await v1.accounts.moves(5).get();
await v1.accounts.moves(5).get(10);
await v1.accounts.moves(5).create(data);
await v1.accounts.moves(5).edit(10, data);
await v1.accounts.moves(5).delete(10);
```

### Categories

```js
await v1.categories.get();
await v1.categories.get(1);
await v1.categories.create(data);
await v1.categories.edit(1, data);
await v1.categories.delete(1);
```

### Changelogs

```js
await v1.changelogs.get();
await v1.changelogs.get(1);
await v1.changelogs.approve(1);
await v1.changelogs.reject(1, { reason: 'Invalid data' });
```

### Configs

```js
await v1.configs.get();
await v1.configs.get(1);
await v1.configs.create(data);
await v1.configs.edit(1, data);
await v1.configs.delete(1);
```

### Contact Forms

```js
await v1.contactForms.get();
await v1.contactForms.get(1);
await v1.contactForms.create(data);
await v1.contactForms.answer(1, { message: 'Reply text' });
await v1.contactForms.delete(1);
```

### Conversational Topics

```js
await v1.conversationalTopics.get();
await v1.conversationalTopics.create(data);
await v1.conversationalTopics.edit(1, data);
await v1.conversationalTopics.delete(1);
```

### Countries

```js
await v1.countries.get();
await v1.countries.get(1);
```

### Coupons

```js
await v1.coupons.get();
await v1.coupons.get(1);
await v1.coupons.create(data);
await v1.coupons.edit(1, data);
await v1.coupons.delete(1);
```

### Courses

```js
await v1.courses.get();
await v1.courses.get(1);
await v1.courses.create(data);
await v1.courses.edit(1, data);
await v1.courses.delete(1);

// Dates
await v1.courses.dates(1).get();
await v1.courses.dates(1).create(data);
await v1.courses.dates(1).edit(2, data);
await v1.courses.dates(1).delete(2);

// Sessions
await v1.courses.sessions(1).get();
await v1.courses.sessions(1).create(data);

// Premiums
await v1.courses.premiums(1).get();
await v1.courses.premiums(1).create(data);

// Premium items
await v1.courses.premiums(1).items(2).get();
await v1.courses.premiums(1).items(2).create(data);

// Levels -> Lessons -> Materials (deep nesting)
await v1.courses.levels(1).get();
await v1.courses.levels(1).lessons(2).get();
await v1.courses.levels(1).lessons(2).materials(3).get();
await v1.courses.levels(1).lessons(2).materials(3).create(data);
```

### Currencies

```js
await v1.currencies.get();
await v1.currencies.get(1);
await v1.currencies.getValues();
```

### Files

```js
await v1.files.get();
await v1.files.get(1);
await v1.files.delete(1);
```

### Forums

```js
await v1.forums.get();
await v1.forums.create(data);
await v1.forums.edit(1, data);
await v1.forums.delete(1);
await v1.forums.approve(1);

// Responses
await v1.forums.responses(1).get();
await v1.forums.responses(1).create(data);
await v1.forums.responses(1).approve(2);
```

### Hashes

```js
await v1.hashes.get();
await v1.hashes.generate({ purpose: 'recover', user_id: 5 });
await v1.hashes.delete(1);
```

### Insignias

```js
await v1.insignias.get();
await v1.insignias.create(data);
await v1.insignias.edit(1, data);
await v1.insignias.delete(1);
```

### Languages

```js
await v1.languages.get();
await v1.languages.create(data);
await v1.languages.edit(1, data);
await v1.languages.delete(1);
```

### Mail Blacklist

```js
await v1.mailBlacklist.get();
await v1.mailBlacklist.create({ email: 'spam@example.com' });
await v1.mailBlacklist.delete(1);
```

### Organizations

```js
await v1.organizations.get();
await v1.organizations.create(data);
await v1.organizations.edit(1, data);
```

### Quizzes

```js
await v1.quizzes.get();
await v1.quizzes.create(data);
await v1.quizzes.edit(1, data);
await v1.quizzes.delete(1);

// Questions -> Answers
await v1.quizzes.questions(1).get();
await v1.quizzes.questions(1).create(data);
await v1.quizzes.questions(1).answers(2).get();
await v1.quizzes.questions(1).answers(2).create(data);
```

### Short Links

```js
await v1.shortLinks.get();
await v1.shortLinks.create({ url: 'https://long-url.com' });
await v1.shortLinks.edit(1, data);
await v1.shortLinks.delete(1);
```

### Surveys

```js
await v1.surveys.get();
await v1.surveys.create(data);

// Questions -> Answers
await v1.surveys.questions(1).get();
await v1.surveys.questions(1).answers(2).get();
```

### Tags

```js
await v1.tags.get();
await v1.tags.create(data);
await v1.tags.edit(1, data);
await v1.tags.delete(1);
```

### Taxes

```js
await v1.taxes.get();
await v1.taxes.create(data);
await v1.taxes.edit(1, data);
await v1.taxes.delete(1);
```

### Teacher

```js
await v1.teacher.absences().get();
await v1.teacher.absences().create(data);

await v1.teacher.configSets().get();
await v1.teacher.configSets().create(data);

await v1.teacher.configs().get();
await v1.teacher.configs().create(data);
```

### Translations

```js
await v1.translations.get();
await v1.translations.create(data);
await v1.translations.delete(1);
await v1.translations.editText(1, { text: 'Translated text' });
```

### User Types

```js
await v1.userTypes.get();
await v1.userTypes.create(data);
await v1.userTypes.edit(1, data);
await v1.userTypes.delete(1);
```

### Users

```js
await v1.users.get();
await v1.users.get(1);
await v1.users.edit(1, data);

// Nested resources
await v1.users.courses(1).get();
await v1.users.courseNotes(1).get();
await v1.users.quizzes(1).get();
await v1.users.sessions(1).get();
await v1.users.surveys(1).get();
await v1.users.cart(1).get();

// Payments
await v1.users.payments(1).get();
await v1.users.payments(1).create(data);
await v1.users.payments(1).verify(2);
await v1.users.payments(1).reject(2, { reason: 'Fraud' });

// Points
await v1.users.points(1).get();
await v1.users.points(1).create(data);
await v1.users.points(1).delete(2);

// Money moves
await v1.users.moneyMoves(1).get();
await v1.users.moneyMoves(1).create(data);

// Statistics
await v1.users.statistics(1).get();

// Organizations
await v1.users.organizations(1).get();
await v1.users.organizations(1).create(data);
await v1.users.organizations(1).delete(2);

// Push endpoints
await v1.users.pushEndpoints(1).get();
await v1.users.pushEndpoints(1).create(data);
await v1.users.pushEndpoints(1).delete(2);
```

### Zoom

```js
await v1.zoom.meetings().get();
await v1.zoom.meetings().get(1);

await v1.zoom.tokens().get();
await v1.zoom.tokens().create(data);
await v1.zoom.tokens().edit(1, data);
await v1.zoom.tokens().delete(1);
```

---

## Error handling

All methods return promises. Wrap calls in try/catch:

```js
try {
    const user = await v1.auth.user();
    console.log(user);
} catch (err) {
    console.error('API error:', err);
}
```

---

## Running tests

```bash
npm test
```

## License

MIT
