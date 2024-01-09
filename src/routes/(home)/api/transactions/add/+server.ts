import type { RequestHandler } from './$types';
import cookie from 'cookie';
import {TABUNGANKU_BE_URL, TABUNGANKU_USER_ID} from '$env/static/private';

export const POST: RequestHandler = async ({ url, request, fetch }) => {
  const form = await request.formData();

  const cookieValue = cookie.parse(request.headers.get('Cookie'));
  const kcCookie = cookieValue['kc-cookie'];

  const toSend = {
    amount: form.get('amount'),
    category_id: form.get('category_id'),
    transaction_date: form.get('transaction_date'),
    note: form.get('note') ? form.get('note'): null,
  };

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Authorization', `Bearer ${kcCookie}`);

  const res = await fetch(`${TABUNGANKU_BE_URL}/users/${TABUNGANKU_USER_ID}/transactions/add`, {
    method: 'POST',
    body: JSON.stringify(toSend),
    headers: requestHeaders,
  });
  
  if (res.status === 200) {
    const response = await res.json();

    const returnValue = {
      type: "success"
    }
    return new Response(JSON.stringify(returnValue));  
  } else {
    throw new Error(`Error status ${res.status} with message: ${res.statusText}`);
  }

};