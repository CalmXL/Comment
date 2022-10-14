<script setup>
  /**
   * 编译宏
   * defineProps -> 原生js的API ??? 在当前 vue 单文件组件中没有人提供
   * definePorps -> vue -> 编译之后 -> 才能运行 -> 编译宏方法
   */

   /**
    * .vue -> .js/.vue(文件形式不重要) 最终会打包成 main.js 或者 bundle.js
    *      -> 转变成浏览器能解析的
    * 
    * const __sfc_main = {
    *   props: {
    *     data: Array
    *   },
    *   emits: ['xxx'],
    *   template: ``
    * }
    */
  const props = defineProps({
    data: Array,
    userInfo: Object
  });

  const emits = defineEmits(['addReply'])

  const showrReplyFrom = (item) => {
    item.isReply = !item.isReply;
  } 

  const addReply = (item) => {
    const replyText = item.replyText;
    emits('addReply', item, replyText, props.userInfo);
    item.isReply = false;
    // item.replyText = '';
  }

</script>

<template>
  <li
    v-for="item of props.data"
    :key="item.id"
  >
    <p>{{ item.username }}</p>
    <p>{{ item.comment }}</p>
    <a href="javascript:;" @click="showrReplyFrom(item)">回复</a>
    <!-- 
      将回复的展开属性， 与回复的文本绑定到 item 上
     -->
    <div v-if="item.isReply">
      <p>
        <textarea v-model="item.replyText"></textarea>
      </p>
      <p>
        <button @click="addReply(item)">提交回复</button>
      </p>
    </div>

    <div v-if="item.children">
      <ul>
        <comment-comp 
          :data="item.children"
          @add-reply="addReply"
          :userInfo="props.userInfo"
        ></comment-comp>
      </ul>
    </div>
  </li>
</template>

<style lang="scss" scoped>

</style>