<template>
    <Navbar></Navbar>
    <div class="container-fluid mt-3 position-relative">
      <ToastMessages></ToastMessages>
      <router-view/>
    </div>
</template>

<script>
import ToastMessages from '@/components/ToastMessages.vue';
// 載入 emitter 文件中的 emitter 實例
import emitter from '@/methods/emitter';
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
    ToastMessages,
  },
  // 將此實例提供給內層元件可做 Inject
  provide() {
    return {
      emitter,
    };
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
    const api = `${process.env.VUE_APP_API}api/user/check`;
    console.log(api);
    this.$http.post(api)
      .then((res) => {
        if (!res.data.success) {
          this.$router.push('/login');
        }
      });
  },
};

</script>
