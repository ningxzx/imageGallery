<template>
  <section class="container">
    <ul>
      <li v-for="image in images" :key="image.id">
          <img :src="image.src" :alt="image.alt">
      </li>
    </ul>
  </section>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  },
  async asyncData({ app }) {
    const data = await app.$axios.$get("/api/images");
    console.log(data);
  },
  data() {
    return {
      images: []
    };
  }
};
</script>

<style>
</style>
