// 後台管理，產品列表
<template>
  <Loading :active="isLoading"></Loading>
  <div class="text-end">
    <button class="btn btn-primary" type="button" @click="openModal(true)">
      新增商品
    </button>
  </div>
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
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td class="text-right">{{ item.origin_price }}</td>
        <td class="text-right">{{ item.price}}</td>
        <td>
          <!-- v-if 條件式 -->
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm"
                    @click="openModal(false,item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm"
                    @click="openDelModal(item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <ProductModal ref="modalDom" :product-props="tempProduct"
                @update-product="updateProduct"></ProductModal>
  <DelModal ref="delModalDom" :del-product-props="tempProduct"
            @del-product="delProduct"></DelModal>
</template>

<script>
// mitt 在此載入在使用 provide 使子元件可用 inject 得到 mitt 實例
import ProductModal from '@/components/ProductModal.vue';
import DelModal from '@/components/DelModal.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {}, // 分頁資訊
      tempProduct: {},
      // 因為有新增、修改兩個路徑，所以新增一個變數來協助區別，true 為新增，false 為編輯
      isNew: false,
      isLoading: false,
    };
  },

  components: {
    ProductModal,
    DelModal,
  },

  inject: ['emitter'],

  methods: {
    // 後台管理，取得產品列表
    getProducts() {
      // 取得產品列表 API
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products`;
      this.isLoading = true;
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            // 取得後將資料存入 DATA，才可以帶入到 HTML
            this.products = res.data.products;
            this.pagination = res.data.pagination;
            this.isLoading = false;
          }
        });
    },
    openModal(isNew, item) {
      if (isNew) {
        // 新增
        this.tempProduct = {};
      } else {
        // 編輯
        this.tempProduct = { ...item };
      }
      this.isNew = isNew;
      const productComponent = this.$refs.modalDom;
      productComponent.modalShow();
    },
    updateProduct(item) {
      this.tempProduct = item;
      // 由於新增、修改的 api用法路徑都不同，所以要靠 isNew 來判斷是新增還是修改
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';

      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
        httpMethod = 'put';
      }
      const productComponent = this.$refs.modalDom;
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((res) => {
          productComponent.modalHide();
          console.log('錯誤訊息', res);
          if (res.data.success) {
            this.getProducts();
            this.emitter.emit('push-message', {
              style: 'success',
              title: '更新成功',
            });
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '更新失敗',
              content: res.data.message.join('、'),
            });
          }
        });
    },
    openDelModal(delItem) {
      this.tempProduct = delItem;
      this.$refs.delModalDom.modalShow();
    },
    // 刪除
    delProduct() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.isLoading = true;
      this.$http.delete(api)
        .then((res) => {
          console.log(res);
          this.$refs.delModalDom.modalHide();
          this.getProducts();
        });
    },
  },
  // 在頁面創建時觸發此方法取得產品列表
  created() {
    this.getProducts();
  },
};
</script>
