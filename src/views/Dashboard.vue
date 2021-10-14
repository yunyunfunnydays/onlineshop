<template>
  <!--新增 bootstrap navbar 元件，獨立為一個 components 檔案，並用註冊的方式匯入-->
  <Navbar></Navbar>
  <router-view/>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
  created() {
    // 從 cookie 取出 token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // 將 token 寫入 header，則每當 axios 發送 API 時，皆默認會發送此資訊
    this.axios.defaults.headers.common.Authorization = token;
    // 建立接收驗證訊息的 API
    const api = `${process.env.VUE_APP_API}api/user/check`;
    console.log(api);
    // 發送驗證訊息
    this.axios.post(api)
      .then((res) => {
      // 當驗證結果為非登入中，畫面跳轉回登入畫面
        if (!res.data.success) {
          this.$router.push('/login');
        }
      });
  },
};

</script>
