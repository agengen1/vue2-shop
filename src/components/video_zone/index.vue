<template>
  <div class="videoZone">
    <van-tabs>
      <van-tab v-for="item in videoType" :title="item.name" :key="item.id">
        <videoList :videoType="item.id" />
      </van-tab>
    </van-tabs>
  </div>
</template>
  
<script>
import videoList from "@/components/video_zone/video_list/index.vue";
export default {
  name: "videoZone",
  components:{
    videoList
  },
  data() {
    return {
      videoType: [
        {
          id: 8,
          name: "科幻片"
        },
        {
          id: 12,
          name: "国产剧"
        },
        {
          id: 14,
          name: "韩国剧"
        },
        {
          id: 62,
          name: "大陆综艺"
        },
        {
          id: 64,
          name: "日韩综艺"
        },
        {
          id: 66,
          name: "国产动漫"
        },
        {
          id: 67,
          name: "日韩动漫"
        }
      ]
    };
  }
};
</script>
  
<style lang="less" scoped>
.videoZone {
}
</style>