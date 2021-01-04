<template>
  <div v-if="getError || storageError || useError" class="playlist-error error">
    <p>{{ getError || storageError || useError }}</p>

    <router-link :to="{ name: 'Home' }" class="playlist-error__btn btn"
      >Return Home
    </router-link>
  </div>

  <div v-if="playlist" class="playlist-details">
    <div class="playlist-info">
      <div class="playlist-info__cover">
        <img
          :src="playlist.fileUrl"
          :alt="playlist.title + ' thumbnail image'"
          class="playlist-info__img"
        />
      </div>
      <h2 class="playlist-info__title">{{ playlist.title }}</h2>
      <p class="playlist-info__username">Created by {{ playlist.nickname }}</p>
      <p class="playlist-info__description">{{ playlist.description }}</p>

      <button
        v-if="isPlaylistOwner && !pending"
        @click="handleDelete"
        class="btn"
      >
        Delete Playlist
      </button>
      <button v-else-if="pending" disabled class="btn btn--pending">
        <BaseSpinner />
      </button>
    </div>

    <div v-if="playlist" class="playlist-tunes">
      <div v-if="!playlist.songs.length" class="playlist-tunes__reminder">
        There are no songs in this playlist yet...
      </div>

      <ul v-else class="playlist-tunes__list">
        <li v-for="song in playlist.songs" :key="song.id" class="playlist-song">
          <div class="playlist-song__details">
            <h3 class="playlist-song__title">{{ song.title }}</h3>
            <p class="playlist-song__artist">{{ song.artist }}</p>
          </div>

          <div class="playlist-song__controls">
            <a
              v-if="song.video"
              :href="song.video"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn--link"
            >
              <svg class="btn__svg">
                <use xlink:href="@/assets/sprite.svg#icon-link"></use>
              </svg>
            </a>

            <button v-if="pending" class="btn btn--pending">
              <BaseSpinner />
            </button>
            <button
              v-else-if="isPlaylistOwner"
              @click="handleDeleteSong(song.id)"
              class="btn"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>

      <AddSong v-if="isPlaylistOwner" :playlist="playlist" />
    </div>
  </div>
</template>

<script>
const AddSong = defineAsyncComponent(() => import('@/components/AddSong'))
const BaseSpinner = defineAsyncComponent(() =>
  import('@/components/BaseSpinner')
)

import getDocument from '@/composables/getDocument'
import useDocument from '@/composables/useDocument'
import useStorage from '@/composables/useStorage'
import getUser from '@/composables/getUser'

import { ref, computed, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'

export default {
  props: ['id'],

  components: { BaseSpinner, AddSong },

  setup(props) {
    const pending = ref(false)
    const router = useRouter()
    const user = getUser()

    const { storageError, deleteFile } = useStorage()
    const { getError, document: playlist } = getDocument('playlists', props.id)
    const { useError, deleteDoc, updateDoc } = useDocument(
      'playlists',
      props.id
    )

    const isPlaylistOwner = computed(
      () =>
        user.value && playlist.value && user.value.uid === playlist.value.userId
    )

    const handleDelete = async () => {
      pending.value = true

      await deleteFile(playlist.value.filePath)
      await deleteDoc()

      pending.value = false
      router.replace({ name: 'UserPlaylists' })
    }

    const handleDeleteSong = async (songId) => {
      pending.value = true

      const songs = playlist.value.songs.filter((song) => song.id !== songId)
      await updateDoc({ songs })

      pending.value = false
    }

    return {
      getError,
      useError,
      storageError,
      pending,
      playlist,
      isPlaylistOwner,
      handleDelete,
      handleDeleteSong,
    }
  },
}
</script>

<style>
.playlist-error {
  font-size: 1.8rem;
  text-align: center;
}
.playlist-error__btn {
  margin-top: 4rem;
  font-size: 1.6rem;
}
.playlist-details {
  margin: 5rem 0;

  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 8rem;
}
.playlist-info {
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
}
.playlist-info__cover {
  width: 30rem;
  height: 30rem;
  overflow: hidden;
  border-radius: 2rem;
}
.playlist-info__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.playlist-info__title {
  line-height: 1.1;
  margin-top: 2rem;
  font-size: 2.8rem;
  text-transform: capitalize;
}
.playlist-info p {
  padding: 0 2rem;
  margin-bottom: 2rem;
}
.playlist-info .playlist-info__username {
  color: #999;
  margin: 0.5rem 0 1.5rem;
}
.playlist-tunes__reminder {
  font-size: 1.8rem;
}
.playlist-song {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px dashed var(--color-secondary);
}
.playlist-song__title {
  line-height: 1.3;
}
.playlist-song__details {
  margin-right: 2.5rem;
}
.playlist-song__controls {
  display: flex;
}
.btn.btn--link {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 0.5rem;
}
.btn.btn--link:hover .btn__svg {
  fill: #f4f4f4;
}
.btn__svg {
  width: 2.4rem;
  height: 2.4rem;
  fill: var(--color-primary);

  transition: fill 0.2s;
}
@media screen and (max-width: 81em) {
  .playlist-details {
    gap: 4rem;
  }
}
@media screen and (max-width: 46.9em) {
  .playlist-details {
    gap: 5rem;
    width: 50rem;
    max-width: 100%;
    grid-template-columns: 1fr;
  }
}
</style>
