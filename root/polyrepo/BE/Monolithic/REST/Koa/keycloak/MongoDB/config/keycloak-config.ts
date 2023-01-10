import KeycloakConnect from '@pixelygroup/keycloak-koa-connect'
import bodyStore from '@pixelygroup/keycloak-koa-connect'
import queryStore from '@pixelygroup/keycloak-koa-connect'

let keycloak: any;

const keycloakConfig :any = {
    'realm': 'Demo', // realm
    'auth-server-url': 'http://127.0.0.1:8080/', // keycloak URL: http://127.0.0.1:8080/auth
    'ssl-required': 'external',
    'resource': 'keycloak_practice', // client ID
    'bearer-only': true,
    'credentials': {
      'secret': 'e1UxVzhtpjBXF0YX6rUOOM7mMVbC1HtD'
    },
    'use-resource-role-mappings': true,
    'confidential-port': 0,
    'realm-public-key': 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtNzgyfEfTFuNi41OCMcasxh8lgdL/Zji4n3caOMBY6igzx5RDzt5YQ0D6EAWcX5MInpAzfH/X/gdJdvkrrgnYn+ycaZJxjKFOmfifdOI4kdvvIna7jiQ1C9IAvrH2vrB5HbFZgFUB0kzzjk3zZCa8YV/ZBJBIsgiCG4mHpABKtjCQYg+4D6NlOzWZgiM+7XQ7uEch8/yvI7VQvCdVnF9ZCB+eQkiPQyabSMN+5MeSevlogqYLJ2b5xGR4QYihIBxjJSEemJ/Ds11aa/4KJ3vZDUaE2lGGQbU/FTeKIfCZQcLJcOVHllZGXUz6xi47+Cw3MXFLO5vg3NsIGvgkKXfEwIDAQAB'
  };

  export function initKeycloak() {
    keycloak = new KeycloakConnect({ store: [queryStore, bodyStore,] }, keycloakConfig);
    return keycloak;
  }
  
  export function getKeycloak() {
      return keycloak;
    }