<template>
  <div class="imgSharinglist">
    <div v-if="imgList.length>0">
      <div class="info" v-for="item in imgList" :key="item.id" @click="skipImgSharingDetails(item.id)">
        <img v-lazy="item.img_url" :alt="item.title" :title="item.title" />
        <div>
          <h2>{{item.title}}</h2>
          <p>{{item.zhaiyao}}</p>
        </div>
      </div>
    </div>

    <van-empty v-else description="暂无数据" />
  </div>
</template>

<script>
import { getImgSharingListapi } from "@/api/imgSharingApi";
export default {
  name: "imgSharinglist",
  props: {
    imgClassId: {
      type: String | Number,
      required: true
    }
  },
  data() {
    return {
      imgList: []
    };
  },

  created() {
    this.getImgSharingList(this.imgClassId);
  },

  methods: {
    async getImgSharingList(id) {
      const { data: res } = await getImgSharingListapi(id);
      if (res.status === 0) {
        this.imgList = res.message;
        console.log(this.imgList);
      }
    },
    /**
     * 点击跳转图片列表详情
     * @param {string|number} imgListid 图片列表id
     */
    skipImgSharingDetails(imgListid){
        // DOTO
        this.$router.push(`/layout/imgSharingDetails/${imgListid}`)
    }
  }
};
</script>

<style lang="less" scoped>
.imgSharinglist {
  padding: 0 10px;
  .info {
    position: relative;
    margin: 10px 0;
    width: 100%;
    height: 320px;
    overflow: hidden;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    div {
      width: 100%;
      padding: 5px;
      position: absolute;
      bottom: 0;
      left: 0;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.5);
      font-family: "华文楷书";
      p {
        text-indent: 2em;
      }
    }
  }
}
</style>