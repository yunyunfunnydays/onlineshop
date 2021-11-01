// 用於錯誤訊息回饋的list，由於此 component 會在多個元件中使用，所以僅在 Dashboard 做註冊並使用 mitt 套件
// 使其他子元件要觸發 Toast 時可使用 mitt 來傳輸資料與調用函式
// 需讓元件可接續顯示多個toast
<template>
  <div class="toast-container position-absolute pe-3 top-0 end-0">
    <Toast v-for="(msg, key) in messages" :key="key" :msg="msg"></Toast>
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue';

export default {
  data() {
    return {
      messages: [],
    };
  },
  components: {
    Toast,
  },
  inject: ['emitter'],
  mounted() {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message;
      this.messages.push({ style, title, content });
      console.log('ToastMessages', this.messages);
    });
  },
};
</script>
