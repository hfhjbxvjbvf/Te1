<template>
    <div class="product-page-container">
      <div class="product-detail">
        <!-- 左侧轮播图区域 -->
        <div class="product-image-slider">
          <el-carousel height="400px">
            <el-carousel-item v-for="(image, index) in images" :key="index">
              <img
                :src="image"
                @click="showZoomImage(index)"
                class="product-image"
              />
            </el-carousel-item>
          </el-carousel>
        </div>
  
        <!-- 右侧商品信息区域 -->
        <div class="product-info">
          <h1 class="product-title">{{ product.title }}</h1>
          <p class="product-price">Price: ${{ product.price }}</p>
          <p class="product-description">{{ product.description }}</p>
          <el-button type="primary" @click="addToCart">Add to Cart</el-button>
        </div>
      </div>
  
      <!-- 商品详细信息 -->
      <div class="product-extra-info">
        <h2>Product Details</h2>
        <p>{{ product.details }}</p>
      </div>
  
      <!-- 图片放大功能 -->
      <el-dialog v-model="zoomDialogVisible" width="80%">
        <img :src="images[selectedImage]" class="zoomed-image" />
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: {
          title: "Awesome Product",
          price: 199.99,
          description: "This is an amazing product that you will love.",
          details: "Detailed information about the product goes here.",
        },
        images: [
          "https://via.placeholder.com/400x400?text=Product+Image+1",
          "https://via.placeholder.com/400x400?text=Product+Image+2",
          "https://via.placeholder.com/400x400?text=Product+Image+3",
        ],
        selectedImage: 0,
        zoomDialogVisible: false,
      };
    },
    methods: {
      addToCart() {
        this.$message({
          message: "Added to Cart!",
          type: "success",
        });
      },
      showZoomImage(index) {
        this.selectedImage = index;
        this.zoomDialogVisible = true;
      },
    },
  };
  </script>
  
  <style scoped>
  .product-page-container {
    padding: 20px;
    margin: 50px auto;
  }
  
  .product-detail {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  
  .product-image-slider {
    flex: 1;
    margin-right: 20px;
  }
  
  .product-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    cursor: pointer;
  }
  
  .product-info {
    flex: 1;
  }
  
  .product-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .product-price {
    font-size: 20px;
    color: #e74c3c;
    margin-bottom: 10px;
  }
  
  .product-description {
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  .product-extra-info {
    margin-top: 30px;
  }
  
  .zoomed-image {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
  </style>
  