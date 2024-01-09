import type { PageLoad } from './$types';

export const load: PageLoad = async ({parent, data}) => {
  const result = await fetch(`/api/categories/list`);
  if(result.status === 200) {
    const data = await result.json();
    return {
      categories: data.categories,
    };
  } else {
    throw new Error(`Error status ${result.status} with message: ${result.statusText}`);
  }
};