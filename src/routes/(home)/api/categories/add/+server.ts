import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import cookie from 'cookie';
import {TABUNGANKU_BE_URL} from '$env/static/private';

export const POST: RequestHandler = async ({ url, request, fetch }) => {
  const form = await request.formData();

  const cookieValue = cookie.parse(request.headers.get('Cookie'));
  const kcCookie = cookieValue['kc-cookie'];

  const toSend = {
    "category_name": form.get('name'),
    "transaction_type": form.get('transaction_type'),
  };

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Authorization', `Bearer ${kcCookie}`);

  const res = await fetch(`${TABUNGANKU_BE_URL}/categories/add`, {
    method: 'POST',
    body: JSON.stringify(toSend),
    headers: requestHeaders,
  });
  if (res.status === 200) {
    const response = await res.json();

    const returnValue = {
      type: "success",
    }
    return new Response(JSON.stringify(returnValue));  
  } else {
    throw new Error(`Error status ${res.status} with message: ${res.statusText}`);
  }

};