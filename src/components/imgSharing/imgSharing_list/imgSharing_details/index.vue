<template>
  <div class="imgSharingDetails">
    <div v-if="JSON.stringify(imgDetails)!='{}' && imgDetailsList.length>0">
      <div class="info">
        <p>{{imgDetails.title}}</p>
        <p>
          <span>发表时间：{{imgDetails.add_time}}</span>
          <span>点击：{{imgDetails.click}}次</span>
        </p>
        <span v-html="imgDetails.content"></span>
      </div>
      <div class="img">
        <img
          v-for="(item,index) in imgDetailsList"
          :key="index"
          v-lazy="item.src"
          @click="clickPreviewImg(index)"
        />
      </div>
    </div>
    <van-empty v-else description="暂无数据" />
  </div>
</template>

<script>
import {
  getImgSharingDetailsapi,
  getImgSharingDetailsImgListapi
} from "@/api/imgSharingApi";
import { ImagePreview } from "vant";
export default {
  name: "imgSharingDetails",

  data() {
    return {
      imgDetails: {}, //图片列表详情
      imgDetailsList: [] //图片列表详情图片列表
    };
  },

  created() {
    this.getImgSharingDetails(this.$route.params.imgListId);
    this.getImgSharingDetailsImgList(this.$route.params.imgListId);
  },

  methods: {
    async getImgSharingDetails(id) {
      const { data: res } = await getImgSharingDetailsapi(id);
      if (res.status === 0) {
        this.imgDetails = res.message[0];
        console.log(this.imgDetails);
      }
    },
    async getImgSharingDetailsImgList(id) {
      const { data: res } = await getImgSharingDetailsImgListapi(id);
      if (res.status === 0) {
        this.imgDetailsList = res.message;
        console.log(this.imgDetailsList);
      }
    },
    /**
     * 点击预览图片
     * @param {string|number} index 图片索引
     */
    clickPreviewImg(index) {
      let img_arr = [];
      this.imgDetailsList.forEach(item => {
        img_arr.push(item.src);
      });
      ImagePreview({
        images: img_arr,
        startPosition: index,
        closeable: true
      });
    }
  }
};
</script>

<style lang="less" scoped>
.imgSharingDetails {
  padding: 0 5px;
  .info {
    padding: 0 5px;
    p {
      margin: 5px 0;
      width: 100%;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      line-clamp: 2;
      -webkit-line-clamp: 1; //显示几行
      &:nth-child(1) {
        font: 700 16px "华文楷书";
        color: #000;
      }
      &:nth-child(2) {
        font: 700 12px "华文楷书";
        display: flex;
        justify-content: space-between;
        color: rgb(161, 161, 161);
      }
    }
  }
  .img {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    img {
      width: 30%;
      object-fit: cover;
      border-radius: 5px;
      margin: 1.6%;
    }
  }
}
</style>