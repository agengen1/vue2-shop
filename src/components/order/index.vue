<template>
  <div class="orderList">
    <van-empty description="暂无订单" v-if="orderList.length <= 0" />
    <div class="content" v-else>
      <div class="info" v-for="item in orderList" :key="item.id">
        <div class="info_top" @click="clickSkipOrderDetails(item)">
          <p class="idHA">
            <span>订单编号：{{ item.id }}</span>
            <span class="isCan" v-if="item.is_cancel == 1">已取消</span>
            <span class="ispayment" v-else-if="item.is_pay == 0">待支付</span>
            <span class="payment" v-else>已支付</span>
          </p>
          <div v-for="itemc in item.user_order_goods" :key="itemc.id">
            <div class="left">
              <img v-lazy="itemc.goods_goods.image" />
            </div>
            <div class="right">
              <p>{{ "商品" }}</p>
              <p>
                <span>￥ {{ itemc.price }}</span>
                <span> X {{ itemc.count }}</span>
              </p>
            </div>
          </div>
          <p class="time">{{ item.create_time }}</p>
        </div>
        <div class="info_cancel">
          <p>
            共 <span>￥{{ item.price }}</span>
          </p>
          <p v-if="item.is_cancel === 0">
            <van-button type="danger" size="mini" @click="CancelOrder(item.id)"
              >取消订单</van-button
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderListapi, CancelOrderapi } from "@/api/orderApi.js";
export default {
  name: "orderList",
  data() {
    return {
      orderList: [], //订单列表
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    async getOrderList() {
      const { data: res } = await getOrderListapi();
      if (res.code === 1) {
        this.orderList = res.data;
      }
    },
    async CancelOrder(id) {
      const { data: res } = await CancelOrderapi(id);
      if (res.code === 1) {
        this.$toast.success(res.msg);
        this.getOrderList();
      } else {
        this.$toast.fail(res.msg);
      }
    },
    clickSkipOrderDetails(item) {
      this.$router.push({ name: "orderDetails", params: { data: item } });
    },
  },
};
</script>

<style lang="less" scoped>
.orderList {
  padding: 10px;

  .content {
    display: flex;
    flex-direction: column;
    .info {
      margin: 10px 0;
      padding: 10px;
      box-shadow: 2px 3px 10px -4px #848484;
      border-radius: 10px;
      .info_top {
        .idHA {
          display: flex;
          justify-content: space-between;
          .isCan {
            padding: 2px 5px;
            border-radius: 8px;
            color: #848484;
            border: 1px solid #848484;
          }
          .ispayment {
            padding: 2px 5px;
            border-radius: 8px;
            color: #1989fa;
            border: 1px solid #1989fa;
          }
          .payment {
            padding: 2px 5px;
            border-radius: 8px;
            color: #6ac227;
            border: 1px solid #6ac227;
          }
        }
        .time {
          text-align: right;
          color: #bababa;
        }
        p {
          font: 700 14px "华文楷书";
        }
        > div {
          display: flex;
          .left {
            margin: 5px 5px 5px 0;
            width: 20%;
            img {
              width: 100%;
              object-fit: cover;
            }
          }
          .right {
            width: 80%;
            p {
              margin: 10px 0;
              &:nth-child(2) {
                display: flex;
                justify-content: space-between;
              }
            }
          }
        }
      }
      .info_cancel {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p {
          &:nth-child(1) {
            font: 700 16px "华文楷书";
            span {
              color: red;
            }
          }
        }
      }
    }
  }
}
</style>