<template>
  <div class="home">
    <van-swipe class="swipe" lazy-render :autoplay="3000" indicator-color="#1989fa">
      <van-swipe-item v-for="item in imglist" :key="item.id">
        <img :src="item.img" />
      </van-swipe-item>
    </van-swipe>
    <van-grid :column-num="3">
      <van-grid-item to="/layout/news">
          <div>
             <img src="@/assets/menu1.png" > 
             <span>新闻资讯</span>
          </div>      
      </van-grid-item>
      <van-grid-item to="/layout/imgSharing" >
          <div>
             <img src="@/assets/menu2.png" > 
             <span>图片分享</span>
          </div>      
      </van-grid-item>
      <van-grid-item to="/layout/class">
          <div>
             <img src="@/assets/menu3.png" > 
             <span>商品购买</span>
          </div>      
      </van-grid-item>
      <van-grid-item>
          <div>
             <img src="@/assets/menu4.png" > 
             <span>留言反馈</span>
          </div>      
      </van-grid-item>
      <van-grid-item>
          <div>
             <img src="@/assets/menu5.png" > 
             <span>视频专区</span>
          </div>      
      </van-grid-item>
      <van-grid-item>
          <div>
             <img src="@/assets/menu6.png" > 
             <span>联系我们</span>
          </div>      
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getSwipeapi } from "@/api/homeApi";
export default {
  name: "home",

  data() {
    return {
      imglist: [] ,//轮播图数据
    };
  },
  created() {
    this.getSwipe();
  },
  methods: {
    async getSwipe() {
      const { data: res } = await getSwipeapi();
      if (res.code === 1) {
        this.imglist = res.data;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  .swipe {
    img {
      width: 100%;
    }
  }
  /deep/.van-grid-item__content{
      div{
          display: flex;
          flex-direction: column;
          align-items: center;
          img{
              margin-bottom: 5px;
              width: 60%;
              object-fit: cover;
          }
          span{
              font: 500 14px "华文楷书";
          }
      }
  }
}
</style>