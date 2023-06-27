<template>
  <div class="newsDetails">
    <h2>{{newsDetail.title}}</h2>
    <p class="o_info">
      <span>发表时间：{{newsDetail.add_time}}</span>
      <span>点击{{newsDetail.click}}次</span>
    </p>
    <div v-html="newsDetail.content"></div>
  </div>
</template>

<script>
import { getNewsDetailsapi } from "@/api/newsApi";

export default {
  name: "newsDetails",
  data() {
    return {
      newsDetail: {}
    };
  },

  created() {
    this.getNewsDetails(this.$route.params.newId);
  },

  methods: {
    async getNewsDetails(id) {
      const { data: res } = await getNewsDetailsapi(id);
      if (res.status === 0) {
        console.log(res.message);

        this.newsDetail = res.message[0];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.newsDetails {
  padding: 0 5px 5px 5px;
  h2 {
    margin: 10px 0;
    font: 700 18px "华文楷书";
  }
  .o_info {
    margin: 5px 0;
    padding: 0 15px 0 10px;
    display: flex;
    justify-content: space-between;
    color: #848484;
  }
}
</style>