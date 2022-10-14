import { onMounted, reactive } from "vue";
import http from "../libs/http";

export default class Comment {

  constructor ({
    getterURL,
    setterURL,
    type
  }) {
    this.getterURL = getterURL;
    this.setterURL = setterURL;
    this.type = type;

    this.state = reactive({
      commentText: '',
      commentTree: null 
    });

    this.getCommentTree();
  }

  getCommentTree () {
    onMounted(async () => {
      const commentList = await this.getCommentList();
      this.state.commentTree = Comment.formatTree(commentList);
    });
  }

  addComment = ({id, username}) => {
    const commentInfo = {
      id: new Date().getTime(),
      uid: id,
      pid: 0,
      username,
      comment: this.state.commentText
    };
    const type = this.type;

    this.setCommentList({comment: commentInfo,  type }, (comment) => {
      this.setComment(comment);
    });
  }

  setComment (comment) {
    this.state.commentTree.unshift(comment);
    this.state.commentText = '';
  }

  addReply = (item, reply, { id, username }) => {

    console.log('addReply');

    const replyInfo = {
      id: new Date().getTime(),
      uid: id,
      pid: item.id,
      username,
      comment: reply
    }

    const type = this.type;

    this.setCommentList({comment: replyInfo, type}, (reply) => {
      console.log(reply);
      this.setReply(item, reply);
    });
  }

  setReply (item, reply) {
    (item.children || (item.children = [])).unshift(reply);
    item.replyText = '';
  }

  async setCommentList (body, callback) {
    const data = await http.post(this.setterURL, body);

    callback && callback(data);
  }

  async getCommentList () {
    return await http.get(this.getterURL);
  }
  
  // 类的单独工具方法可以写成静态方法
  static formatTree (data) {
    console.log(data);
    const result = [];
    const map = {};

    data.forEach(item => {
      map[item.id] = item;
      /**
       * 3781273812: {
       * 
       * }
       */
    });

    data.forEach(item => {
      const parent = map[item.pid];

      if (parent) {
        (parent.children || (parent.children = [])).push(item);
      } else {
        result.push(item);
      }
    }); 

    return result;
  }
}