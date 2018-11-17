<template>
  <section class="container">
    <ul class="image-list">
      <li class="image-card" v-for="(image,index) in images" :key="index" v-if="images.length">
        <div class="image-wrapper">
          <img :src="host+image.src" :alt="image.name">
          </div>
      </li>
    </ul>
  </section>
</template>

<script>
import Logo from "~/components/Logo.vue";
import { mapgetter, mapState } from "vuex";
import { getImageName } from "~/utils";
const host = "http://localhost:3000/";

export default {
  components: {
    Logo
  },
  async asyncData({ app }) {
    const res = await app.$axios.$get("/api/images");
    return {
      images: res.data.map(img => {
        return {
          src: img,
          name:getImageName(img)
        };
      })
    };
  },
  data() {
    return {
      images: [],
      host
    };
  }
};
</script>

<style lang="less">
.image-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 4%;
  .image-card {
    list-style: none;
    width: 30%;
    margin-bottom: 4%;
    font-size: 0;
    .image-wrapper {
      border-radius: 6px;
      img {
        width: 100%;
        border-radius: 6px;
      }
    }
  }
}
</style>