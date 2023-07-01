<template>
  <div class="deliveryAddress">
    <div class="address_list" v-if="addressList.length > 0">
      <div class="address_info" v-for="item in addressList" :key="item.id">
        <div class="left">
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
        <div class="right">
          <van-icon name="edit" @click="clickSkipEdit(item.id)" />
          <van-icon name="delete-o" @click="clickDel(item.id)" />
        </div>
      </div>
    </div>
    <p v-else>
      <van-empty description="暂无收货地址,请添加收货地址" />
    </p>
    <div class="btn">
      <van-button type="danger" to="/layout/add_address" icon="plus" round
        >新增收货地址</van-button
      >
    </div>
  </div>
</template>

<script>
import {
  getAddressapi,
  getAddress_defapi,
  deleteAddressapi,
} from "@/api/addressApi";
import { Dialog } from "vant";
export default {
  name: "deliveryAddress",

  data() {
    return {
      addressList: [], //地址列表
      addressDef: {}, //默认地址
    };
  },

  created() {
    this.getAddress_def();
    this.getAddress();
  },

  methods: {
    async getAddress() {
      const { data: res } = await getAddressapi();
      if (res.code === 1) {
        this.addressList = res.data;
      }
    },
    async getAddress_def() {
      const { data: res } = await getAddress_defapi();
      if (res.code === 1) {
        this.addressDef = res.data;
      }
    },
    async deleteAddress(id) {
      const { data: res } = await deleteAddressapi(id);
      if (res.code === 1) {
        this.$toast.success(res.msg);
      } else {
        this.$toast.fail(res.msg);
      }
    },
    handlerAddress(values) {
      let str = "";
      values.split("/").forEach((item) => {
        str += item;
      });
      return str;
    },
    clickDel(id) {
      Dialog.confirm({
        message: "是否删除这条收货地址",
      })
        .then(() => {
          this.deleteAddress(id);
          this.getAddress_def();
          this.getAddress();
        })
        .catch(() => {
          // on cancel
        });
    },
    clickSkipEdit(id) {
      this.$router.push(`/layout/edit_address/${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.deliveryAddress {
  padding: 5px;
  padding-bottom: 50px;
  position: relative;
  .address_info {
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
  .btn {
    position: fixed;
    width: 100%;
    bottom: 8%;
    left: 0;
    display: flex;
    justify-content: center;
    button {
      width: 80%;
    }
  }
}
</style>