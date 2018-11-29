<template>
  <section class="container">
    <div class="menu">
      <div class="plus" @click.prevent="centerDialogVisible=true"></div>
      <div class="poem">
        <p>Let life be beautiful</p>
        <p>like summer flower</p>
        <p>and</p>
        <p>death like autumn leaves</p>
      </div>
    </div>
    <div class="content">
      <div class="filter-bar">
        <div class="perspective">
          <Perspective :sortTypeList="sortTypeList" :curSortType="curSortType"/>
        </div>
        <div class="searchbox">
          <input type="text" placeholder="你在找什么呢">
        </div>
      </div>
      <ul class="image-list">
        <li class="image-card" v-for="(image,index) in images" :key="index" v-if="images.length">
          <ImageCard
            :src="image.src"
            :name="image.name"
            :date="image.date"
            v-on:imageUpdated="getImages"
          />
        </li>
      </ul>
    </div>
    <el-dialog title="上传图片" :visible.sync="centerDialogVisible" width="30%">
      <el-upload class="upload-demo" :limit="5" drag multiple :http-request="upload">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
/**
 * TODO:
 * 后续采取瀑布流的形式加载
 * 上传图片ui待优化
 */

import { getImageName } from "~/utils";
import { Dialog, Upload } from "element-ui";
import Perspective from "~/components/Perspective.vue";
import ImageCard from "~/components/imageCard.vue";
import imageCompression from "browser-image-compression";

export default {
  components: {
    Dialog,
    Upload,
    Perspective,
    ImageCard
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
      centerDialogVisible: false,
      sortTypeList: ["calender", "grid", "list", "location", "tag"],
      curSortType: "grid"
    };
  },
  methods: {
    async getImages() {
      const res = await this.$axios.$get("/api/images");
      this.images = res.data.map(img => {
        return {
          src: img,
          name: getImageName(img)
        };
      });
    },
    upload(param) {
      const _this = this;
      // 文件对象
      var imageFile = param.file;
      var maxSizeMB = 0.3;
      var maxWidthOrHeight = 1280; // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight
      imageCompression(imageFile, maxSizeMB, maxWidthOrHeight) // maxSizeMB, maxWidthOrHeight are optional
        .then(function(compressedFile) {
          var form = new FormData();
          form.append("file", compressedFile);
          _this.$axios.post("/api/uploadPic", form).then(_this.getImages);
        })
        .catch(function(error) {
          console.log(error.message);
        });
    }
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>