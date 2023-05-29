import { PUBLIC_REST_API_URL } from '$env/static/public';
import { displayWarning } from '../../js/toast.js';

export const actions = {
  login: async ({
    request,
    cookies,
  }) => {
    const formData = await request.formData();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
    };

    try {
      const response = await fetch(`${PUBLIC_REST_API_URL}/api/auth/login`, options);

      if (response.ok) {
        const user = await response.json();

        await cookies.set('access', JSON.stringify({
          data: {
            token: user.data.token,
          },
        }), {
          path: '/',
          maxAge: 3600 * 60 * 60 * 24, // 1 day
          secure: true,
          sameSite: 'strict',
          httpOnly: true,
        });

        delete user.data.token;
        await cookies.set('user', JSON.stringify(user), {
          path: '/',
          maxAge: 3600 * 60 * 60 * 24, // 1 day
          secure: true,
          sameSite: 'strict',
          httpOnly: false,
        });

        return { success: true };
      }

      displayWarning('Wrong credentials');
      return { success: false };
    } catch
    (error) {
      displayWarning('Error during login');
      return { success: false };
    }
  }
  ,
};
