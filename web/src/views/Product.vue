<template >
  <div class="main-container">
    <!-- 走马灯 -->
    <!-- <div class="carousel">
      <div
        v-for="(image, index) in carouselImages"
        :key="index"
        class="carousel-item"
      >
        <img :src="image" alt="carousel image" class="carousel-image" />
      </div>
    </div> -->

    <!-- 分类导航栏 -->
    <div class="category-nav">
      <button
        v-for="category in categories"
        :key="category"
        @click="fetchProducts(category)"
        :class="{ active: currentCategory === category }"
      >
        {{ category }}
      </button>
    </div>

    <!-- 商品列表 -->
    <div class="main-content">
      <div class="product-list">
        <div
          v-for="product in products"
          :key="product._id"
          class="product-item"
        >
          <router-link :to="`/goods/${product._id}`">
            <img
              :src="product.image"
              alt="product image"
              class="product-image"
            />
            <div class="product-info">
              <h2>{{ product.name }}</h2>
              <p>{{ product.description }}</p>
              <span class="product-price">Price: ${{ product.price }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 加载中状态 -->
    <div v-if="isLoading" class="loading">加载中...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [], // 商品数据
      page: 1, // 当前页码
      isLoading: false, // 加载状态
      currentCategory: 'CPU', // 当前分类
      categories: ['CPU', 'GPU', '苹果', '协处理器', '其他'], // 分类
      // carouselImages: [
      //   // 走马灯图片
      //   '@assets/images/carousel1.jpg',
      //   '@assets/images/carousel2.jpg',
      //   '@assets/images/carousel3.jpg',
      // ],
    }
  },
  mounted() {
    
    this.fetchProducts(this.currentCategory)
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    async fetchProducts(category, page = 1) {
      this.isLoading = true

      // 发送 API 请求，获取指定分类和页码的数据
      const response = await this.$http.get(
        `products?category=${category}&page=${page}`
      )

      // 获取到的产品数据
      const fetchedProducts = response.data
      console.log(fetchedProducts,page)
      
      // 如果获取的数据为空，表示没有更多数据，停止加载
      if (fetchedProducts.length === 0) {
        this.noMoreData = true
      } else {
        // 如果是第一页，替换当前产品列表
        if (page === 1) {
          this.products = fetchedProducts
        } else {
          // 如果是加载更多，追加数据
          this.products = this.products.concat(fetchedProducts);
        }
      }

      this.isLoading = false
    },

    handleScroll() {
      // 检查是否已经在加载或没有更多数据
      if (this.isLoading || this.noMoreData) {
        return
      }

      // 获取页面滚动信息
      const scrollPosition = window.scrollY + window.innerHeight
      const pageHeight = document.documentElement.scrollHeight

      // 当滚动到页面底部时，加载下一页数据
      if (scrollPosition >= pageHeight - 100) {
        // 可以根据需要调整触发加载的距离
        this.page++
        this.fetchProducts(this.selectedCategory, this.page)
      }
    },
  },
}
</script>

<style scoped>
.main-container {
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
}

.carousel {
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
}

.carousel-item {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-nav {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.category-nav button {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #3498db;
  border: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.category-nav button.active {
  background-color: #2980b9;
}

.category-nav button:hover {
  background-color: #2980b9;
}

.main-content {
  text-align: center;
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

.loading {
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #999;
}
</style>
