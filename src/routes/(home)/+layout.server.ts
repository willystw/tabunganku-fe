import 'dotenv-expand/config'
import type { LayoutServerLoad } from './$types';

export async function load(event) {
  return {
    user: event.locals.user,
  }
}