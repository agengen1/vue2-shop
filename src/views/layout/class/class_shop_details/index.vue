<template>
  <div class="classShopDetails">
    <div
      class="classShopDetail"
      v-for="item in classShopDetailsList"
      :key="item.id"
      @click="clickSkipShopDetails(item.id)"
    >
      <div>
        <img v-lazy="item.image" />
      </div>
      <div>
        <p>{{ item.name }}</p>
        <p>￥{{ item.price }}</p>
        <p>
          <span>热卖中</span>
          <span>剩余{{ item.num }}件</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getShopListapi } from "@/api/classApi";
export default {
  name: "classShopDetails",

  data() {
    return {
      classShopDetailsList: [], //商品列表
    };
  },

  created() {
    this.getShopListapi(this.$route.params.classId);
  },

  methods: {
    async getShopListapi(id) {
      const { data: res } = await getShopListapi(id);
      if (res.code === 1) {
        this.classShopDetailsList = res.data;
      }
    },
    /**
     * 点击跳转商品详情页
     * @param {string|number} id 商品id
     */
    clickSkipShopDetails(id) {
      this.$router.push(`/layout/shopDetails/${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.classShopDetails {
  padding-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  background-color: #f1f1f1;
  .classShopDetail {
    padding: 5px;
    margin: 5px 1%;
    width: 45%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 5px;
    > div {
      &:nth-child(1) {
        width: 100%;
        height: 170px;
        img {
          width: 100%;
          object-fit: cover;
        }
      }
      &:nth-child(2) {
        p {
          margin: 5px 0;
          &:nth-child(1) {
            font: 700 16px "华为楷书";
          }
          &:nth-child(2) {
            font: 700 12px "华为楷书";
            color: orangered;
          }
          &:nth-child(3) {
            display: flex;
            justify-content: space-between;
            color: #848484;
          }
        }
      }
    }
  }
}
</style>