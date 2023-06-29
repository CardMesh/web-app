import { redirect } from '@sveltejs/kit';

export async function handle({
  event,
  resolve,
}) {
  const user = event.cookies.get('user') ?? '{}';
  const access = event.cookies.get('access') ?? '{}';

  const theme = JSON.parse(user)?.data?.theme || 'dark';

  if (user === '{}') {
    event.cookies.delete('access');
  }

  if (event.url.pathname.startsWith('/admin') && (!JSON.parse(access)?.data?.token || !JSON.parse(user)?.data)) {
    throw redirect(302, '/login');
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('data-bs-theme="auto"', `data-bs-theme="${theme}"`),
  });
}
