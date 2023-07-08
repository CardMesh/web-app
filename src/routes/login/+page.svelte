<script>
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import Logo from '$lib/logo/Logo.svelte';
  import EmailInput from '$lib/forms/EmailInput.svelte';
  import PasswordInput from '$lib/forms/PasswordInput.svelte';
  import Heading from '$lib/layout/Heading.svelte';
  import Button from '$lib/forms/Button.svelte';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { displaySuccess, displayWarning } from '../../js/toast.js';
  import SvelteSeo from 'svelte-seo';

  let email = '';
  let password = '';

  let isLoading = false;

  const save = () => {
    return async ({
      update,
      result
    }) => {
      isLoading = true;

      await update({ reset: false });

      if (result.data.success) {
        await goto('/admin');
        displaySuccess('Successfully logged in!');
        isLoading = false;
      } else {
        displayWarning('Wrong credentials. Please try again.');
        isLoading = false;
      }
    };
  };
</script>

<SvelteSeo
        description="Login"
        title="Login"
/>

<div class="d-flex align-items-center justify-content-center vh-100">
    <div class="container" style="max-width: 600px" tabindex="-1">
        <div>
            <div class="rounded-2 shadow">
                <div class="center-container pt-5">
                    <Logo size="50"></Logo>
                </div>

                <div class="pe-5 ps-5 pb-4 pt-4 border-bottom-0">
                    <Heading className="fw-bold" size="h2" tag="h1">Login</Heading>
                </div>

                <div class="p-5 pt-0">
                    <form action="?/login" method="POST" use:enhance={save}>

                        <div class="form-floating mb-3">
                            <EmailInput autofocus="true" bind:value={email} displayName="Email" name="email"
                                        required="true"/>
                        </div>
                        <div class="form-floating mb-3">
                            <PasswordInput bind:value={password} displayName="Password" name="password"
                                           required="true"/>
                        </div>

                        <Button isLoading="{isLoading}">
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<SvelteToast/>

<style>
    .center-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
