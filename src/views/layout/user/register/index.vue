<template>
  <div class="register">
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
      <van-field
        v-model="email"
        type="email"
        name="邮箱"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写邮箱' },{pattern:/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/, message: '请输入合法邮箱'}]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Registerapi } from "@/api/userApi.js";
import { mapMutations } from "vuex";
export default {
  name: "register",

  data() {
    return {
      username: "", //用户名
      password: "", //密码
      email: "" //邮箱
    };
  },

  methods: {
    async Register(username, password, email) {
      this.$toast.loading();
      const { data: res } = await Registerapi(username, password, email);
      if (res.code === 1) {
        let obj = res.data;
        this.SETTOKEN(res.data.session_id);
        delete obj.session_id;
        this.SETUSERINFO(obj);
        this.$toast.success(res.msg);
        this.$router.replace("/layout/user");
      } else {
        this.$toast.fail(res.msg);
      }
    },
    /**
     * 表单提交登录
     */
    onSubmit() {
      this.Register(this.username, this.password, this.email);
    },
    ...mapMutations("user", ["SETTOKEN", "SETUSERINFO"])
  }
};
</script>

<style lang="less" scoped>
.register {
  padding: 5px;
  .van-form {
    margin-top: 10px;
  }
}
</style>