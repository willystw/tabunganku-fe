import type { PageLoad } from './$types';


export const load: PageLoad = async ({parent, data}) => {
  let parentData = await parent();
  let {keycloak} = parentData;
};