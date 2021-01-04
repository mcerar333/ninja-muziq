<template>
  <form @submit.prevent="handleSubmit" class="auth">
    <h2 class="auth__signup-title">Sign up</h2>

    <input
      type="text"
      name="name"
      placeholder="Display Name"
      required
      v-model="name"
    />
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

    <button v-if="pending" disabled class="btn btn--signup btn--pending">
      <BaseSpinner />
    </button>
    <button v-else class="btn btn--signup">Sign up</button>
  </form>
</template>

<script>
const BaseSpinner = defineAsyncComponent(() =>
  import('@/components/BaseSpinner')
)

import useSignup from '@/composables/useSignup'

import { ref, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'

export default {
  components: { BaseSpinner },

  setup() {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const { pending, error, signup } = useSignup()

    const handleSubmit = async () => {
      await signup(name.value, email.value, password.value)

      if (!error.value) router.replace({ name: 'UserPlaylists' })
    }

    return { name, email, password, pending, error, handleSubmit }
  },
}
</script>
