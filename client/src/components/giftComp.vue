<script setup>
  import useUserStore from '../store/user';

  import commentComp from './commentComp.vue';
  import Comment from './Comment';

  const userStore = useUserStore();

  const {
    state,
    addComment,
    addReply
  } = new Comment({
    getterURL: 'http://localhost:3000/get_comment_list?type=gift',
    setterURL: 'http://localhost:3000/set_comment_list',
    type: 'gift'
   });
</script>

<template>
  <div>
    <div>
      <p>
        <textarea v-model="state.commentText"></textarea>
      </p>
      <p>
        <button @click="addComment(userStore.userInfo)">提交评论</button>
      </p>
    </div>

    <div>
      <ul>
        <comment-comp 
          :data="state.commentTree"
          @addReply="addReply"
          :userInfo="userStore.userInfo"
        ></comment-comp>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>