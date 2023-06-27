<template>
  <div class="class">
    <div class="left">
      <van-sidebar v-model="classIndex">
        <van-sidebar-item
          v-for="item in ShopClassList"
          :key="item.id"
          :title="item.name"
          @click="clickRollLocation($event)"
        />
      </van-sidebar>
    </div>
    <div class="right">
      <div
        class="shopInfo"
        v-for="(item,index) in ShopClassList"
        :key="item.id"
        :data-index="index"
      >
        <h2>{{item.name}}</h2>
        <div>
          <p v-for="itemC in item.sub" :key="itemC.id">
            <img v-lazy="itemC.image" :alt="itemC.name" />
            <span>{{itemC.name}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getShopClassapi } from "@/api/classApi";
export default {
  name: "class",

  data() {
    return {
      ShopClassList: [], //分类数据
      classIndex: 0 //选中索引
    };
  },

  created() {
    this.getShopClass();
  },

  methods: {
    async getShopClass() {
      const { data: res } = await getShopClassapi();
      if (res.code === 1) {
        this.ShopClassList = res.data;
      }
    },
    /**
     * 点击导航栏页面滚动到页面位置=
     */
    clickRollLocation(index) {
      let el = document.querySelector(`div[data-index='${index}']`);
      let el_right = document.querySelector(".right");
      let height = el.offsetTop - 46;
      el_right.scrollTop = height

    }
  }
};
</script>

<style lang="less" scoped>
.class {
  display: flex;
  .left {
    position: fixed;
    width: 25%;
    height: 100vh;
  }
  .right {
    padding-left: 25%;
    width: 100%;
    height: 100vh;
    overflow: auto;
    .shopInfo {
      h2 {
        margin: 10px 0;
        font: 700 16px "华文楷书";
        color: #1989fa;
      }
      > div {
        display: flex;
        flex-wrap: wrap;
        p {
          width: 33.2%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          img {
            width: 70%;
            object-fit: cover;
          }
        }
      }
    }
  }
}
</style>