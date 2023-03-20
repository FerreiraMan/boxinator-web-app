import Keycloak, {
    KeycloakError, 
    KeycloakInitOptions,
    KeycloakPromise,
    KeycloakTokenParsed
  } from "keycloak-js";
  
  /**
   * An instance of keycloak using extened interface with config from the keycloak.json file.
   * @type { KeycloakInstance }
   */
  const keycloak: KeycloakInstance = new Keycloak('./assets/keycloak.json') as KeycloakInstance
  
  /**
   * Initialize Keycloak and silently checking for an existing login
   * @description Should be called before render() of app.
   * @returns { Promise<boolean, KeycloakError } Promise
   */
  export const initialize = (): KeycloakPromise<boolean, KeycloakError> => {
    const config: KeycloakInitOptions = {
      checkLoginIframe: false,
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
    }
    return keycloak.init(config)
  }
  
  export default keycloak as KeycloakInstance
  
  /**
   * Extended interfaces to imprve the intelli-sense for Typescritp
   */
  
  interface KeycloakInstance extends Keycloak {
    tokenParsed?: KeycloakTokenParsedExtended
  }
  
  interface KeycloakTokenParsedExtended extends KeycloakTokenParsed {
    // extend with additional props
    'allowed-origins': string[]
    email?: string
    email_verified?: boolean
    family_name?: string
    given_name?: string
    jti?: string
    name?: string
    preferred_username?: string
    roles?: string[]
    scope?: string
    sid?: string
    typ?: string
  }
  
  