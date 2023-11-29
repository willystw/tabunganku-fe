/** @type {import('./$types').PageServerLoad} */
export async function load(locals) {
  //
}

/** @type {import('./$types').Actions} */
export const actions = {
  login: async({cookies, request}) => {
    const data = await request.formData()
    const email = data.get('email')
    const password = data.get('pswd')

    if ( typeof email !== 'string' || 
      typeof password !== 'string' ||
      !email ||
      !password
    ) {
      return fail(400, { invalid: true })
    }

    console.log(email, password)
    // cookies.set('session', 'a', {
    //   path: '/',
    //   httpOnly: true,
    //   sameSite: 'strict',
    //   secure: process.env.NODE_ENV === 'production',
    //   maxAge: 60 * 60 * 24 * 30, 
    // })
  }
};