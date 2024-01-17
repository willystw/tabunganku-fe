import type { RequestHandler } from './$types';
import cookie from 'cookie';
import {TABUNGANKU_BE_URL} from '$env/static/private';

export const GET: RequestHandler = async ({ url, request, fetch }) => {
  const cookieValue = cookie.parse(request.headers.get('Cookie'));
  const kcCookie = cookieValue['kc-cookie'];

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Authorization', `Bearer ${kcCookie}`);

  const res = await fetch(`${TABUNGANKU_BE_URL}/categories/list`, {
    method: 'GET',
    headers: requestHeaders,
  });
  
  if (res.status === 200) {
    const response = await res.json();

    const returnValue = {
      type: "success",
      categories: response.category_list
    };
    return new Response(JSON.stringify(returnValue));  
  } else {
    throw new Error(`Error status ${res.status} with message: ${res.statusText}`);
  }

};