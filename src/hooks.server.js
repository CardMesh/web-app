import { redirect } from '@sveltejs/kit';

export async function handle({
  event,
  resolve,
}) {
  const user = event.cookies.get('user');

  const theme = JSON.parse(user).data.theme || 'dark';

  if (event.url.pathname.startsWith('/admin') && !user) {
    throw redirect(302, '/login');
  }

  return await resolve(event, {
    transformPageChunk: ({ html }) => html.replace('data-bs-theme="auto"', `data-bs-theme="${theme}"`),
  });
}
