<template>
  <form @submit.prevent="handleSubmit" class="auth">
    <h2 class="auth__login-title">Log in</h2>

    <input
      type="email"
      name="email"
      placeholder="Email"
      required
      v-model.lazy.trim="email"
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      required
      v-model.lazy.trim="password"
    />

    <div v-if="error" class="error">{{ error }}</div>

    <button v-if="pending" disabled class="btn btn--login btn--pending">
      <BaseSpinner />
    </button>
    <button v-else class="btn btn--login">Log in</button>
  </form>
</template>

<script>
const BaseSpinner = defineAsyncComponent(() =>
  import('@/components/BaseSpinner')
)

import useLogin from '@/composables/useLogin'

import { ref, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'

export default {
  components: { BaseSpinner },

  setup() {
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const { pending, error, login } = useLogin()

    const handleSubmit = async () => {
      await login(email.value, password.value)

      if (!error.value) router.replace({ name: 'UserPlaylists' })
    }

    return { email, password, pending, error, handleSubmit }
  },
}
</script>

<style>
.auth {
  width: 36rem;
  max-width: 100%;
  margin: 6rem 0;
}
.auth__login-title,
.auth__signup-title {
  text-align: center;
  font-size: 3.5rem;
  margin-bottom: 4rem;
}
.btn--login,
.btn--signup {
  margin-top: 2rem;
}
.btn.btn--pending {
  line-height: 1;
}
</style>
