import {z} from 'zod';
import {fail} from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(4),
  password: z.string().min(8),
});

export const load = async() => {
  const loginForm = await superValidate(loginSchema);
  const registerForm = await superValidate(registerSchema);

  return {loginForm, registerForm};
};

/** @type {import('./$types').Actions} */
export const actions = {
  login: async({cookies, request}) => {
    const loginForm = await superValidate(request, loginSchema);

    if(!loginForm.valid) {
      return message(loginForm, 'Failed to login');
    }

    return message(loginForm, 'Login form submitted');

    // cookies.set('session', 'a', {
    //   path: '/',
    //   httpOnly: true,
    //   sameSite: 'strict',
    //   secure: process.env.NODE_ENV === 'production',
    //   maxAge: 60 * 60 * 24 * 30, 
    // })
  },
  register: async({cookies, request}) => {
    const registerForm = await superValidate(request, registerSchema);

    if (!registerForm.valid) return fail(400, { registerForm });

    return message(registerForm, 'Register form submitted');
  }
};