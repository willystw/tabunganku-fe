import type { PageLoad } from './$types';


export const load: PageLoad = async ({parent, data}) => {
  let parentData = await parent();
  let {keycloak} = parentData;

  const reqBody = {
    date: new Date().toJSON().slice(0,10)
  };
   
  const result = await fetch(`/api/transactions/summaries`, {
    method: 'POST',
    body: JSON.stringify(reqBody),
  });

  if(result.status === 200) {
    const data = await result.json();
    const response = {
      summaries: data.data
    };
    return response;
  } else {
    throw new Error(`Error status ${result.status} with message: ${result.statusText}`);
  }

};