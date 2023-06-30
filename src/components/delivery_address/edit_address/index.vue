<template>
  <div class="edit_address">
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
        <van-button round block type="info" native-type="submit">修改</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
import { saveAddress_infoapi, editAddressapi } from "@/api/addressApi";

export default {
  name: "edit_address",

  data() {
    return {
      showArea: false, //地区选择打开状态
      name: "",
      tel: "",
      area: "",
      detail: "",
      areaLists: areaList
    };
  },

  created() {
    this.editAddress(this.$route.params.addressId);
  },

  methods: {
    async saveAddress_info(name, tel, area, detail, id) {
      const { data: res } = await saveAddress_infoapi(
        name,
        tel,
        area,
        detail,
        id
      );
      if (res.code === 1) {
        this.$toast.success(res.msg);
        this.$router.replace("/layout/address");
      } else {
        this.$toast.fail(res.msg);
      }
    },
    async editAddress(id) {
      const { data: res } = await editAddressapi(id);
      if (res.code === 1) {
        this.name = res.data.name;
        this.tel = res.data.tel;
        this.area = res.data.area;
        this.detail = res.data.detail;
      }
    },
    onConfirm(values) {
      this.area = values
        .filter(item => !!item)
        .map(item => item.name)
        .join("/");
      this.showArea = false;
    },
    onSubmit() {
      this.saveAddress_info(
        this.name,
        this.tel,
        this.area,
        this.detail,
        this.$route.params.addressId
      );
    }
  }
};
</script>

<style lang="less" scoped>
.edit_address {
  margin-top: 10px;
}
</style>