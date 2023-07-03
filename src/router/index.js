import Vue from "vue";
import VueRouter from "vue-router";
import userStore from "@/store/user.js";
import { Toast } from "vant";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/layout",
  },
  {
    path: "/layout",
    name: "layout",
    meta: {
      title: "布局",
    },
    component: () => import("@/views/layout/index.vue"),
    redirect: "/layout/home",
    children: [
      {
        path: "home",
        name: "home",
        meta: {
          title: "首页",
        },
        component: () => import("@/views/layout/home/index.vue"),
      },
      {
        path: "class",
        name: "class",
        meta: {
          title: "分类",
        },
        component: () => import("@/views/layout/class/index.vue"),
      },
      {
        path: "shopCart",
        name: "shopCart",
        meta: {
          title: "购物车",
        },
        component: () => import("@/views/layout/ShopCart/index.vue"),
      },
      {
        path: "user",
        name: "user",
        meta: {
          title: "我的",
        },
        component: () => import("@/views/layout/user/index.vue"),
      },
      {
        path: "news",
        name: "news",
        meta: {
          title: "新闻资讯列表",
        },
        component: () => import("@/components/news/index.vue"),
      },
      {
        path: "newsDetails/:newId",
        name: "newsDetails",
        meta: {
          title: "新闻详情",
        },
        component: () => import("@/components/news/news_details/index.vue"),
      },
      {
        path: "imgSharing",
        name: "imgSharing",
        meta: {
          title: "图片分享列表",
        },
        component: () => import("@/components/imgSharing/index.vue"),
      },
      {
        path: "imgSharingDetails/:imgListId",
        name: "imgSharingDetails",
        meta: {
          title: "图片分享列表详情",
        },
        component: () =>
          import(
            "@/components/imgSharing/imgSharing_list/imgSharing_details/index.vue"
          ),
      },
      {
        path: "classShopDetails/:classId",
        name: "classShopDetails",
        meta: {
          title: "分类商品列表",
        },
        component: () =>
          import("@/views/layout/class/class_shop_details/index.vue"),
      },
      {
        path: "shopDetails/:shopId",
        name: "shopDetails",
        meta: {
          title: "商品详情",
        },
        component: () => import("@/components/shop_details/index.vue"),
      },
      {
        path: "login",
        name: "login",
        meta: {
          title: "登录",
        },
        component: () => import("@/views/layout/user/login/index.vue"),
      },
      {
        path: "register",
        name: "register",
        meta: {
          title: "注册",
        },
        component: () => import("@/views/layout/user/register/index.vue"),
      },
      {
        path: "address",
        name: "address",
        meta: {
          title: "收货地址管理",
        },
        component: () => import("@/components/delivery_address/index.vue"),
      },
      {
        path: "add_address",
        name: "add_address",
        meta: {
          title: "新增收货地址",
        },
        component: () =>
          import("@/components/delivery_address/add_address/index.vue"),
      },
      {
        path: "edit_address/:addressId",
        name: "edit_address",
        meta: {
          title: "修改收货地址",
        },
        component: () =>
          import("@/components/delivery_address/edit_address/index.vue"),
      },
      {
        path: "payment",
        name: "payment",
        meta: {
          title: "支付",
        },
        component: () => import("@/components/payment/index.vue"),
      },
      {
        path: "order",
        name: "order",
        meta: {
          title: "订单列表",
        },
        component: () => import("@/components/order/index.vue"),
      },
      {
        path: "orderDetails",
        name: "orderDetails",
        meta: {
          title: "订单详情",
        },
        component: () => import("@/components/order/order_details/index.vue"),
      },
      {
        path: "contactMy",
        name: "contactMy",
        meta: {
          title: "小思同学",
        },
        component: () => import("@/components/contact_my/index.vue"),
      },
      {
        path: "leaveMessage",
        name: "leaveMessage",
        meta: {
          title: "留言反馈",
        },
        beforeEnter: (to, from, next) => {
          if (userStore.state.token != "") {
            next();
          } else {
            Toast.fail({
              message: "暂未登录，请先登录！",
            });
            router.push("/layout/login");
          }
        },
        component: () => import("@/components/leave_message/index.vue"),
      },
      {
        path: "videoZone",
        name: "videoZone",
        meta: {
          title: "视频专区",
        },
        component: () => import("@/components/video_zone/index.vue"),
      },
      {
        path: "videoDetails/:videoId",
        name: "videoDetails",
        meta: {
          title: "视频详情",
        },
        component: () =>
          import("@/components/video_zone/video_list/video_details/index"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
