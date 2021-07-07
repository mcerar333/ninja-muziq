<template>
  <div class="add-song">
    <button v-if="!formIsVisible" @click="toggleForm" class="btn">
      Add Songs
    </button>

    <form v-else @submit.prevent="handleSubmit" class="add-song__form">
      <h3>Add New Song</h3>

      <input
        type="text"
        name="title"
        placeholder="Song Title"
        required
        class="add-song__input"
        v-model.lazy.trim="title"
      />
      <input
        type="text"
        name="artist"
        placeholder="Artist"
        required
        class="add-song__input"
        v-model.lazy.trim="artist"
      />
      <input
        type="text"
        name="video"
        placeholder="Link to a Youtube Video (Optional)"
        class="add-song__input"
        v-model.lazy.trim="video"
      />

      <div v-if="formError || useError" class="error">
        {{ formError || useError }}
      </div>

      <button v-if="pending" disabled class="btn btn--pending">
        <BaseSpinner />
      </button>
      <button v-else class="btn">Add to Playlist</button>
    </form>
  </div>
</template>

<script>
const BaseSpinner = defineAsyncComponent(() =>
  import('@/components/BaseSpinner')
);

import useDocument from '@/composables/useDocument';

import { ref, defineAsyncComponent } from 'vue';

export default {
  props: ['playlist'],

  components: { BaseSpinner },

  setup(props) {
    const title = ref('');
    const artist = ref('');
    const video = ref('');
    const formError = ref(null);
    const formIsValid = ref(false);
    const formIsVisible = ref(false);

    const { useError, pending, updateDoc } = useDocument(
      'playlists',
      props.playlist.id
    );

    const toggleForm = () => (formIsVisible.value = true);

    const validateForm = newSong => {
      const pattern = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?[\w?‌=]*)?/;

      const result = pattern.test(newSong.video);

      if (newSong.title && newSong.artist && !newSong.video) {
        formIsValid.value = true;
        formError.value = null;
      } else if (newSong.title && newSong.artist && result) {
        formIsValid.value = true;
        formError.value = null;
      } else {
        video.value = '';
        formIsValid.value = false;
        formError.value = 'Please provide a valid Youtube link...';
      }
    };

    const handleSubmit = async () => {
      const now = new Date().toISOString();
      const randomNr = Math.floor(Math.random() * 1000000).toString();
      const uid = randomNr.concat(now);

      const newSong = {
        id: uid,
        title: title.value,
        artist: artist.value,
        video: video.value,
      };

      validateForm(newSong);

      if (formIsValid.value) {
        await updateDoc({ songs: [...props.playlist.songs, newSong] });

        title.value = '';
        artist.value = '';
        video.value = '';
      }
    };

    return {
      title,
      artist,
      video,
      toggleForm,
      formIsVisible,
      formError,
      handleSubmit,
      pending,
      useError,
    };
  },
};
</script>

<style>
.add-song {
  margin-top: 4rem;
}
.add-song__form {
  width: 100%;
  border: none;
  text-align: left;
  background-color: var(--color-background);
  box-shadow: 0 2px 3px rgba(50, 50, 50, 0.15);
}
.add-song__form h3 {
  line-height: 1.5;
  font-size: 2.5rem;
}
.add-song__input {
  background-color: var(--color-background);
}
.add-song__input:last-of-type {
  margin-bottom: 2.5rem;
}
</style>
