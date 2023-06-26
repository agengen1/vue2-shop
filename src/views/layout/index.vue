<template>
  <div class="layout">
    <van-nav-bar fixed :title="$route.meta.title" @click-left="onClickLeft">
      <template v-if="isDisplayback" #left>
        <van-icon name="arrow-left" :size="18" color="#fff" />返回
      </template>
    </van-nav-bar>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/layout/home" icon="wap-home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item to="/layout/class" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/layout/shopCart" icon="cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item to="/layout/user" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "layout",

  data() {
    return {
      inclueback: ["home", "class", "shopCart", "user"],
    };
  },
  computed: {
    isDisplayback() {
      return !this.inclueback.includes(this.$route.name);
    },
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
  padding: 46px 0 50px;
  .van-nav-bar {
    background-color: #1989fa;
    color: #fff;
    /deep/.van-nav-bar__title {
      color: #fff;
    }
  }
}
</style>