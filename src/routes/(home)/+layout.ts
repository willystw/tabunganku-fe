import { browser } from "$app/environment";
import type { LayoutLoad } from './$types';
import Keycloak, {KeycloakInitOptions} from 'keycloak-js';
import { PUBLIC_KEYCLOAK_URL, PUBLIC_KEYCLOAK_PORT, PUBLIC_KEYCLOAK_PROTOCOL } from '$env/static/public';

export const ssr = false;
export const csr = true;

export const load: LayoutLoad = async ({data}) => {
  let instance = {
    url: `${PUBLIC_KEYCLOAK_PROTOCOL}://${PUBLIC_KEYCLOAK_URL}:${PUBLIC_KEYCLOAK_PORT}/`,
    realm: 'Tabungan',
    clientId: 'tabungan-app'
  };

  let keycloak = new Keycloak(instance);
  let kcInitOpts: KeycloakInitOptions = { 
    onLoad: "login-required",
    checkLoginIframe: false,
  };
  
  let keycloakPromise;
  if (browser) {
    keycloakPromise = keycloak.init(kcInitOpts).then((auth) => {
      if (auth) {
        document.cookie= "kc-cookie=" + keycloak.token + "; path=/; SameSite=strict";
        return keycloak;
      }
    });
  }

  return {
    keycloak: keycloakPromise,
  };
};