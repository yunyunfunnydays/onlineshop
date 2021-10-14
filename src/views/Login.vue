// 使用者登入畫面
<template>
  <div class="container mt-5">
    <!-- 監聽 submit 事件，.prevent 避免此事件有預設觸發的方法-->
    <form class="row justify-content-center" @submit.prevent="signin">
      <div class="col-md-6">
        <h1 class="h3 mb-3 fw-bold bg-color-primary">請先登入</h1>
          <div class="mb-2">
            <label for="inputEmail" class="sr-only">Email address</label>
            <input
              type="email"
              id="inputEmail"
              class="form-control"
              placeholder="Email addresss"
              required
              autofocus
              v-model="user.username"
            />
          </div>
          <div class="mb-2">
            <label for="inputPassword" class="sr-only">Password</label>
            <input
              type="password"
              id="inputPassword"
              class="form-control"
              placeholder="Password"
              required
              v-model="user.password"
            />
          </div>
          <div class="text-end mt-4">
            <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
          </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {

  data() {
    return {
      // 建立一個 data ，格式為要使用的 API 所要求的格式
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    // 設置此方法，在 submit 事件觸發時，將 user 資料，透過 API 傳到資料庫，並獲得回傳訊息來表示是否成功
    signin() {
      // console.log('singin');
      const api = `${process.env.VUE_APP_API}admin/signin`;
      // console.log(api);
      // 參考 vue.axios 文件可知 axios 操作的格式，可為 this.axios/$https
      // this.axios.post(串接的API, 傳輸的內容(須符合API格式))
      this.axios.post(api, this.user)
        .then((res) => {
          // 將登入資訊儲存於 cookie
          const { token, expired } = res.data; // ES6 物件解構
          // 操作 cooking 的 MDN https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
          // document.cookie = `自定義名稱=${token值}; expires=${new Date(expired值，並換成 cookie 要的格式)}`
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
          // console.log(res, expired, new Date(expired),token);
          if (res.data.success) {
            this.$router.push('/dashboard');
          }
        });
    },
  },
};
</script>
