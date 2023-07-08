<script>
  import { displaySuccess, displayWarning } from '../../js/toast.js';
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import EmailInput from '$lib/forms/EmailInput.svelte';
  import PasswordInput from '$lib/forms/PasswordInput.svelte';
  import Button from '$lib/forms/Button.svelte';
  import Heading from '$lib/layout/Heading.svelte';
  import SvelteSeo from 'svelte-seo';

  export let data;

  let email = data.email;
  let token = data.token;
  let password = '';

  const save = () => {
    return async ({
      update,
      result
    }) => {
      await update({ reset: false });

      if (result.data.success) {
        displaySuccess('Successfully saved!');
        await goto('/login', { replaceState: false });
      } else {
        displayWarning('Something went wrong. Please try again.');
      }
    };
  };
</script>

<SvelteSeo
        description="Rest Password"
        title="Reset Password"
/>

<div class="d-flex align-items-center justify-content-center vh-100">
    <div class="container" style="max-width: 600px" tabindex="-1">
        <div>
            <div class="rounded-2 shadow">
                <div class="p-5 pb-4 border-bottom-0">
                    <Heading size="h2" tag="h1">Set your new password</Heading>
                </div>

                <div class="p-5 pt-0">
                    <form action="?/save" method="POST" use:enhance={save}>
                        <EmailInput disabled="true" displayName="Email" name="disabledEmail" value={email}/>
                        <PasswordInput displayName="New Password" name="password" value={password}/>
                        <input hidden name="token" type="text" value={token}/>
                        <input hidden name="email" type="text" value={email}/>

                        <Button>Reset password</Button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<SvelteToast/>
