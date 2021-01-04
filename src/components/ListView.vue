<template>
  <li v-for="playlist in playlists" :key="playlist.id" class="playlist">
    <router-link
      :to="{ name: 'PlaylistDetails', params: { id: playlist.id } }"
      class="playlist__link"
    >
      <div class="playlist__item">
        <div class="playlist__thumbnail">
          <img
            :src="playlist.fileUrl"
            :alt="playlist.title + ' thumbnail image'"
            class="playlist__thumbnail-img"
          />
        </div>
        <div class="playlist__info">
          <h3>{{ playlist.title }}</h3>
          <p>Created by {{ playlist.nickname }}</p>
        </div>
        <div class="playlist__song-number">
          <span>{{ playlist.songs.length }}</span> songs
        </div>
      </div>
    </router-link>
  </li>
</template>

<script>
export default {
  props: ['playlists'],
}
</script>

<style>
.playlist {
  background: #fff;
  border-radius: 1rem;
  margin-bottom: 1.6rem;
  box-shadow: 0 2px 3px rgba(50, 50, 50, 0.15);

  backface-visibility: hidden;
  transition: all 0.2s;
}
.playlist:hover {
  transform: scale(1.01) translateY(-0.5rem);
  box-shadow: 0 4px 8px rgba(50, 50, 50, 0.25);
}

.playlist__link {
  outline: none;
}
.playlist__link:focus > .playlist__item {
  box-shadow: 0 3px 6px rgba(50, 50, 50, 0.3);
}
.playlist__item {
  display: flex;
  align-items: center;

  padding: 2rem;
  border-radius: 1rem;
}
.playlist__thumbnail {
  width: 10rem;
  height: 10rem;
  overflow: hidden;
  border-radius: 1rem;
}
.playlist__thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.playlist__info {
  margin: 0 3rem;
}
.playlist__info h3 {
  font-weight: 700;
  font-size: 2.4rem;
}
.playlist__info p {
  color: #999;
  font-weight: 300;
}
.playlist__song-number {
  font-weight: 300;
  margin-left: auto;
}
.playlist__song-number span {
  font-size: 3.5rem;
}
@media screen and (max-width: 31.25em) {
  .playlist {
    width: 44rem;
    max-width: 100%;
    margin-bottom: 3rem;
  }
  .playlist:last-of-type {
    margin-bottom: 1rem;
  }
  .playlist__item {
    display: flex;
    flex-direction: column;

    box-shadow: 0 2px 3px rgba(50, 50, 50, 0.15);
  }
  .playlist__thumbnail {
    width: 100%;
    height: 30rem;
  }
  .playlist__info {
    margin: 2.5rem 0 6rem;
  }
  .playlist__info h3 {
    font-size: 2.8rem;
  }
  .playlist__info p {
    margin-top: 0.5rem;
    font-size: 1.7rem;
  }
  .playlist__song-number {
    margin-left: 0;
    font-weight: 600;
    font-size: 1.9rem;
  }
  .playlist__song-number span {
    font-size: 3.5rem;
  }
}
</style>
