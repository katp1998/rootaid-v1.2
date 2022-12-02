import session from 'koa-session';
import Keycloak from 'keycloak-connect';
import config from './index'
import {MemoryStore} from '../src/utils/memory-store'
// var MemoryStore = require('../src/utils/memory-store')
// let RedisStore = require("connect-redis")(session)
let _keycloak: any;
// const memoryStore =  new session.MemoryStore();
var store = new MemoryStore()

const keycloakConfig :any = {
  realm: config.realm,
  serverUrl: config.authServerUrl,
  bearerOnly: true,
  clientId: config.clientId,
  realmPublicKey: config.realmPublicKey,  
};

export function initKeycloak() {
  _keycloak = new Keycloak({ store: store}, keycloakConfig);
// console.log(_keycloak)
  return _keycloak;
}

export function getStore() {
  return store
}

export function getKeycloak() {
  return _keycloak;
}




