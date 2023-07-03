<template>
  <div class="videoDetails">
    <div class="info">
      <p>
        <img v-lazy="videoDetails.pic" />
      </p>
      <p>
        <span>{{videoDetails.name}}</span>
        <span>{{videoDetails.type_name}}</span>
      </p>
      <p>简介：{{videoDetails.content.trim()}}</p>
      <p>演员：{{videoDetails.actor}}</p>
    </div>
    <div>
      <label>
        所有视频链接
        <select v-model="selectVal">
          <option
            v-for="item in videoDetails.play_url"
            :value="item.url"
            :key="item.url"
          >{{item.url}}</option>
        </select>
      </label>
      <van-button type="info" size="mini" @click="copy(selectVal)">点击复制选中链接</van-button>
      <p>
        由于：m3u8格式视频暂时不支持，请使用站外播放视频
        <a
          href="http://tool.liumingye.cn/m3u8/"
        >http://tool.liumingye.cn/m3u8/</a>
      </p>
    </div>
  </div>
</template>
  
  <script>
import { getVideoDetailsapi } from "@/api/videoApi";

export default {
  name: "videoDetails",

  data() {
    return {
      videoDetails: {}, //详情
      selectVal: ""
    };
  },
  created() {
    this.getVideoDetails(this.$route.params.videoId);
  },
  methods: {
    async getVideoDetails(id) {
      this.$toast.loading({
        message: "加载中...",
        duration: 10000
      });
      const { data: res } = await getVideoDetailsapi(id);
      this.$toast.clear();
      console.log(res);
      if (res.success) {
        this.videoDetails = res.data;
      }
    },
    copy(text) {
      if (text == "") {
        return this.$toast.fail("请选择视频链接");
      }
      const el = document.createElement("input");
      el.style.opacity = 0;
      el.setAttribute("value", text);
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.$toast.success("复制成功");
    }
  }
};
</script>
  
<style lang="less" scoped>
.videoDetails {
  padding: 10px;
  p {
    margin: 5px 0;
  }
  .info {
    p {
      font: 500 14px "华文楷书";
      &:nth-child(1) {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 60%;
          height: 40vh;
          object-fit: cover;
        }
      }
      &:nth-child(2) {
        display: flex;
        justify-content: space-between;
        span {
          &:nth-child(1) {
            font: 700 16px "华文楷书";
          }
        }
      }
    }
  }
  select {
    width: 100%;
  }
}
</style>