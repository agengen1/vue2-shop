<template>
  <div class="shopDetails">
    <div class="top">
      <img v-lazy="'http://tpadmin.test/static/uploads/'+shopDetails.image" />
    </div>
    <div class="Minfo">
      <h2>{{shopDetails.name}}</h2>
      <div>
        <p>
          <span>市场价：</span>
          <span>￥{{shopDetails.price}}</span>
        </p>
        <p>
          <span>购买数量：</span>
          <van-stepper v-model="shopCount" />
        </p>
        <p>
          <van-button type="info" round size="small">立即购买</van-button>
          <van-button type="primary" round size="small">加入购物车</van-button>
        </p>
      </div>
    </div>
    <div class="footer">
      <h2>商品参数</h2>
      <p>商品ID号: {{shopDetails.id}}</p>
      <p>库存情况: {{shopDetails.num}}件</p>
    </div>
  </div>
</template>

<script>
import { getShopDetailsapi } from "@/api/classApi";
export default {
  name: "shopDetails",

  data() {
    return {
      shopDetails: {}, //商品详情
      shopCount: 0 //购买数量
    };
  },

  created() {
    this.getShopDetails(this.$route.params.shopId);
  },

  methods: {
    async getShopDetails(id) {
      const { data: res } = await getShopDetailsapi(id);
      if (res.code === 1) {
        this.shopDetails = res.data;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.shopDetails {
  padding: 8px;
  background-color: #f1f1f1;
  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    background-color: #fff;
  }
  .Minfo {
    margin: 10px 0;
    background-color: #fff;
    padding: 5px 10px;
    h2 {
      height: 30px;
      font-weight: 700;
      border-bottom: 1px solid #e3e1e1;
    }
    > div {
      p {
        margin: 5px 0;
        &:nth-child(1) {
          span {
            &:nth-child(1) {
              color: #848484;
            }
            &:nth-child(2) {
              color: orangered;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
}
</style>