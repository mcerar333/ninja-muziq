<template>
  <form @submit.prevent="handleSubmit" class="create-playlist">
    <h2 class="create-playlist__title">Create New Playlist</h2>

    <input
      type="text"
      name="title"
      placeholder="Playlist Title"
      class="create-playlist__input"
      required
      v-model.lazy.trim="title"
    />
    <textarea
      name="description"
      placeholder="Playlist Description..."
      class="create-playlist__input"
      required
      v-model.lazy.trim="description"
    ></textarea>

    <label for="upload" class="create-playlist__upload-label"
      >Select a cover image for your playlist...</label
    >
    <input
      type="file"
      name="upload"
      id="upload"
      class="create-playlist__upload-input"
      required
      @change="handleFileChange"
    />

    <div v-if="fileError || storageError || error" class="error">
      {{ fileError || storageError || error }}
    </div>

    <button
      v-if="pending"
      disabled
      class="btn create-playlist__btn create-playlist__btn--pending"
    >
      <BaseSpinner />
    </button>
    <button v-else class="btn create-playlist__btn">Create</button>
  </form>
</template>

<script>
const BaseSpinner = defineAsyncComponent(() =>
  import('@/components/BaseSpinner')
);

import useCollection from '@/composables/useCollection';
import useStorage from '@/composables/useStorage';
import getUser from '@/composables/getUser';

import { ref, defineAsyncComponent } from 'vue';
import { timestamp } from '@/firebase/config';
import { useRouter } from 'vue-router';

export default {
  components: { BaseSpinner },

  setup() {
    const title = ref('');
    const description = ref('');
    const coverImage = ref(null);
    const fileError = ref(null);
    const pending = ref(false);
    const router = useRouter();
    const user = getUser();

    const { error, addDoc } = useCollection('playlists');
    const { storageError, filePath, fileUrl, uploadFile } = useStorage();

    // Allowed File Types
    const fileTypes = ['image/png', 'image/jpeg'];

    const handleFileChange = e => {
      const selectedFile = e.target.files[0];

      if (
        selectedFile &&
        selectedFile.size <= 500000 &&
        fileTypes.includes(selectedFile.type)
      ) {
        coverImage.value = selectedFile;
        fileError.value = null;
      } else if (selectedFile && selectedFile.size > 500000) {
        coverImage.value = null;
        fileError.value =
          'File size limit exceeded. Please make sure the file size is 500KB or less.';
      } else {
        coverImage.value = null;
        fileError.value =
          'Unsupported file type. Please select a JPEG or PNG image file.';
      }
    };

    const handleSubmit = async () => {
      if (coverImage.value) {
        pending.value = true;

        await uploadFile(coverImage.value);

        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          nickname: user.value.displayName,
          fileUrl: fileUrl.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp(),
        });

        pending.value = false;

        if (!storageError.value && !error.value)
          router.push({ name: 'PlaylistDetails', params: { id: res.id } });
      }
    };

    return {
      title,
      description,
      fileError,
      handleFileChange,
      storageError,
      handleSubmit,
      pending,
      error,
    };
  },
};
</script>

<style>
.create-playlist {
  margin: 6rem 0;
}
.create-playlist__title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 4rem;
}
.create-playlist__upload-label {
  display: block;
  margin-top: 3rem;
  font-size: 1.4rem;
}
.create-playlist__upload-input {
  padding: 0;
  border: none;
  margin-top: 0.8rem;
  font-size: 1.4rem;
}
.create-playlist__upload-input:focus {
  text-decoration: underline;
}
.create-playlist__btn {
  margin-top: 2rem;
}
.btn.create-playlist__btn--pending {
  line-height: 1;
}
</style>
