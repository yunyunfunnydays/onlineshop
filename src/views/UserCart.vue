<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-7">
        <table class="table align-middle">
          <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <!--  加入 v-for -->
          <tr v-for="item in products" :key="item.id">
            <td style="width: 200px">
              <div style="height: 100px; background-size: cover; background-position: center"
                  :style="{backgroundImage:`url(${item.imageUrl})`}"></div>
            </td>
            <td><a href="#" class="text-dark">{{item.title}}</a></td>
            <td>
              <div class="h5" v-if="!item.price">{{item.origin_price}}</div>
              <div v-else>
                <del class="h6">原價{{item.origin_price}}</del>
                <div class="h5">現在只要{{item.price}}</div>
              </div>
            </td>
            <td>
              <div class="btn-group bnt-group-sm">
                <!-- 按查看更多進到商品介紹頁 -->
                <button type="button" class="btn btn-outline-secondary"
                       @click="getProduct(item.id)">查看更多</button>
                <button type="button" class="btn btn-outline-danger">加入購物車</button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      isLoading: false,
    };
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.products;
          this.isLoading = false;
          console.log(res);
        });
    },
    getProduct(id) {
      this.$router.push(`/user/product/${id}`);
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
