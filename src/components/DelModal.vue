<template>
  <div class="modal fade" id="delModal" tabindex="-1"
   aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modalDom">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">刪除 {{tempProduct.title}}</h5>
          <button type="button" class="btn-close"
             data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          是否刪除 <strong class="text-danger bold">{{tempProduct.title}}</strong> (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary"
           data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" @click="$emit('del-product')">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      modal: '',
      tempProduct: {},
    };
  },
  props: {
    delProductProps: {},
  },
  watch: {
    delProductProps() {
      this.tempProduct = this.delProductProps;
    },
  },
  mixins: [modalMixin],
};
</script>
