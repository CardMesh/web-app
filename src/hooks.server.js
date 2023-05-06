import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
  const auth = event.cookies.get('user');

  if (event.url.pathname.startsWith('/admin') && !auth) {
    throw redirect(302, '/login');
  }

  return resolve(event);
}
