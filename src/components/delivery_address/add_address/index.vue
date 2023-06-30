<template>
  <div class="add_address">
    <van-form @submit="onSubmit">
      <van-field
        v-model="name"
        name="名字"
        label="名字"
        placeholder="名字"
        :rules="[{ required: true, message: '请填写名字' }]"
      />
      <van-field
        v-model="tel"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />

      <van-field
        readonly
        clickable
        name="area"
        :value="area"
        label="地区选择"
        placeholder="点击选择省市区"
        @click="showArea = true"
        :rules="[{ required: true, message: '请选择地区' }]"
      />

      <van-field
        v-model="detail"
        name="详细地址"
        label="详细地址"
        placeholder="详细地址"
        :rules="[{ required: true, message: '请填写详细地址' }]"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area :area-list="areaLists" @confirm="onConfirm" @cancel="showArea = false" />
      </van-popup>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">新增</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
import { saveAddress_infoapi } from "@/api/addressApi";

export default {
  name: "add_address",

  data() {
    return {
      showArea: false, //地区选择打开状态
      name: "",
      tel: "",
      area: "",
      detail: "",
      areaLists:areaList
    };
  },

  mounted() {
      console.log(areaList);
      
  },

  methods: {
    async saveAddress_info(name, tel, area, detail) {
      const { data: res } = await saveAddress_infoapi(name, tel, area, detail);
      if(res.code===1){
          this.$toast.success(res.msg)
          this.$router.replace("/layout/address")
      }else{
          this.$toast.fail(res.msg)
      }
    },
    onConfirm(values){
        this.area = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/');
      this.showArea = false;
    },
    onSubmit(){
        this.saveAddress_info(this.name, this.tel, this.area,this.detail)
    }
  }
};
</script>

<style lang="less" scoped>
.add_address {
    margin-top: 10px;
}
</style>