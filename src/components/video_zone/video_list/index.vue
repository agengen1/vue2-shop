<template>
  <div class="videoList">
    <van-empty description="暂无视频数据" v-if="videoList.length<=0" />
    <div class="content" v-else>
      <div class="info" v-for="item in videoList" :key="item.id" @click="clickSkipVideoDetais(item.id)">
        <div class="top">
          <img v-lazy="item.pic" >
        </div>
        <div class="footer">
          <p>{{item.name}}</p>
          <p>{{item.remarks}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import {getVideoListapi } from "@/api/videoApi"
export default {
  name: "videoList",
  props: {
    videoType: {
      type: String | Number,
      required: true
    }
  },
  data() {
    return {
      videoList:[],//视频列表数据
    }
  },
  created(){
    this.getVideoList(this.videoType,1)
  },
  methods:{
    async getVideoList(type,page){
      this.$toast.loading({
        message:"加载中...",
        duration:10000
      })
      const {data:res} = await getVideoListapi(type,page)
      this.$toast.clear()
      if(res.success){
        this.videoList = res.data.list
      }
    },
    clickSkipVideoDetais(id){
      this.$router.push(`/layout/videoDetails/${id}`)
    }
  }
};
</script>
  
<style lang="less" scoped>
.videoList {
  .content{
    background-color: #f2f2f2;
    display: flex;
    flex-wrap: wrap;
    .info{
      padding: 1%;
      margin: 1%;
      width: 46%;
      border-radius:10px; 
    background-color: #fff;

      .top{
        width: 100%;
        img{
          width: 100%;
          object-fit: cover;
        }
      }
      .footer{
        display: flex;
        flex-direction: column;
        p{
          margin: 5px 0;
          &:nth-child(1){
            font: 700 16px "华文楷书";
            color: #1989fa;
          }
          &:nth-child(2){
            color: #848484;
          }
        }
      }
    }
  }
}
</style>