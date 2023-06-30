<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' },{pattern:/[A-Za-z\d]{6,}/, message: '密码长度最少为6位'}]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
      <div class="skip">
        <p>还没有有账号，<span @click="$router.push('/layout/register')">点击注册账号</span></p>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Loginapi } from "@/api/userApi.js";
import { mapMutations } from "vuex";
export default {
  name: "login",

  data() {
    return {
      username: "", //用户名
      password: "" //密码
    };
  },

  methods: {
    async login(username, password) {
      this.$toast.loading();
      const { data: res } = await Loginapi(username, password);
      if (res.code === 1) {
        let obj = res.data;
        this.SETTOKEN(res.data.session_id);
        delete obj.session_id;
        this.SETUSERINFO(obj);
        this.$toast.success(res.msg);
        this.$router.replace('/layout/user')
      } else {
        this.$toast.fail(res.msg);
      }
    },
    /**
     * 表单提交登录
     */
    onSubmit() {
      this.login(this.username, this.password);
    },
    ...mapMutations("user", ["SETTOKEN", "SETUSERINFO"])
  }
};
</script>

<style lang="less" scoped>
.login {
  padding: 5px;
  .van-form {
    margin-top: 10px;
  }
  .skip{
    display: flex;
    justify-content: center;
    font: 700 14px "华文楷书";
    color: #848484;
    span{
      color: #1989fa;
      text-decoration: underline;
    }
  }
}
</style>