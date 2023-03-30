export const environment = {
    production: false,
    keycloak: {
        issuer: 'http://localhost:8080/realms/boxinatorAppAuth',
        redirectUri: 'https://boxinator-web-app-vert.vercel.app/',
        clientId: 'boxinator_User',
        scope: 'openid profile email offline_access'
    }
};