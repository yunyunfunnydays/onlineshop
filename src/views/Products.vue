// 後台管理，產品列表
<template>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <!-- 用 v-for 建立有重複性的表格 -->
      <tr v-for="item in products" :key="item.id">
        <td>{{item.category}}</td>
        <td>{{item.content}}</td>
        <td class="text-right">{{item.origin_price}}</td>
        <td class="text-right">{{item.price}}</td>
        <td>
          <!-- v-if 條件式 -->
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm">編輯</button>
            <button class="btn btn-outline-danger btn-sm">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      pagination: {}, // 分頁資訊
    };
  },
  methods: {
    // 後台管理，取得產品列表
    getProducts() {
      // 取得產品列表 API
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products`;
      this.axios.get(api)
        .then((res) => {
          if (res.data.success) {
            // 取得後將資料存入 DATA，才可以帶入到 HTML
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          }
        });
    },
  },
  // 在頁面創建時觸發此方法取得產品列表
  created() {
    this.getProducts();
  },
};
</script>
