<template>
  <div class="main-container">

    <div class="main-content">
      <!-- 分类标题 -->
      <div>
        
      </div>

      <!-- 商品列表 -->
      <div class="product-list">
        
          <div v-for="product in products" :key="product._id" class="product-item">
            <router-link to="/goods" >
          <img :src="product.image" alt="product image" class="product-image" />
          <div class="product-info">
            <h2>{{ product.name }}</h2>
            <p>{{ product.description }}</p>
            <span class="product-price">Price: ${{ product.price }}</span>
          </div>
        </router-link>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [] // 商品数据
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      // 这里是从API获取数据的示例
      this.products = [
        { _id: 1, name: 'Product 1', description: '晚点做商品', price: 100, image: '@assets/images/shop/Intel Xeon Phi(1th).JPG' },
        { _id: 2, name: 'Product 2', description: '丑陋的没事', price: 200, image: '../assets/images/shop/Intel Xeon 2696V2 dieshot.png' },
        { _id: 3, name: 'Product 2', description: '能用就行', price: 200, image: '../assets/images/shop/Intel Xeon E5 2630.png' },
        { _id: 4, name: 'Product 2', description: '我也不知道这是什么商品', price: 200, image: '../assets/images/shop/Intel Xeon E5 2666V3 dieshot.jpg' },
        { _id: 5, name: 'Product 2', description: '阿爸阿爸阿爸', price: 200, image: '../assets/images/shop/Intel Xeon E5 2699V3 dieshot.png' },
        { _id: 6, name: 'Product 2', description: '阿里巴巴是快乐的青年', price: 200, image: '../assets/images/shop/Intel Xeon Phi(1th).JPG' },
        // 更多商品...
      ];
    }
  }
};
</script>

<style scoped>
.main-container {
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
}

.breadcrumb {
  margin-bottom: 20px;
  font-size: 14px;
}

.breadcrumb a {
  text-decoration: none;
  color: #3498db;
}

.breadcrumb-separator {
  margin: 0 5px;
  color: #999;
}

.main-content {
  text-align: center;
}

.category-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #2c3e50;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.product-item {
  border: 1px solid #ddd;
  padding: 10px;
  width: 220px;
  text-align: center;
}

.product-image {
  max-width: 100%;
  height: auto;
}

.product-info h2 {
  font-size: 18px;
  margin: 10px 0;
}

.product-info p {
  font-size: 14px;
  color: #666;
}

.product-price {
  display: block;
  margin-top: 10px;
  font-size: 16px;
  color: #e74c3c;
}
</style>
