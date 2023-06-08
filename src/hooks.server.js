export async function handle({
  event,
  resolve,
}) {
  const user = event.cookies.get('user') ?? '{}';
  const access = event.cookies.get('access') ?? '{}';

  const theme = JSON.parse(user)?.data?.theme || 'dark';

  if (event.url.pathname.startsWith('/admin') && (!JSON.parse(access)?.data?.token || !JSON.parse(user)?.data)) {
    return new Response('Redirect', {
      status: 303,
      headers: { Location: '/login' },
    });
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('data-bs-theme="auto"', `data-bs-theme="${theme}"`),
  });
}
