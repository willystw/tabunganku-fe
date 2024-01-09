process.on('SIGINT', function () { process.exit(); }); // Ctrl+C
process.on('SIGTERM', function () { process.exit(); }); // docker stop

import type { Handle, HandleFetch, HandleServerError } from '@sveltejs/kit';

export async function getUser(event) {
  const endpoint = `${process.env.HOST_URL}/users/${process.env.USER_ID}/get`;
  const userRes = await event.fetch(endpoint);
  const userData = await userRes.json();

  return userData.data;
}

export async function handle({ event, resolve }) {
  if (!event.locals.user) {
	  event.locals.user = await getUser(event);
  }
	return resolve(event);
};

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
  if (request.url.startsWith(`${process.env.HOST_URL}`)) {
    request.headers.set('Content-Type', 'application/json');
  }
  return fetch(request);
};