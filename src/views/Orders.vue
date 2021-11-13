<template>
   <Loading :active="isLoading"></Loading>
   <table class="table mt-4">
     <thead>
       <tr>
       <th>購買時間</th>
       <th>Email</th>
       <th>購買款項</th>
       <th>應付金額</th>
       <th>是否付款</th>
       <th>編輯</th>
       </tr>
     </thead>
     <tbody>
       <template v-for="(item, key) in orders" :key="key">
         <tr>
           <td>{{ $filters.date(item.create_at) }}</td>
           <td>{{ item.user.email }}</td>
           <td>
             <ul class="list-unstyled">
               <li v-for="(product, i) in item.products" :key="i">
                 {{ product.product.title }} 數量：{{ product.qty }}
                 {{ product.product.unit }}
               </li>
             </ul>
           </td>
           <td class="text-right">{{ item.total }}</td>
           <td>是否付款</td>
           <td>
             <div class="btn-group">
               <button type="button" class="btn btn-outline-primary btn-sm">檢視</button>
               <button type="button" class="btn btn-outline-danger btn-sm">刪除</button>
             </div>
           </td>
         </tr>
       </template>
     </tbody>
   </table>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      orders: {},
    };
  },
  methods: {
    getOrders() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders`;
      this.isLoading = true;
      this.$http.get(url)
        .then((res) => {
          console.log(res);
          this.orders = res.data.orders;
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
