<script>
  import Cookies from 'js-cookie';
  import { goto } from '$app/navigation';
  import { PUBLIC_REST_API_URL } from '$env/static/public';
  import { displaySuccess, displayWarning } from '../../js/toast.js';

  let email = 'demo@demo.com';
  let password = 'Demodemo!';

  const login = async () => {
    const fetchUser = async () => {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password
        })
      };

      const response = await fetch(`${PUBLIC_REST_API_URL}/api/auth/login`, options);

      return response.json();
    };

    const user = await fetchUser();

    if (!user.errors) {
      Cookies.set('user', JSON.stringify(user), { expires: 365 });
      displaySuccess('Successfully login');
      await goto('/admin', {replaceState: false});
    } else {
      displayWarning('Wrong credentials');
    }
  };
</script>

<div class="d-flex align-items-center justify-content-center vh-100">
    <div class="container" style="max-width: 600px" tabindex="-1">
        <div>
            <div class="rounded-2 shadow">
                <div class="p-5 pb-4 border-bottom-0">
                    <h1 class="fw-bold mb-0 fs-2">Login</h1>
                </div>

                <div class="p-5 pt-0">
                    <form class="">
                        <div class="form-floating mb-3">
                            <input
                                    bind:value={email}
                                    class="form-control rounded-3"
                                    id="floatingInput"
                                    placeholder=""
                                    type="email"
                            />
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input
                                    bind:value={password}
                                    class="form-control rounded-3"
                                    id="floatingPassword"
                                    placeholder=""
                                    type="password"
                            />
                            <label for="floatingPassword">Password</label>
                        </div>
                        <button
                                class="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                                on:click={login}
                                type="submit"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
