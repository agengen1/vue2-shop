<template>
  <div class="ShopCarts">
    <van-empty description="购物车暂无商品" v-if="shopList.length <= 0">
      <van-button round type="danger" class="bottom-button" to="/layout/class"
        >去看看商品</van-button
      >
    </van-empty>
    <div v-else>
      <div class="contnet">
        <div class="info" v-for="item in shopList" :key="item.id">
          <div class="checked">
            <input
              type="checkbox"
              v-model="item.selected"
              @change="updateSelected($event, item.id)"
            />
          </div>
          <div class="right">
            <div class="left" v-if="item.image">
              <img
                v-lazy="'http://tpadmin.test/static/uploads/' + item.image"
              />
            </div>
            <div class="details">
              <p>{{ item.name }}</p>
              <p>
                <span>￥{{ item.price }}</span>
                <van-stepper
                  v-model="item.shopCount"
                  @change="updateShopCount($event, item.id)"
                />
              </p>
            </div>
          </div>
          <div class="delete">
            <van-icon name="delete-o" @click="deleteShop(item.id)" />
          </div>
        </div>
      </div>
      <div class="footerMoney">
        <div class="left">
          <input type="checkbox" v-model="allSelect" @click="clickAllSelect" />
          <span v-if="!allSelect">全选</span>
          <span v-else>取消全选</span>
        </div>
        <div class="allMoeny">总金额:￥{{ totalMoney }}</div>
        <div class="buy">
          <van-button type="primary" size="small" round @click="clickbuy"
            >结算({{ buyCount }})</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "ShopCarts",

  data() {
    return {
      allSelect: false,

      buyCount: 0,
      totalMoney: 0,
    };
  },
  computed: {
    ...mapState("shopCart", ["shopList"]),
  },
  created() {
    this.updateShopCount();
    this.buyUpdate();
  },
  methods: {
    updateSelected(e, id) {
      let obj = {
        flag: e.target.checked,
        id,
      };
      this.buyUpdate();
      this.setAllSelect();
      this.totalMoneyUpdate();
      this.SETSELECTED(obj);
    },
    updateShopCount(e, id) {
      let obj = {
        count: e,
        id,
      };
      this.buyUpdate();
      this.totalMoneyUpdate();
      this.SETCOUNT(obj);
    },
    deleteShop(id) {
      this.POPSHOPLIST(id);
      this.buyUpdate();
      this.totalMoneyUpdate();
    },
    buyUpdate() {
      let count = 0;
      this.shopList.forEach((item) => {
        if (item.selected == true) {
          count += item.shopCount;
        }
      });
      this.buyCount = count;
    },
    totalMoneyUpdate() {
      let total = 0;
      this.shopList.forEach((item) => {
        if (item.selected == true) {
          total += item.shopCount * parseInt(item.price);
        }
      });
      this.totalMoney = total;
    },
    clickbuy() {
      if (this.buyCount <= 0) {
        return this.$toast.fail("请选择商品");
      }
      this.PUSHPAYMENTSHOPLIST(this.shopList);
      this.$router.push("/layout/payment");
    },
    setAllSelect() {
      let arr = this.shopList.filter((item) => {
        return item.selected != this.allSelect;
      });
      if (arr.length > 0) {
        this.allSelect = arr[0].selected;
      } else {
      }
    },
    clickAllSelect(e) {
      this.SETALLSELECTED(e.target.checked);
      this.buyUpdate();
      this.totalMoneyUpdate();
    },
    ...mapMutations("shopCart", [
      "SETSELECTED",
      "SETCOUNT",
      "POPSHOPLIST",
      "SETALLSELECTED",
    ]),
    ...mapMutations("payment", ["PUSHPAYMENTSHOPLIST"]),
  },
};
</script>

<style lang="less" scoped>
.ShopCarts {
  padding: 10px 10px 60px 10px;
  .bottom-button {
    width: 160px;
    height: 40px;
  }
  .contnet {
    .info {
      margin: 10px 0;
      padding: 10px 0;
      display: flex;
      box-shadow: 1px 4px 14px -6px #848484;
      .checked {
        width: 15%;
        display: flex;
        align-items: center;
        justify-content: center;
        input {
          width: 20px;
          height: 20px;
        }
      }
      .right {
        display: flex;
        width: 70%;
        .left {
          margin-right: 10px;
          width: 20%;
          display: flex;
          align-items: center;
          img {
            width: 100%;
            object-fit: cover;
          }
        }
        .details {
          flex: 1;
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
      .delete {
        width: 15%;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          font-size: 20px;
          color: red;
        }
      }
    }
  }
  .footerMoney {
    position: fixed;
    height: 50px;
    width: 100%;
    left: 0;
    bottom: 50px;
    background-color: #ededed;

    display: flex;
    justify-content: space-around;
    align-items: center;
    font: 500 14px "华文楷书";

    .left {
      display: flex;

      align-items: center;
      input {
        margin-right: 5px;
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>