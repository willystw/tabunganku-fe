import type { RequestHandler } from './$types';
import cookie from 'cookie';
import {TABUNGANKU_BE_URL, TABUNGANKU_USER_ID} from '$env/static/private';

export const POST: RequestHandler = async ({ url, request, fetch }) => {
  const req = await request.json();
  const date = req.date;

  const cookieValue = cookie.parse(request.headers.get('Cookie'));
  const kcCookie = cookieValue['kc-cookie'];
  
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Authorization', `Bearer ${kcCookie}`);

  const res = await fetch(`${TABUNGANKU_BE_URL}/users/${TABUNGANKU_USER_ID}/transactions/summary/${date}`, {
    method: 'GET',
    headers: requestHeaders,
  });
  
  if (res.status === 200) {
    const response = await res.json();
    const returnValue = {
      type: "success",
      data: response
    };
    return new Response(JSON.stringify(returnValue));  
  } else {
    throw new Error(`Error status ${res.status} with message: ${res.statusText}`);
  }

};