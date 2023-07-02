<template>
  <div class="user">
    <div class="userinfo">
      <p>
        <img src="@/assets/avatar_default.png" />
      </p>
      <p v-if="JSON.stringify(userinfo) != '{}'">{{ userinfo.username }}</p>
      <p v-else>
        <span @click="clickSkipRouter('login')">登录</span> /
        <span @click="clickSkipRouter('register')">注册</span>
      </p>
    </div>
    <div class="other" v-if="JSON.stringify(userinfo) != '{}' && token != ''">
      <van-cell to="/layout/order">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <img src="@/assets/avatar_default.png" />
          <span class="other_title">我的订单</span>
        </template>
      </van-cell>
      <van-cell to="/layout/address">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <img src="@/assets/avatar_default.png" />
          <span class="other_title">收货地址</span>
        </template>
      </van-cell>
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <img src="@/assets/avatar_default.png" />
          <span class="other_title">我的帮助</span>
        </template>
      </van-cell>
    </div>
    <div class="logoutButton" v-if="token != ''">
      <van-button type="danger" round @click="Logout">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { Logoutapi } from "@/api/userApi";
export default {
  name: "user",

  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["userinfo", "token"]),
  },

  methods: {
    /**
     * 点击跳转路由
     * @param {'login'|'register'} location 跳转的路由
     */
    clickSkipRouter(location) {
      this.$router.push(`/layout/${location}`);
    },
    /**
     * 退出登录
     */
    async Logout() {
      const { data: res } = await Logoutapi();
      if (!res) {
        this.$toast.success("退出成功");
        this.ClEARTOKEN();
        this.ClEARUSERINFO();
        this.CLEARSHOPLIST();
      }
    },
    ...mapMutations("user", ["ClEARTOKEN", "ClEARUSERINFO"]),
    ...mapMutations("shopCart", ["CLEARSHOPLIST"]),
  },
};
</script>

<style lang="less" scoped>
.user {
  padding: 5px;
  padding-bottom: 50px;
  height: 83vh;
  background-color: #f1f1f1;
  .userinfo {
    height: 150px;
    background-color: #fff;
    display: flex;
    align-items: center;
    p {
      margin-left: 20px;
      &:nth-child(1) {
        width: 80px;
        height: 80px;
        img {
          width: 100%;
        }
      }
      &:nth-child(2) {
        margin-left: 15px;

        font: 700 16px "华文楷书";
        span {
          margin: 0 5px;
        }
      }
    }
  }
  .other {
    margin-top: 10px;
    .van-cell {
      img {
        margin-right: 10px;
        width: 30px;
        height: 30px;
        object-fit: cover;
      }
      .van-cell__title {
        display: flex;
        align-items: center;
      }
    }
  }
  .logoutButton {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    button {
      width: 80%;
      height: 40px;
    }
  }
}
</style>