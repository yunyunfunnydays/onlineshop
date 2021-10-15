<template>
    <Navbar></Navbar>
    <div class="container-fluid">
      <router-view/>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.axios.defaults.headers.common.Authorization = token;
    const api = `${process.env.VUE_APP_API}api/user/check`;
    console.log(api);
    this.axios.post(api)
      .then((res) => {
        if (!res.data.success) {
          this.$router.push('/login');
        }
      });
  },
};

</script>
