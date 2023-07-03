<template>
  <div class="leaveMessage">
    <div class="rele">
      <h3>留言栏</h3>
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <div class="btn">
        <van-button type="primary" size="mini" @click="publishMessage"
          >发表留言</van-button
        >
      </div>
    </div>
    <div class="contentList">
      <h3>全部留言</h3>
      <van-empty description="暂无留言" v-if="messageList.length <= 0" />
      <div v-else>
        <div v-for="item in messageList" :key="item.time">
          <p>
            <span>{{ item.user.name }}</span>
            <span>{{ item.message }}</span>
            <span>发表时间：{{ item.time }}</span>
          </p>
          <p>
            <van-button
              v-if="$store.state.user.userinfo.id == item.user.id"
              type="danger"
              size="mini"
              @click="popMessage(item.time)"
              >删除留言</van-button
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "leaveMessage",
  data() {
    return {
      message: "",
      messageList: JSON.parse(window.localStorage.getItem("MessageList")) || [], //留言列表
    };
  },
  methods: {
    publishMessage() {
      if (this.message != "") {
        let time = moment().format("YYYY年MM月DD日 HH:mm:ss");
        let obj = {
          time,
          message: this.message,
          user: {
            id: this.$store.state.user.userinfo.id,
            name: this.$store.state.user.userinfo.username,
          },
        };
        this.messageList = [obj, ...this.messageList];
        this.$toast.success("发表成功！");
        this.message = "";
        window.localStorage.setItem(
          "MessageList",
          JSON.stringify(this.messageList)
        );
      } else {
        this.$toast.fail("请输入留言");
      }
    },
    popMessage(time) {
      this.messageList = this.messageList.filter((item) => {
        return item.time != time;
      });
      this.$toast.success("删除成功！");
      window.localStorage.setItem(
        "MessageList",
        JSON.stringify(this.messageList)
      );
    },
  },
};
</script>

<style lang="less" scoped>
.leaveMessage {
  .van-cell {
    padding: 0;
    padding-left: 5px;
    border: 1px solid #e5e5e5;
  }
  padding: 10px;
  h3 {
    margin: 5px 0;
    font: 700 16px "华文楷书";
    color: #1989fa;
  }
  .btn {
    margin: 5px;
    display: flex;
    justify-content: flex-end;
  }
  .contentList {
    > div {
      > div {
        margin: 5px 0;
        display: flex;
        border-top: 1px solid #e5e5e5;
        p {
          display: flex;
          flex-direction: column;
          &:nth-child(1) {
            width: 80%;
            display: flex;
            flex-direction: column;
            > span {
              margin: 5px 0;
              &:nth-child(1) {
                font: 700 16px "华文楷书";
              }
              &:nth-child(2) {
                font: 500 14px "华文楷书";
              }
              &:nth-child(3) {
                font: 500 12px "华文楷书";
                color: #aaa7a7;
              }
            }
          }
          &:nth-child(2) {
            width: 20%;
            justify-content: center;
          }
        }
      }
    }
  }
}
</style>