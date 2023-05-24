export const oktaConfig = {
    clientId: '0oa9nvo82cvEHSl7S5d7',
    issuer: 'https://dev-35645221.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true
}