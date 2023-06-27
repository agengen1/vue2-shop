<template>
  <div class="news">
    <ul>
      <li v-for="item in newsList" :key="item.id" @click="skipNewsDetails(item.id)">
        <div>
          <img :src="item.img_url" :alt="item.title" />
        </div>
        <div>
          <p>{{item.title}}</p>
          <p>
            <span>发表时间：{{item.add_time}}</span>
            <span>点击：{{item.click}}次</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getNewsListapi } from "@/api/newsApi";

export default {
  name: "news",

  data() {
    return {
      newsList: [] //新闻列表数据
    };
  },

  created() {
    this.getNewsList();
  },

  methods: {
    async getNewsList() {
      const { data: res } = await getNewsListapi();
      if (res.status === 0) {
        this.newsList = res.message;
        console.log(this.newsList);
      }
    },
    /**
     * 点击跳转新闻详情
     * @param {string|number} newsId 新闻id
     */
    skipNewsDetails(newsId){
        // DOTO
        this.$router.push(`/layout/newsDetails/${newsId}`)
    }
  }
};
</script>

<style lang="less" scoped>
.news {
  ul {
    padding: 0 5px;
    li {
      padding: 10px 0;
      width: 100%;
      overflow: hidden;
      height: 50px;
      display: flex;
      border-bottom: 1px solid rgb(238, 238, 238);
      div {
        &:nth-child(1) {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 15%;
          img {
            width: 50px;
            height: 50px;
            object-fit: cover;
          }
        }
        &:nth-child(2) {
          padding-left: 5px;
          width: 80%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          p {
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            line-clamp: 2;
            -webkit-line-clamp: 1; //显示几行
            &:nth-child(1){
                font: 700 16px "华文楷书";
                color:#000;
            }
             &:nth-child(2){
                font: 700 12px "华文楷书";
                display: flex;
                justify-content: space-between;
                color:rgb(161, 161, 161);
            }
          }
        }
      }
    }
  }
}
</style>