import InsigniaApiV1 from '../src/api/v1/index.js';

export const api = new InsigniaApiV1(process.env.INSIGNIA_EDUCATION_API_BASE_URL);

// captcha_token is required by LoginRequest; relies on the local API's TURNSTILE_SECRET_KEY
// being set to Cloudflare's documented "always passes" testing secret
// (1x0000000000000000000000000000000AA), which accepts any token value.
export const loginCustomer = () => api.auth.login({
    email: process.env.TEST_EMAIL,
    password: process.env.TEST_PASSWORD,
    captcha_token: 'test',
});

export const loginAdmin = () => api.auth.login({
    email: process.env.TEST_EMAIL_ADMIN,
    password: process.env.TEST_PASSWORD_ADMIN,
    captcha_token: 'test',
});


export const logout = () => api.auth.logout();