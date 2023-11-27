import { redirect } from '@sveltejs/kit';
import 'dotenv-expand/config'

/** @type {import('./$types').PageServerLoad} */
export function load(event) {
  if (!event.locals.user) {
    throw redirect(302, "/login")
  }
	return {
		user: event.locals.user
	};
}