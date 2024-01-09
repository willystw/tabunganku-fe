import type { PageLoad } from './$types';
import { PUBLIC_TABUNGANKU_URL } from '$env/static/public';

export const load: PageLoad = async ({parent, data}) => {
  let parentData = await parent();
  let {keycloak} = parentData;
  return {
    keycloak: keycloak,
    home: PUBLIC_TABUNGANKU_URL,
  }
};