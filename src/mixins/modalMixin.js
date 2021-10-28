import Modal from 'bootstrap/js/dist/modal';

export default {
  methods: {
    modalShow() {
      this.modal.show();
      console.log(1234);
    },
    modalHide() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modalDom);
  },
};
