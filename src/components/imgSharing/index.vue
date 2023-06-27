<template>
  <div class="imgSharing">
    <van-tabs :line-height="4" :line-width="30">
      <van-tab v-for="item in imgClass" :title="item.title" :key="item.id">
        <imgSharingList :imgClassId="item.id"></imgSharingList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getImgSharingClassapi } from "@/api/imgSharingApi";
import imgSharingList from "@/components/imgSharing/imgSharing_list/index.vue";
export default {
  name: "imgSharing",
  components: {
    imgSharingList
  },
  data() {
    return {
      imgClass: []
    };
  },

  created() {
    this.getImgSharingClass();
  },

  methods: {
    async getImgSharingClass() {
      const { data: res } = await getImgSharingClassapi();
      if (res.status === 0) {
        this.imgClass = res.message;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.imgSharing {
  width: 100%;
  /deep/ .van-tab--active {
    color: #1989fa;
    transform: scale(1.2);
  }
}
</style>