<template>
  <div class="contactMy">
    <div class="message">
      <div class="main">
        <ul id="mainss">
          <li class="left" style="margin-top: 1vw">
            <img src="@/assets/robot.jpeg" alt />
            <span>你好呀(小哥哥/小姐姐)！跟我聊天吧！</span>
          </li>
          <li
            v-for="(item, index) in MessageList"
            :key="index"
            :class="item.hosD"
          >
            <img src="@/assets/robot.jpeg" v-if="item.hosD == 'left'" />
            <img src="@/assets/avatar_default.png" v-else />
            <span>{{ item.content }}</span>
          </li>
        </ul>
      </div>
      <div class="footer">
        <img src="@/assets/avatar_default.png" alt />
        <input type="text" placeholder="说点什么吧…" v-model="sendmsg" />
        <button @click="clickSendMessage">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "contactMy",

  data() {
    return {
      MessageList: [],
      sendmsg: "",
      boardfunc: null,
    };
  },
  mounted() {
    this.boardfunc = (e) => {
      if (e.code == "Enter") {
        this.clickSendMessage();
      }
    };
    window.addEventListener("keyup", this.boardfunc);
  },
  beforeDestroy() {
    window.removeEventListener("keyup", this.boardfunc);
  },
  methods: {
    async getMessage(msg) {
      const { data: res } = await axios.get(
        `https://api.ownthink.com/bot?spoken=${msg}`
      );
      if (res.message == "success") {
        let obj = {
          hosD: "left",
          content: res.data.info.text,
        };
        this.MessageList.push(obj);
      }
    },
    clickSendMessage() {
      if (this.sendmsg != "") {
        let obj = {
          hosD: "right",
          content: this.sendmsg,
        };

        this.MessageList.push(obj);
        this.getMessage(this.sendmsg);
        this.sendmsg = "";
      } else {
        this.$toast.fail("请输入内容！");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.contactMy {
  img {
    width: 12vw;
    border-radius: 50%;
    height: 12vw;
  }

  .message {
    padding: 0 0 56px;
    width: 100%;
    .main {
      ul {
        width: 100%;
        height: 100%;
        list-style: none;
        overflow: auto;
        display: flex;
        flex-direction: column;
        li {
          padding: 2vw 1.5vw;
          display: flex;
          span {
            padding: 0 2vw;
            max-width: 68.5vw;
            font-size: 4vw;
            color: #fff;
            display: flex;
            align-items: center;
          }
        }
        .left {
          span {
            margin-left: 2vw;
            background-color: rgba(233, 19, 101, 0.888);
            border-bottom-left-radius: 1vw;
            border-bottom-right-radius: 1vw;
            border-top-right-radius: 1vw;
          }
        }
        .right {
          flex-direction: row-reverse;
          span {
            margin-right: 2vw;
            background-color: rgba(57, 122, 251, 0.879);
            border-bottom-left-radius: 1vw;
            border-bottom-right-radius: 1vw;
            border-top-left-radius: 1vw;
          }
        }
      }
    }
    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 15vw;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      input {
        padding-left: 2vw;
        width: 60vw;
        height: 10vw;
        border: 0;
        font-size: 5vw;
        border-radius: 1vw;
        background-color: rgba(236, 236, 236, 0.826);
        outline: none;
        &::placeholder {
          color: rgb(141, 141, 141);
          font-size: 5vw;
        }
      }
      button {
        width: 12vw;
        border-radius: 0.5vw;
        height: 10vw;
        border: 0;
        background-color: rgba(230, 78, 103, 0.826);
        font-size: 4vw;
        font-weight: 700;
        color: #fff;
        cursor: pointer;
        border-radius: 1.5vw;
      }
    }
  }
}
</style>