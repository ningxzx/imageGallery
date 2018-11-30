<template>
  <div class="image-wrapper">
    <div class="image" :style="{backgroundImage:`url(/${encodeURIComponent(src)})`}"></div>
    <div
      class="image-name"
      @mouseover="focusName=true"
      @mouseleave="focusName=false"
      v-show="!editable"
    >
      <span @click="copyName(src)">{{imageName}}</span>
      <span class="edit-icon" title="修改图片名称" v-show="focusName" @click="editName"></span>
    </div>
    <div class="image-name-edit" v-show="editable">
      <el-input
        v-model="newName"
        placeholder="请输入新的名称"
        ref="editName"
        @blur="blurInput"
        @keyup.native="keyPress"
      >
        <el-button slot="append" icon="el-icon-upload2" @click="updateName"></el-button>
      </el-input>
    </div>
    <p class="image-date">
      <span>{{date||'2019-09-01'}}</span>
    </p>
  </div>
</template>
<script>
import copy from "clipboard-copy";
import { Input } from "element-ui";
import { replaceName } from "~/utils";

export default {
  name: "ImageCard",
  props: {
    src: "",
    name: "",
    date: ""
  },
  data() {
    return {
      focusName: false,
      editable: false,
      newName: "",
      imageName: this.name
    };
  },
  methods: {
    copyName(src) {
      const imagePath = `htts://images.forldn.cn/${src}`;
      copy(imagePath).then(() => {
        this.$message({
          message: "图片路径复制成功",
          type: "success"
        });
      });
    },
    editName() {
      this.editable = true;
      this.focusName = false;
      let focusTimeout = window.setTimeout(() => {
        this.$refs.editName.focus();
        window.clearTimeout(focusTimeout);
      }, 0);
    },
    blurInput(e) {
      // 点击提交名称的按钮
      if (
        e.relatedTarget &&
        e.relatedTarget.parentNode &&
        e.relatedTarget.parentNode.classList.contains("el-input-group__append")
      ) {
        return false;
      } else {
        this.editable = false;
      }
    },
    updateName() {
      const { src, newName } = this;
      const newSrc = replaceName(newName, src);
      this.$axios.post("/api/updateName", { src, newSrc }).then(res => {
        if (res.status == 200) {
          this.imageName = newName;
          this.newName = "";
          this.editable = false;
        //   this.$emit("imageUpdated");
        }
      });
    },
    keyPress(e) {
      if (e.key == "Enter") {
        this.updateName();
      } else if (e.key === "Escape") {
        this.editable = false;
      }
    }
  }
};
</script>
<style lang="less">
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
    position: relative;
    font-family: "BukhariScript";
    margin-top: 10px;
    font-size: 14px;
    text-align: center;
  }
  .image-name-edit {
    margin-top: 10px;
  }
  .image-name {
    line-height: 40px;
    height: 40px;
    span {
      cursor: pointer;
    }
    .edit-icon {
      position: absolute;
      top: 50%;
      margin-top: -8px;
      background: url("../assets/images/edit-name.png") no-repeat;
      background-size: cover;
      width: 16px;
      height: 16px;
      cursor: pointer;
      margin-left: 30px;
    }
  }
}
</style>
