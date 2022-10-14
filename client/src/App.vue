<script setup>
  import ProductComment from './components/ProductComment.vue';
  import useUserStore from './store/user';
  import { useRoute } from 'vue-router';

  const userStore = useUserStore();
  const route = useRoute();

</script>

<template>
  <div>
    <h1>{{ userStore.userInfo.username }}</h1>
    <div>
      <button
        @click="userStore.setUserInfo({
          id: 1,
          username: '张三'
        })"
        :class="{'active': userStore.userInfo.id === 1}"
      >张三</button>
      <button
        @click="userStore.setUserInfo({
          id: 2,
          username: '李四'
        })"
        :class="{'active': userStore.userInfo.id === 2}"
      >李四</button>
      <button
        @click="userStore.setUserInfo({
          id: 3,
          username: '王五'
        })"
        :class="{'active': userStore.userInfo.id === 3}"
      >王五</button>
    </div>

    <!-- <product-comment></product-comment> -->
    <div>
      <button :class="['comment-type-btn', route.path === '/' ? 'curr' : '']">
        <router-link to="/">Gift</router-link>
      </button>
      <button :class="['comment-type-btn', route.path === '/comment_food' ? 'curr' : '']">
        <router-link to="/comment_food">Food</router-link>
      </button>
      <button :class="['comment-type-btn', route.path === '/comment_shopping' ? 'curr' : '']"> 
        <router-link to="/comment_shopping">Shop</router-link>
      </button>
      <button :class="['comment-type-btn', route.path === '/comment_hotel' ? 'curr' : '']">
        <router-link to="/comment_hotel">Hotel</router-link>
      </button>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
  a {
    text-decoration: none;
    color: orange;
    font-size: 25px;
  }
  .active {
    background-color: #000;
    color: #fff;
  }

  .comment-type-btn {
    width: 78px;
    height: 44px;
    margin-top: 10px;
    margin-right: 10px;
    border-radius: 10px;
    background-color: #000;
    border: none;

    &.curr {
      background-color: hotpink;
      a {
        color: #fff;
      }
    }
  }
</style>