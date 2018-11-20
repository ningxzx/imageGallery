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
    <ul class="image-list">
      <li class="image-card" v-for="(image,index) in images" :key="index" v-if="images.length">
          <div class="image-wrapper">
            <div class="image" :style="{backgroundImage:`url(${host+image.src})`}"></div>
            <p class="image-name">{{image.name}}</p>
            <p class="image-date">{{image.date||'2019-09-01'}}</p>
          </div>
      </li>
    </ul>
    <el-dialog
      title="上传图片"
      :visible.sync="centerDialogVisible"
      width="30%">
      <el-upload class="upload-demo"  action="/api/uploadPic"  :limit="5" drag multiple :http-request="upload">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
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

import { getImageName, compressImage } from "~/utils";
import { Dialog, Upload } from "element-ui";
import imageCompression from "browser-image-compression";

const host = "http://localhost:3000/";

export default {
  components: {
    Dialog,
    Upload
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
      host,
      centerDialogVisible: false
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
          _this.$axios.post("/api/uploadPic", form).then(_this.getImages)
        })
        .catch(function(error) {
          console.log(error.message);
        });
    }
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
    position: absolute;
    width: 200px;
    left: 0;
    .plus {
      position: fixed;
      background: url("../assets/images/plus.png") no-repeat;
      background-position: center;
      height: 60px;
      width: 200px;
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
      font-size: 14px;
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