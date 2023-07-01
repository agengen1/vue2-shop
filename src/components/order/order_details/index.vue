<template>
  <div class="orderDetails">
    <div class="info_top">
      <p class="idHA">
        <span>订单编号：{{ orderDetails.id }}</span>
        <span class="isCan" v-if="orderDetails.is_cancel == 1">已取消</span>
        <span class="ispayment" v-else-if="orderDetails.is_pay == 0"
          >待支付</span
        >
        <span class="payment" v-else>已支付</span>
      </p>
      <div v-for="itemc in orderDetails.user_order_goods" :key="itemc.id">
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
      <div class="addressinfo">
        <p>
          备注：<span v-if="orderDetails.note != ''">{{
            orderDetails.note
          }}</span
          ><span>暂无备注</span>
        </p>
        <p>创建时间：{{ orderDetails.create_time }}</p>

        <p>收货姓名：{{ orderDetails.address_name }}</p>
        <p>收货电话：{{ orderDetails.address_tel }}</p>
        <p>
          收货地址：{{ handlerAddress(orderDetails.address_area)
          }}{{ orderDetails.address_detail }}
        </p>
      </div>
    </div>
    <div class="info_cancel">
      <p>
        共 <span>￥{{ orderDetails.price }}</span>
      </p>
      <p v-if="orderDetails.is_cancel === 0">
        <van-button
          type="danger"
          size="mini"
          @click="CancelOrder(orderDetails.id)"
          >取消订单</van-button
        >
      </p>
    </div>
  </div>
</template>
<script>
import { getOrderDetailsapi, CancelOrderapi } from "@/api/orderApi.js";

export default {
  name: "orderDetails",
  data() {
    return {
      orderDetails: {},
    };
  },
  created() {
    this.orderDetails = this.$route.params.data;
  },
  methods: {
    async CancelOrder(id) {
      const { data: res } = await CancelOrderapi(id);
      if (res.code === 1) {
        this.$toast.success(res.msg);
      } else {
        this.$toast.fail(res.msg);
      }
    },
    handlerAddress(values) {
      let str = "";
      if (values) {
        values.split("/").forEach((item) => {
          str += item;
        });
      }
      return str;
    },
  },
};
</script>
  
<style lang="less" scoped>
.orderDetails {
  padding: 10px;
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
    .addressinfo {
      display: block;
      color: #848484;
      p {
        margin: 5px 0;
        font: 500 14px "华文楷书";
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
</style>