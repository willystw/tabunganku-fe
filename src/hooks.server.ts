process.on('SIGINT', function () { process.exit(); }); // Ctrl+C
process.on('SIGTERM', function () { process.exit(); }); // docker stop

import type { Handle, HandleFetch, HandleServerError } from '@sveltejs/kit';
import { TABUNGANKU_BE_URL } from '$env/static/private';

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
  if (request.url.startsWith(TABUNGANKU_BE_URL)) {
    request.headers.set('Content-Type', 'application/json');
  }
  return fetch(request);
};