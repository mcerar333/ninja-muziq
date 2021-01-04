<template>
  <header class="navbar">
    <nav class="navbar__nav">
      <img class="navbar__img" src="@/assets/ninja.png" alt="ninja logo" />
      <h1 class="navbar__title">
        <router-link :to="{ name: 'Home' }">Ninja Muziq</router-link>
      </h1>

      <div class="navbar__links">
        <div v-if="user" class="navbar__playlists">
          <router-link :to="{ name: 'Home' }" class="btn--nav-inline"
            >Home</router-link
          >
          <router-link :to="{ name: 'CreatePlaylist' }" class="btn--nav-inline"
            >Create Playlist</router-link
          >
          <router-link :to="{ name: 'UserPlaylists' }" class="btn--nav-inline"
            >My Playlists</router-link
          >
        </div>

        <div v-if="user" class="navbar__user">
          <div class="navbar__user-name">Hi there, {{ user.displayName }}</div>
          <button
            v-if="pending && user"
            disabled
            class="btn btn--nav btn--logout-pending"
          >
            <BaseSpinner />
          </button>

          <button
            v-else-if="!pending && user"
            @click="handleLogout"
            class="btn btn--nav"
          >
            Log Out
          </button>
        </div>

        <div v-else class="navbar__auth">
          <router-link :to="{ name: 'Login' }" class="btn btn--nav"
            >Log In</router-link
          >
          <router-link :to="{ name: 'Signup' }" class="btn btn--nav"
            >Sign Up</router-link
          >
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
const BaseSpinner = defineAsyncComponent(() =>
  import('../components/BaseSpinner')
)

import useLogout from '../composables/useLogout'
import getUser from '../composables/getUser'

import { defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'

export default {
  components: { BaseSpinner },

  setup() {
    const user = getUser()
    const router = useRouter()

    const { pending, error, logout } = useLogout()

    const handleLogout = async () => {
      await logout()

      if (!error.value) {
        router.replace({ name: 'Login' })
      }
    }

    return { pending, handleLogout, user }
  },
}
</script>

<style>
.navbar {
  background: #fff;
  padding: 1.6rem 2rem;
}
.navbar__nav {
  display: flex;
  align-items: center;

  margin: 0 auto;
  max-width: 120rem;
}
.navbar__img {
  width: 6rem;
  height: 6rem;
}
.navbar__title {
  margin-left: 2rem;
  font-size: 3.3rem;
}
.navbar__title a {
  outline: none;
}
.navbar__title a:hover,
.navbar__title a:focus {
  text-decoration: underline;
}
.navbar__links {
  margin-left: auto;

  display: flex;
  align-items: center;
}
.navbar__user-name {
  display: inline-block;
  font-size: 1.4rem;
  margin-left: 1.6rem;
  padding-left: 1.6rem;
  border-left: 2px solid #eee;
}
.navbar__auth {
  margin-top: 0.5rem;
}
.btn--nav {
  font-size: 1.4rem;
  margin-left: 1.6rem;
}
.btn--nav-inline {
  outline: none;
  font-size: 1.5rem;
  margin-left: 0.8rem;
  transition: filter 0.2s;
}
.btn--nav-inline:not(:last-of-type) {
  padding-right: 0.8rem;
  border-right: 2px solid #eee;
}
.btn--nav-inline:hover,
.btn--nav-inline:focus,
.btn--nav-inline:active {
  filter: drop-shadow(0 0 1rem var(--color-primary));
}
.btn.btn--logout-pending {
  line-height: 0;
}
.btn--nav.router-link-active {
  box-shadow: 0 0 3px var(--color-primary);
}
@media screen and (max-width: 46.9em) {
  .navbar {
    padding: 2.5rem 0;
  }
  .navbar__nav {
    flex-direction: column;
  }
  .navbar__img {
    width: 7rem;
    height: 7rem;
    margin-bottom: 1rem;
  }
  .navbar__title {
    font-size: 3.1rem;
  }
  .navbar__links {
    margin: 2rem 0 0;
  }
}
@media screen and (max-width: 28em) {
  .navbar__links {
    flex-direction: column;
  }
  .navbar__user {
    margin-top: 2rem;
  }
  .navbar__user-name {
    margin: 0;
    padding: 0;
    border: none;
  }
  .btn--nav-inline:first-of-type {
    margin-left: 0;
  }
}
</style>
