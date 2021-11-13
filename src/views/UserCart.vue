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
              <div class="h5" v-if="!item.price">{{item.origin_price}}元</div>
              <div v-else>
                <del class="h6">原價{{item.origin_price}}元</del>
                <div class="h5">現在只要{{item.price}}元</div>
              </div>
            </td>
            <td>
              <div class="btn-group bnt-group-sm">
                <!-- 按查看更多進到商品介紹頁 -->
                <button type="button" class="btn btn-outline-secondary"
                      @click="getProduct(item.id)">查看更多</button>
                <button type="button" class="btn btn-outline-danger"
                      @click="addCart(item.id)"
                      :disabled="status.loadingItem === item.id">加入購物車
                      </button>
                <div class="d-flex align-items-center" v-if="status.loadingItem === item.id">
                  <div class="spinner-border ms-2 text-danger spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- 購物車列表 -->
      <div class="col-md-5">
        <div class="sticky-top">
          <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 110px">數量</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
            <template v-if="cart.carts">
              <tr v-for="item in cart.carts" :key="item.id">
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm"
                          :disable="status.loadingItem === item.id"
                          @click="removeCartItem(item.id)">
                    <i class="bi bi-x"></i>
                  </button>
                </td>
                <td>
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">
                    已套用優惠券
                  </div>
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <input type="number" class="form-control"
                      v-model.number="item.qty">
                    <div class="input-group-text">/ {{ item.product.unit }}</div>
                  </div>
                </td>
                <td>
                  <small class="text-success" v-if="item.coupon">折扣價:</small>
                  價錢換算
                  <!-- TODO -->
                </td>
              </tr>
            </template>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end">價錢</td>
              </tr>
              <tr>
                <!-- TODO 套用優惠券總價 -->
              </tr>
            </tfoot>
          </table>
        </div>
        <!--TODO 套用優惠碼按鍵  -->
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
      status: {
        loadingItem: '',
        // 加入購物車的狀態
      },
      cart: {},
    };
  },

  inject: ['pushMessageState'],

  methods: {
    // 取得商品列
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
    // 商品 查看更多
    getProduct(id) {
      this.$router.push(`/user/product/${id}`);
    },
    // 加入購物車
    addCart(id) {
      this.status.loadingItem = id; // loading動畫顯示
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty: 1,
      };
      this.$http.post(url, { data: cart })
        .then((res) => {
          console.log(res);
          this.pushMessageState(res, '加入購物車');
          this.status.loadingItem = '';
          this.getCart();
        });
    },
    // 取得購物車內商品
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.$http.get(url)
        .then((res) => {
          console.log('getcart', res);
          this.cart = res.data.data;
          this.isLoading = false;
        });
    },
    // 刪除購物車商品
    removeCartItem(id) {
      this.status.loadingItem = id;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.isLoading = true;
      this.$http.delete(url)
        .then((res) => {
          this.pushMessageState(res, '移除購物車品項');
          this.status.loadingItem = '';
          this.getCart();
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>
