const express = require('express');
const bodyParser = require('body-parser');
const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

// 复用性 + 程序的集成性来说 面向对象是更好的选择

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');

  next();
});

app.get('/get_comment_list', (req, res) => {
  // console.log(req.params);
  const { type } = req.query;

  const commentListStr = readFileSync(resolve(__dirname, `data/${type}.json`), 'utf8');
  const commentList = JSON.parse(commentListStr);

  res.json({
    code: 0,
    msg: 'ok',
    data: commentList
  })
});

app.post('/set_comment_list', (req, res) => {
  console.log(req.body);
  const { comment, type } = req.body;
  console.log(comment);
  console.log(type);

  const commentListStr = readFileSync(resolve(__dirname, `data/${type}.json`), 'utf8');
  const commentList = JSON.parse(commentListStr);
  commentList.unshift(comment); 
  writeFileSync(resolve(__dirname, `data/${type}.json`), JSON.stringify(commentList), 'utf8');

  res.json({
    code: 0,
    msg: 'ok',
    data: comment
  });
});

app.listen(3000, () => {
  console.log('Welcome to experss, on the prot 3000!');
});

/**
 * comment {
 *    id: Number,
 *    pid(parentId): 评论0， 回复保存 我评论或回复的那一条的id
 *    comment: String
 * },
 * 
 * [
 *    {
 *      id: 1,
 *      uid: 1,
 *      pid: 0,
 *      comment: '你好
 *    },
 *    {
 *      id: 2,
 *      uid: 2,
 *      pid: 1,
 *      comment: '你好呀'
 *    },
 *    {
 *      id: 3,
 *      uid: 3,
 *      pid: 2,
 *      comment: '幸会'
 *    },
 * ]
 * 
 * relation 关联模型
 * 
 * 评论了一条 id: 1
 * 回复了ID1的评论 comment
 * 
 * {
 *    id: number,
 *    username: string
 * }
 * 
 * [
 *    {
 *      id: 1, 
 *      username: 'zhangsan',
 *    },
 *    {
 *      id: 2, 
 *      username: 'lisi',
 *    },
 *    {
 *      id: 3, 
 *      username: 'wangwu',
 *    },
 *    
 * ]
 */


/**
 * 电商
 * 
 * 抽奖
 * 购物
 * 预售
 * 售后
 * 
 * class -> 所有跟评论相关的方法、状态集成到一个类 -> constructor(type)
 * 
 * commentType.js -> 4个对象 -> 保存 
 */