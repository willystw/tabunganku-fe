process.on('SIGINT', function () { process.exit(); }); // Ctrl+C
process.on('SIGTERM', function () { process.exit(); }); // docker stop

export async function getUser() {
  const endpoint = `${process.env.HOST_URL}/users/${process.env.USER_ID}/get`;
  const userRes = await fetch(endpoint)
  const userData = await userRes.json()

  return userData.data
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	event.locals.user = await getUser();
	return resolve(event);
}