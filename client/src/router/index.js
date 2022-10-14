import { createRouter, createWebHashHistory } from 'vue-router';

import CommentGift from '../views/Gift.vue';
import CommentFood from '../views/Food.vue';
import CommentShopping from '../views/Shop';
import commentHotel from '../views/Hotel';

/**
 * 抽奖
 * 购物
 * 美食
 * 酒店
 */
const routes = [
  {
    path: '/',
    component: CommentGift
  },
  {
    path: '/comment_shopping',
    component: CommentShopping
  },
  {
    path: '/comment_food',
    component: CommentFood
  },
  {
    path: '/comment_hotel',
    component: commentHotel
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
