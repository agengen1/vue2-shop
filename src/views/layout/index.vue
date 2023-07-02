<template>
  <div class="layout">
    <van-nav-bar
      fixed
      :title="$route.meta.title"
      :z-index="9999"
      @click-left="onClickLeft"
    >
      <template v-if="isDisplayback" #left>
        <van-icon name="arrow-left" :size="18" color="#fff" />返回
      </template>
    </van-nav-bar>
    <transition mode="out-in" name="yid">
      <router-view></router-view>
    </transition>

    <van-tabbar route v-if="isDisplayFooter">
      <van-tabbar-item to="/layout/home" icon="wap-home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item to="/layout/class" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item
        to="/layout/shopCart"
        icon="cart-o"
        :badge="shopCartCount"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item to="/layout/user" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "layout",

  data() {
    return {
      inclueback: ["home", "class", "shopCart", "user"],
      inclueFooter: [
        "home",
        "class",
        "shopCart",
        "user",
        "classShopDetails",
        "shopDetails",
      ],
    };
  },
  computed: {
    isDisplayback() {
      return !this.inclueback.includes(this.$route.name);
    },
    isDisplayFooter() {
      return this.inclueFooter.includes(this.$route.name);
    },
    shopCartCount() {
      if (this.shopList.length > 0) {
        return this.shopList.length;
      } else {
        return null;
      }
    },
    ...mapState("shopCart", ["shopList"]),
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.layout {
  padding: 46px 0 0;
  /*过度后效果以本身class样式决定,*/
  .yid-enter-active {
    transition: all 0.4s;
  }
  .yid-enter {
    opacity: 0;
    transform: translateX(-375px);
  }
  .yid-leave-active {
    transition: all 0.4s;
  }
  .yid-leave-to {
    opacity: 0;
    transform: translateX(-375px);
  }

  .van-nav-bar {
    background-color: #1989fa;
    color: #fff;
    /deep/.van-nav-bar__title {
      color: #fff;
    }
  }
}
</style>