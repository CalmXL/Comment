import { createStore } from 'delfin';

export default createStore({
  state: {
    userInfo: {
      id: 1,
      username: '张三'
    }
  },
  actions: {
    setUserInfo (store, userInfo) {
      store.userInfo = userInfo;
    }
  }
})