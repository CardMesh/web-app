export async function handle({ event, resolve }) {
  const user = event.cookies.get('user') ?? '{}';

  const theme = JSON.parse(user)?.data?.theme || 'dark';

  if (event.url.pathname.startsWith('/admin') && !JSON.parse(user)?.data?.token) {
    return new Response('Redirect', {
      status: 303,
      headers: { Location: '/login' },
    });
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('data-bs-theme="auto"', `data-bs-theme="${theme}"`),
  });
}
