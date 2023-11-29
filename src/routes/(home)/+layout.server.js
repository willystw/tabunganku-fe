import { redirect } from '@sveltejs/kit';
import 'dotenv-expand/config'


/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
  return {
    user: event.locals.user
  }
}