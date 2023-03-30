import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../src/components/Home.vue";
import Authorization from "../src/components/Authorization.vue";
import addGame from "../src/components/addGame.vue";
import updateMoney from "../src/components/updateMoney.vue";
import InsideMoney from "../src/components/insideMoney.vue";
import InsideMoneyUpdate from "../src/components/insideMoneyUpdate.vue";
import PhotoPost from "../src/components/PhotoPost.vue";
let routes = [
  {
    path: "/",
    name: "Authorization",
    component: Authorization,
  },
  {
    path: "/Home",

    component: Home,

    children: [
      {
        path: "/addGame",
        name: "addGame",
        component: addGame,
      },

      {
        path: "/updateMoney",

        component: updateMoney,
      },

      {
        path: "/insideMoney/:id",
        name: "insideMoney",
        component: InsideMoney,
        props: true,
      },
      {
        path: "/insideMoneyUpdate/:id/:secId",
        name: "insideMoneyUpdate",
        component: InsideMoneyUpdate,
        props: true,
      },

      {
        path: "/PhotoPost",
        component: PhotoPost,
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
