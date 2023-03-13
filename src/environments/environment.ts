export const environment = {
    production: false,
    keycloak: {
        issuer: 'http://localhost:8080/realms/boxinatorAppAuth',
        redirectUri: 'http://localhost:4200/',
        clientId: 'boxinator_User',
        scope: 'openid profile email offline_access'
    }
};