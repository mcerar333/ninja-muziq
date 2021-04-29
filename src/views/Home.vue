<template>
  <div class="home">
    <h2 class="home__title">All Playlists</h2>

    <div v-if="getError" class="home__error error">
      Error retrieving documents...
    </div>

    <div v-else-if="!documents && pending" class="loader--initial">
      <BaseSpinner />
    </div>

    <div v-else-if="documents && !documents.length" class="home__empty">
      There are no playlists to display. Be the first to create a playlist...
    </div>

    <ul v-else @scroll="handleScroll" class="home__playlists">
      <ListView :playlists="documents" />
    </ul>

    <div
      v-if="documents && documents.length && pending"
      class="loader--refetch"
    >
      <BaseSpinner />
    </div>

    <div class="scrollPath"></div>
    <div ref="scrollbar" class="scrollbar"></div>
  </div>
</template>

<script>
const ListView = defineAsyncComponent(() =>
  import('../components/ListView.vue')
);
const BaseSpinner = defineAsyncComponent(() =>
  import('../components/BaseSpinner')
);

import getDocuments from '@/composables/getDocuments';

import { defineAsyncComponent, ref } from 'vue';

export default {
  components: { ListView, BaseSpinner },

  setup() {
    const scrollbar = ref(null);
    const fetching = ref(false);

    const {
      pending,
      getError,
      documents,
      initialFetch,
      fetchMore,
    } = getDocuments('playlists');

    initialFetch(5);

    const handleFetch = async () => {
      if (fetching.value === true) return;

      fetching.value = true;
      await fetchMore(3);
      fetching.value = false;
    };

    const handleScroll = e => {
      const top = e.target.scrollTop;
      const offset = e.target.offsetHeight;
      const height = e.target.scrollHeight;

      const fractionFromTop = (top + offset) / height;
      scrollbar.value.style.height = fractionFromTop * 91.2 + '%';

      if (top + offset > height - 1) handleFetch();
    };

    return {
      pending,
      getError,
      documents,
      handleScroll,
      scrollbar,
      BaseSpinner,
    };
  },
};
</script>

<style>
.home {
  align-self: start;
  position: relative;

  width: 93%;
  margin: 6rem 0 5.5rem;
}
.home__title {
  width: 97.5%;
  margin: 0 auto 1rem;

  font-size: 3rem;
  font-weight: 600;
  line-height: 1.5;
}
.home__empty,
.home__error.error {
  margin-top: 2rem;
  font-size: 1.8rem;
}
.home__playlists {
  padding: 0 1%;

  overflow: auto;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  -webkit-overflow-scrolling: touch;

  height: calc(89.5vh - 20rem);
  max-height: 73rem;
}
.home__playlists::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}
.loader--initial {
  line-height: 1;
  margin-top: 30%;
  text-align: center;
}
.loader--initial .spin {
  width: 5rem;
  height: 5rem;
}
.loader--refetch {
  position: absolute;
  bottom: 0;
  left: 50%;
  line-height: 1;
  text-align: center;
  transform: translateX(-50%);
}
.loader--refetch .spin {
  width: 3rem;
  height: 3rem;
}

.scrollPath {
  position: absolute;
  top: 5.3rem;
  right: -3rem;
  width: 1rem;
  height: 91.2%;
  border-radius: 1rem;
  background-color: #fff;
}
.scrollbar {
  position: absolute;
  top: 5.3rem;
  right: -3rem;
  width: 1rem;
  height: 85%;
  border-radius: 1rem;
  background: linear-gradient(
    to top,
    rgba(241, 39, 17, 0.2),
    rgba(245, 175, 25, 0.2)
  );

  animation: animate 30s linear infinite;
}
.progressbar::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;

  filter: blur(1rem);
  border-radius: 1rem;
  background: linear-gradient(
    to top,
    rgba(241, 39, 17, 0.2),
    rgba(245, 175, 25, 0.2)
  );
}
.progressbar::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;

  filter: blur(3rem);
  border-radius: 1rem;
  background: linear-gradient(
    to top,
    rgba(241, 39, 17, 0.2),
    rgba(245, 175, 25, 0.2)
  );
}

@keyframes animate {
  0%,
  100% {
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(360deg);
  }
}

@media screen and (max-width: 46.9em) {
  .home {
    margin: 4rem 0;
  }
  .scrollPath {
    right: -2.5rem;
  }
  .scrollbar {
    right: -2.5rem;
  }
}
@media screen and (max-width: 40.6em) {
  .home {
    width: 100%;
  }
  .scrollPath {
    right: -1.15rem;
  }
  .scrollbar {
    right: -1.15rem;
  }
}
@media screen and (max-width: 31.25em) {
  .home {
    margin: 3rem 0;
    text-align: center;
  }
  .home__playlists {
    display: flex;
    flex-direction: column;
    align-items: center;

    height: calc(83vh - 20rem);
  }
  .scrollPath {
    left: 100%;
  }
  .scrollbar {
    left: 100%;
    height: 20%;
  }
}
@media screen and (max-width: 28em) {
  .home {
    margin: 2rem 0;
  }
  .home__playlists {
    height: calc(81vh - 20rem);
  }
  .scrollPath {
    left: 102%;
    width: 0.5rem;
  }
  .scrollbar {
    left: 102%;
    height: 17%;
    width: 0.5rem;
  }
}
</style>
