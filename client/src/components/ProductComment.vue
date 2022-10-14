<script setup>
  // import { onMounted, reactive } from 'vue';
  import useUserStore from '../store/user';
  // import http from '../libs/http';

  import commentComp from './commentComp.vue';
  import Comment from './Comment';

  const userStore = useUserStore();

  const {
    state,
    addComment,
    addReply
  } = new Comment({
    getterURL: 'http://localhost:3000/get_comment_list',
    setterURL: 'http://localhost:3000/set_comment_list',
   });


  // const state = reactive({
  //   commentText: '',
  //   commentTree: null
  // });

  // onMounted(() => {
  //   http.get('http://localhost:3000/get_comment_list').then(data => {
  //     state.commentTree = formatTree(data);
  //     console.log(state.commentTree);
  //   });
  // });

  // const addComment = async () => {
  //   /**
  //    * id 
  //    * uid
  //    * username 
  //    * pid
  //    * comment
  //    */

  //   const { id, username } = useUserStore().userInfo;

  //   const commentInfo = {
  //     id: new Date().getTime(),
  //     pid: 0,
  //     uid: id,
  //     username,
  //     comment: state.commentText
  //   };

  //   setCommentList(commentInfo, setCommentTree);
  // }

  // const setCommentList = async (comment, callback) => {
  //   const data =  await http.post('http://localhost:3000/set_comment_list', { comment });
  //   callback && callback(data);
  // }

  // const setCommentTree = (comment) => {
  //   state.commentTree.unshift(comment);
  //   state.commentText = '';
  // }

  // const addReply = (item, replyText) => {
  //   const { id, username } = useUserStore().userInfo;

  //   const replyInfo = {
  //     id: new Date().getTime(),
  //     pid: item.id,
  //     uid: id,
  //     username,
  //     comment: replyText
  //   }

  //   setCommentList(replyInfo, (reply) => {
  //     setReply(item, reply);
  //   });
  // }

  // const setReply = (item, reply) => {
  //   (item.children || (item.children= [])).push(reply);
  // }

  // // 树形结构化
  // function formatTree (data) {
  //   const result = [];
  //   const map = {};

  //   data.forEach(item => {
  //     map[item.id] = item;
  //     /**
  //      * 3781273812: {
  //      * 
  //      * }
  //      */
  //   });

  //   data.forEach(item => {
  //     const parent = map[item.pid];

  //     if (parent) {
  //       (parent.children || (parent.children = [])).push(item);
  //     } else {
  //       result.push(item);
  //     }
  //   }); 

  //   return result;
  // }
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