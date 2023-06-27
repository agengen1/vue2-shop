import Vue from "vue";
import VueRouter from "vue-router";

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
        component: () => import("@/views/layout/news/index.vue"),
      },
      {
        path: "newsDetails/:newId",
        name: "newsDetails",
        meta: {
          title: "新闻详情",
        },
        component: () => import("@/views/layout/news/news_details/index.vue"),
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
