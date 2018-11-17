<template> 
  <section class="container">
    <div class="menu">
      <div class="plus"></div>
      <div class="poem">
        <p>Let life be beautiful</p>
        <p>like summer flower</p>
        <p>and</p>
        <p>death like autumn leaves</p>
      </div>
    </div>
    <ul class="image-list">
      <li class="image-card" v-for="(image,index) in images" :key="index" v-if="images.length">
          <div class="image-wrapper">
            <!-- TODO:后续采取瀑布流的形式加载 -->
            <!-- <img :src="host+image.src" :alt="image.name"> -->
            <div class="image" :style="{backgroundImage:`url(${host+image.src})`}"></div>
            <p class="image-name">{{image.name}}</p>
            <p class="image-date">{{image.date||'2019-09-01'}}</p>
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
          name: getImageName(img)
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
.container {
  position: relative;
  padding-left: 200px;
  box-sizing: border-box;
  width: 100%;
  .menu {
    position: fixed;
    width: 200px;
    left: 0;
    .plus {
      background: url("../assets/images/plus.png") no-repeat;
      background-position: center;
      height: 60px;
      background-size: 50px 50px;
      margin-top: 40px;
      cursor: pointer;
    }
    .poem {
      position: fixed;
      bottom: 40px;
      width: 200px;
      text-align: center;
      box-sizing: border-box;
      padding: 10px;
      font-size: 10px;
      font-family: "BukhariScript";
    }
  }
  .image-list {
    width: 100%;
    padding: 20px;
    padding-left: 19px;
    box-sizing: border-box;
    border-left: 1px solid #000;
    min-height: 100%;
    .image-card {
      display: inline-block;
      list-style: none;
      font-size: 0;
      .image-wrapper {
        border-radius: 6px;
        padding: 20px;
        .image {
          width: 300px;
          height: 200px;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          border-radius: 6px;
        }
        .image-date,
        .image-name {
          font-family: "BukhariScript";
          margin-top: 10px;
          font-size: 14px;
          text-align: center;
        }
      }
    }
  }
}
</style>