<template>
  <div class="payment">
    <div v-if="sussdisplay">
      <van-empty
        description="订单创建完成，点击按钮查看订单"
        image="https://bpic.588ku.com/element_origin_min_pic/19/08/27/ee5dd5a03f58469c9fd4a23babc380a4.jpg"
      >
        <van-button round type="info" to="/layout/order" class="bottom-button"
          >跳转订单页</van-button
        >
      </van-empty>
    </div>
    <div v-else>
      <div class="address">
        <h3>收货地址</h3>

        <div class="address_contnet" @click="show = !show">
          <div class="left">
            <p>
              <span>{{ selectAddress.name }}</span>
              <span>{{ selectAddress.tel }}</span>
              <span v-if="selectAddress.id == addressDef.id">默认</span>
            </p>
            <p>
              <span>{{ handlerAddress(selectAddress.area) }}</span>
              <span>{{ selectAddress.detail }}</span>
            </p>
          </div>
          <div class="right"></div>
        </div>
        <van-popup
          v-model="show"
          position="bottom"
          :style="{ height: '80%' }"
          closeable
        >
          <div class="addressSelect">
            <div
              v-for="item in addressList"
              :key="item.id"
              @click="clickSelectAddress(item)"
            >
              <p>
                <span>{{ item.name }}</span>
                <span>{{ item.tel }}</span>
                <span v-if="item.id == addressDef.id">默认</span>
              </p>
              <p>
                <span>{{ handlerAddress(item.area) }}</span>
                <span>{{ item.detail }}</span>
              </p>
            </div>
          </div>
        </van-popup>
      </div>
      <div class="shops">
        <h3>商品信息</h3>
        <div>
          <div class="shopinfo" v-for="item in paymentShoplist" :key="item.id">
            <div class="left" v-if="item.image">
              <img
                v-lazy="'http://tpadmin.test/static/uploads/' + item.image"
              />
            </div>
            <div class="right">
              <p>{{ item.name }}</p>
              <p>
                <span>￥{{ item.price }}</span>
                <span>X {{ item.shopCount }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="desc">
        <h3>备注</h3>
        <van-field
          v-model="desc"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入备注"
          show-word-limit
        />
      </div>
      <div class="footerMoney">
        <div class="allMoeny">总金额:￥{{ totalMoney }}</div>
        <div class="buy">
          <van-button type="primary" size="small" round @click="clickBuy"
            >支付 ￥{{ totalMoney }}</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAddressapi, getAddress_defapi } from "@/api/addressApi.js";
import { CreateOrderapi } from "@/api/orderApi.js";
import { mapState } from "vuex";
export default {
  name: "payment",

  data() {
    return {
      addressList: [], //地址列表
      show: false,
      addressDef: {}, //默认地址
      selectAddress: {}, //选中的地址
      desc: "", //备注
      sussdisplay: false, //
    };
  },

  created() {
    this.getAddress();
    this.getAddress_def();
  },
  computed: {
    ...mapState("payment", ["paymentShoplist"]),
    totalMoney() {
      let total = 0;
      this.paymentShoplist.forEach((item) => {
        total += item.shopCount * parseInt(item.price);
      });
      return total;
    },
  },
  methods: {
    async getAddress() {
      const { data: res } = await getAddressapi();
      if (res.code === 1) {
        if (res.data.length <= 0) {
          this.$toast.fail("暂无收货地址，请添加");
          this.$router.push("/layout/address");
          return;
        }
        this.addressList = res.data;
      }
    },
    async getAddress_def() {
      const { data: res } = await getAddress_defapi();
      if (res.code === 1) {
        if (res.data == null) {
          this.$toast.fail("暂无收货地址，请添加");
          this.$router.push("/layout/address");
          return;
        }
        this.addressDef = res.data;
        this.selectAddress = this.addressDef;
      }
    },
    async CreateOrderapi(addressid, note, goods) {
      const { data: res } = await CreateOrderapi(addressid, note, goods);
      if (res.code === 1) {
        this.$toast.success(res.msg);
        this.sussdisplay = true;
      } else {
        this.$toast.fail(res.msg);
      }
    },
    clickBuy() {
      let arr = [];
      this.paymentShoplist.forEach((item) => {
        let obj = { id: item.id, count: item.shopCount, selected: true };
        arr.push(obj);
      });
      console.log(arr);

      this.CreateOrderapi(this.selectAddress.id, this.desc, arr);
    },
    clickSelectAddress(item) {
      this.selectAddress = item;
      this.show = false;
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
.payment {
  .bottom-button {
    width: 160px;
    height: 40px;
  }
  padding: 10px;
  > div {
    margin: 15px 0;
    border-radius: 10px;
  }
  .van-cell {
    box-shadow: 2px 3px 10px -4px #848484;
  }
  h3 {
    margin: 10px 0;
    color: #1989fa;
  }
  .address {
    .address_contnet {
      margin: 5px 0;
      display: flex;
      border-radius: 5px;
      box-shadow: 2px 3px 10px -4px #848484;
      > div {
        padding: 5px;
        width: 100%;
        display: flex;
        flex-direction: column;
        p {
          margin: 5px 0;
          font: 500 14px "华为楷书";
        }
      }
      .left {
        width: 80%;
        p {
          &:nth-child(1) {
            display: flex;
            flex-wrap: wrap;
            span {
              margin: 0 5px;
              &:nth-child(1) {
                font: 700 16px "华为楷书";
              }
              &:nth-child(3) {
                padding: 2px 5px;
                font: 700 12px "华为楷书";
                color: #fff;
                background-color: #ee0a24;
                border-radius: 5px;
              }
            }
          }
          &:nth-child(1) {
          }
        }
      }
      .right {
        width: 20%;
        justify-content: center;
        align-items: center;
        i {
          margin: 5px 0;
          font-size: 24px;
          &:nth-child(1) {
            color: #1989fa;
          }
          &:nth-child(2) {
            color: red;
          }
        }
      }
    }
  }
  .shops {
    > div {
      box-shadow: 2px 3px 10px -4px #848484;
      padding: 5px;
      .shopinfo {
        display: flex;

        border-bottom: 1px solid #f3f3f3;
        .left {
          display: flex;
          width: 20%;
          margin-right: 10px;
          img {
            width: 100%;
            object-fit: cover;
          }
        }
        .right {
          width: 100%;
          p {
            margin: 5px 0;
            font: 500 16px "华文楷书";
            &:nth-child(2) {
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
  .footerMoney {
    position: fixed;
    height: 50px;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: #ededed;

    display: flex;
    justify-content: space-around;
    align-items: center;
    font: 500 14px "华文楷书";
  }
  .addressSelect {
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    > div {
      box-shadow: 2px 3px 10px -4px #848484;
      padding: 10px;

      width: 92%;
      p {
        margin: 5px 0;
        display: flex;
        flex-wrap: wrap;
        &:nth-child(1) {
          span {
            margin: 0 5px;
            &:nth-child(1) {
              font: 700 16px "华为楷书";
            }
            &:nth-child(3) {
              padding: 2px 5px;
              font: 700 12px "华为楷书";
              color: #fff;
              background-color: #ee0a24;
              border-radius: 5px;
            }
          }
        }
      }
    }
  }
}
</style>