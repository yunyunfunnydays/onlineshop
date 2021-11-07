<template>
  <div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modalDom">

    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增產品</span>
          </h5>
          <!-- TODO change the color -->
          <button type="button" class="btn-close" data-bs-dismiss="modal"
           aria-label="Close" ></button>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input type="text" class="form-control" id="image"
                       placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
              </div>
              <div class="mb-3" >
                <label for="customFile" class="form-label">
                  或 上傳圖片
                  <i class="fas fa-spinner fa-spin"></i>
                </label>
                <!-- 上傳圖片 -->
                <!-- TODO一次上傳多圖 (檔案圖片)-->
                <input type="file" id="customFile" class="form-control form-control"
                       ref="fileInput" @change="uploadFile" />
              </div>
              <img :src="tempProduct.imageUrl" alt="" class="img-fluid" />
              <!-- 一次新增多圖 (從連結) -->
              <div class="mt-5" v-if="tempProduct.images">
                <!-- 先將已有的資料取出 -->
                <div v-for="(image, key) in tempProduct.images"
                          class="mb-3 input-group" :key="key">
                  <input
                    type="url"
                    class="form-control"
                    placeholder="請輸入連結"
                    v-model="tempProduct.images[key]">
                  <button type="button" class="btn btn-outline-danger"
                          @click="tempProduct.images.splice(key, 1)">移除</button>
                  <img :src="tempProduct.images[key]" alt="" class="img-fluid">
                </div>
                <!-- 如果能填入的資料為空或滿了，則會再出現新增圖片選項 -->
              <div v-if="
              tempProduct.images[tempProduct.images.length - 1] || !tempProduct.images.length">
                   <button class="btn btn-outline-primary btn-sm d-block w-100"
                           @click="tempProduct.images.push('')">新增圖片</button>
               </div>
              </div>
            </div>
            <div class="col-sm-8">
              <!-- 標題 -->
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input type="text" id="title" class="form-control"
                       placeholder="請輸入標題" v-model="tempProduct.title">
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <!-- 分類 -->
                  <label for="category" class="form-label" >分類</label>
                  <input type="text" id="category" class="form-control"
                         placeholder="請輸入分類" v-model="tempProduct.category">
                </div>
                <div class="mb-3 col-md-6">
                  <!-- 單位 -->
                  <label for="unit" class="form-label">單位</label>
                  <input type="text" id="unit" class="form-control"
                         placeholder="請輸入單位" v-model="tempProduct.unit">
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <!-- 原價 -->
                  <label for="origin_price" class="form-label">原價</label>
                  <input type="number" id="origin_price" class="form-control"
                         placeholder="請輸入原價" v-model.number="tempProduct.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <!-- 售價 -->
                  <label for="price" class="form-label">售價</label>
                  <input type="number" id="price" class="form-control"
                         placeholder="請輸入售價" v-model.number="tempProduct.price">
                </div>
              </div>
              <hr>

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea type="text" id="description" class="form-control"
                          placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea type="text" class="form-control" id="content"
                          placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input type="checkbox" id="is_enabled" class="form-check-input"
                         v-model="tempProduct.is_enabled" :true-value="1" :false-value="0" >
                  <label for="is_enabled" class="form-check-label">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary"
                  data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary"
                  @click="$emit('update-product', tempProduct)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 匯入 js 檔案中匯出的物件，在 bootstrap 的 modal.js 匯出其 js 物件來操作 modal，此物件為一建構函式，可利用創建實例，使實例可使用 modal 物件中的方法與屬性
// 1. 匯入 js 檔案中匯出的物件，在 bootstrap 的 modal.js 匯出其 js 物件來操作 modal，此物件為一建構函式
import modalMixin from '@/mixins/modalMixin';

// 2.在 mounted 生命週期，創建 modal 實例，在 mounted 生命週期才抓得到 html DOM 內容
export default {
  data() {
    return {
      modal: {},
      tempProduct: {},
      app: {},
    };
  },

  props: {
    productProps: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    productProps() {
      this.tempProduct = this.productProps;
      // 判斷是否首次新增圖片，若是則創建一個陣列來儲存圖片 URL
      if (!this.tempProduct.images) {
        this.tempProduct.images = [];
      }
    },
  },
  methods: {
    uploadFile() {
      // 圖片檔案傳至專門上傳圖片的 API，會回傳圖片的 URL
      // 將此 URL 存到產品的物件中，再透過 updateProduct() 將 URL 跟資料傳入後端
      const uploadedFile = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(url, formData)
        .then((res) => {
          if (res.data.success) {
            this.tempProduct.imageUrl = res.data.imageUrl;
          }
        });
    },
  },
  mixins: [modalMixin],
};
</script>
