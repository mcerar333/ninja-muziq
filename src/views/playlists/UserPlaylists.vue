<template>
  <div class="user">
    <h2 class="user__title">My Playlists</h2>

    <div v-if="error" class="user__error error">
      Could not fetch the data...
    </div>

    <div v-else-if="playlists && !playlists.length" class="user__empty">
      <p>You haven't created any playlists yet...</p>
      <router-link :to="{ name: 'CreatePlaylist' }" class="btn btn--user"
        >Create Playlist</router-link
      >
    </div>

    <ul class="user__playlists" v-else>
      <ListView :playlists="playlists" />
    </ul>
  </div>
</template>

<script>
const ListView = defineAsyncComponent(() => import('@/components/ListView.vue'))

import getCollection from '@/composables/getCollection'
import getUser from '@/composables/getUser'

import { defineAsyncComponent } from 'vue'

export default {
  components: { ListView },

  setup() {
    const user = getUser()

    const { error, documents: playlists } = getCollection('playlists', [
      'userId',
      '==',
      user.value.uid,
    ])

    return { error, playlists }
  },
}
</script>

<style>
.user {
  align-self: start;

  width: 90%;
  margin: 6rem 0 5.5rem;
}
.user__title {
  font-size: 3rem;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 1rem;
}
.user__empty,
.user__error.error {
  margin-top: 2rem;
  font-size: 1.8rem;
}
.btn.btn--user {
  margin-top: 5rem;
  font-size: 1.6rem;
}
@media screen and (max-width: 46.9em) {
  .user {
    margin: 4rem 0;
  }
}
@media screen and (max-width: 31.25em) {
  .user {
    margin: 3rem 0;
    text-align: center;
  }
  .user__playlists {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
@media screen and (max-width: 28em) {
  .user {
    width: 100%;
    margin: 2rem 0;
  }
}
</style>
