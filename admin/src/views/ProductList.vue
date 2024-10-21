<template>
    <div>
      <h1>商品列表</h1>
      <el-input
        placeholder="搜索商品分类"
        v-model="searchCategory"
        @input="fetchProducts"
        style="margin-bottom: 20px;"
      />
      <el-table :data="products" style="width: 100%">
        <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
        <el-table-column prop="price" label="商品价格" width="180"></el-table-column>
        <el-table-column prop="category" label="商品分类" width="180"></el-table-column>
        <el-table-column prop="image" label="商品图片" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.image" alt="商品图片" style="width: 50px; height: 50px;" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" @click="editProduct(scope.row._id)">编辑</el-button>
            <el-button type="danger" @click="deleteProduct(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <el-pagination
        @current-change="fetchProducts"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="totalProducts"
        layout="total, prev, pager, next, jumper"
        style="margin-top: 20px;"
      />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [],
        searchCategory: '',
        currentPage: 1,
        pageSize: 10,
        totalProducts: 0,
      };
    },
    methods: {
      async fetchProducts() {
        const res = await this.$http.get('rest/products');
        console.log(res);
        this.products = res.data;
        this.totalProducts = res.data.length;
      },
      editProduct(id) {
        // 跳转到编辑页面
        this.$router.push(`/products/create/${id}`);
      },
      async deleteProduct(id) {
        try {
          await this.$http.delete(`rest/products/${id}`);
          this.$message.success('删除成功');
          this.fetchProducts(); // 刷新列表
        } catch (error) {
          this.$message.error('删除失败，请重试！');
          console.error('删除商品时发生错误:', error);
        }
      },
    },
    created() {
      this.fetchProducts();
    },
  };
  </script>
  
  <style scoped>
  /* 可以根据需要添加样式 */
  </style>
  