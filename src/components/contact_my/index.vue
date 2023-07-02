<template>
  <div class="contactMy">
    {{ resStr }}
    http://api.qingyunke.com/api.php?key=free&appid=0&msg=百度查询 javascript
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "contactMy",

  data() {
    return {
      token:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVpZCI6IjY0NjQ4MTNjMTM0ZDQ3OTJjZGJkZjVjOSIsInZlcnNpb24iOjAsInZpcFZlcnNpb24iOjAsImJyYW5jaCI6InpoIn0sImlhdCI6MTY4ODI3OTA2NSwiZXhwIjoxNjg4NDUxODY1fQ.9S0TBJtxW-WZPcwvCL4FDF6qMHmVGHEZobEFtM-YAH4",
      resStr: "",
    };
  },

  mounted() {
    this.getDataAsStream(
      "https://wetabchat.haohuola.com/api/chat/conversation-v2",
      50,
      {
        conversationId: "64a18a73992792432ef85a9c",
        prompt: "看看世界伟大发明",
      },
      {
        Authorization: this.token,
        "I-App": "hitab",
        "I-Branch": "zh",
        "I-Lang": "zh-CN",
        "I-Platform": "edge",
        "I-Version": "1.0.53",
      }
    );
  },

  methods: {
    // showDataStream(response, delay) {
    //   let chunk = "";
    //   response.data.on("data", data => {
    //     chunk += data.toString(); // 将数据块转换为字符串
    //     const endOfLineIndex = chunk.indexOf("\n"); // 寻找换行符的位置（每行逐字显示）
    //     if (endOfLineIndex !== -1) {
    //       process.stdout.write(chunk.slice(0, endOfLineIndex + 1)); // 逐行显示数据
    //       chunk = chunk.slice(endOfLineIndex + 1);
    //       setTimeout(() => {
    //         this.showDataStream(response, delay); // 继续显示下一行数据
    //       }, delay);
    //     }
    //     console.log(chunk);
    //   });

    //   response.data.on("end", () => {
    //     if (chunk.length > 0) {
    //       process.stdout.write(chunk); // 显示剩余的数据
    //     }
    //   });
    // },

    // 获取数据流并逐字显示
    getDataAsStream(url, delay, data, header) {
      const response = axios({
        url,
        method: "POST",
        data: data,
        headers: header,
        responseType: "arrayBuffer",
        onDownloadProgress: (res) => {
          let msgobj = res.event.target.response
            .split("_e79218965e_")
            .forEach((item) => {
              console.log(item);
            });
          console.log(msgobj);

          // if (msgobj.data && msgobj.code == 0) {
          //   console.log(msgobj.data.content);
          //   this.resStr += msgobj.data.content;
          // }
        },
      })
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.contactMy {
}
</style>