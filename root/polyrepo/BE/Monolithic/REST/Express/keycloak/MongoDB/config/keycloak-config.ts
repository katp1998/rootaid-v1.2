import session from 'express-session';
import Keycloak from 'keycloak-connect';
import config from './index'

let _keycloak: any;
const memoryStore =  new session.MemoryStore();

const keycloakConfig :any = {
  realm: config.realm,
  serverUrl: config.authServerUrl,
  bearerOnly: true,
  clientId: config.clientId,
  realmPublicKey: config.realmPublicKey,  
};

export function initKeycloak() {
  _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
console.log(_keycloak)
  return _keycloak;
}

export function getStore() {
  return memoryStore
}

export function getKeycloak() {
  return _keycloak;
}




