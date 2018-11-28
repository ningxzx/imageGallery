<template>
    <div>
        <span v-for="(type,index) in sortTypeList" :key="index" :class="['icon',type,{'active':curType===type}]"  @click.stop="changeSortType(type)"></span>
    </div>
</template>
<script>
export default {
  name: "Perspective",
  props: {
    sortTypeList: {
      type: Array,
      default: () => []
    },
    curSortType:{
      type: String,
      default: ""
    },
  },
  data(){
    return {
      curType:this.curSortType
    }
  },
  methods:{
      changeSortType(type){
          this.curType = type
      }
  }
};
</script>
<style lang="less" scoped>
.icon {
  display: inline-block;
  width: 26px;
  height: 26px;
  margin-right: 20px;
  cursor: pointer;
}
.calender {
  background: url("../assets/images/calender-grey.png") 0 0 no-repeat;
  background-size: cover;
}
.calender.active {
  background: url("../assets/images/calender-black.png") 0 0 no-repeat;
  background-size: cover;
}
.grid {
  background: url("../assets/images/grid-grey.png") 0 0 no-repeat;
  background-size: cover;
}
.grid.active {
  background: url("../assets/images/grid-black.png") 0 0 no-repeat;
  background-size: cover;
}
.list {
  background: url("../assets/images/list-grey.png") 0 0 no-repeat;
  background-size: cover;
}
.list.active {
  background: url("../assets/images/list-black.png") 0 0 no-repeat;
  background-size: cover;
}
.location {
  background: url("../assets/images/location-grey.png") 0 0 no-repeat;
  background-size: cover;
}
.location.active {
  background: url("../assets/images/location-black.png") 0 0 no-repeat;
  background-size: cover;
}
.tag {
  background: url("../assets/images/tag-grey.png") 0 0 no-repeat;
  background-size: cover;
}
.tag.active {
  background: url("../assets/images/tag-black.png") 0 0 no-repeat;
  background-size: cover;
}
</style>
