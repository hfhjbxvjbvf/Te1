<script>
export default {
  data() {
    return {
      num: 1,
      product: {
        title: '',
        price: 0,
        image: [], // 确保这个数组有图片链接
        description: '',
        details: '',
        url: '',
      },
    }
  },
  methods: {
    async getData() {
      const id = this.$route.params.id
      try {
        const res = await this.$http.get(`products/${id}`)
        this.product = res.data
        console.log('商品', this.product)
      } catch (error) {
        console.error('获取商品数据失败', error)
      }
    },
    addToCart() {
      this.$message({
        message: 'Added to Cart!',
        type: 'success',
      })
    },
  },
  mounted() {
    this.getData()
  },
}
</script>
<template>
  <div class="product-page-container">
    <div class="product-detail">
      <!-- 轮播图区域 -->
      <div class="block">
        <el-carousel class="zoom-image" :interval="5000" arrow="always">
          <el-carousel-item v-for="(item, index) in product.image" :key="index">
            <img :src="item" class="image" />
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- 右侧商品信息区域 -->
      <div class="product-info">
        <h1 class="product-title">{{ product.name }}</h1>
        <p class="product-price">价格: ￥{{ product.price }}</p>
        <p class="product-description">{{ product.description }}</p>

        <div style="margin-top: 20px">
          <el-input-number
            v-model="num"
            :min="1"
            :max="10"
            label="商品数量"
            disabled="true"
          ></el-input-number>
          <br />

          <!-- 添加购物车按钮 -->
          <!-- <el-button type="primary" @click="addToCart" style="margin-top: 20px">
            去淘宝
          </el-button> -->
          <a :href="product.url || '#'">
            <el-button type="primary" style="margin-top: 20px">
              去淘宝
            </el-button>
          </a>
        </div>
      </div>
    </div>

    <!-- 商品功能提示 -->
    <div class="product-extra-info">
      <h2>商品暂且只能通过淘宝购买</h2>
      <h2>
        请点击链接，进淘宝店铺了解详细：
        <a :href="product.url" target="_blank">{{ product.url }}</a>
      </h2>
    </div>
  </div>
</template>



<style scoped>
/* 轮播图样式 */
.zoom-image {
  width: 650px;
  height: 300px;
  display: block;
}
.image {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 保持图片比例 */
  transform: scale(0.8); /* 缩放图片至原大小的 80% */
  background-color: white; /* 背景色为白色 */
  display: block;
  margin: 0 auto; /* 使图片居中 */
}

/* 商品页面容器样式 */
.product-page-container {
  padding: 20px;
  margin: 50px auto;
  color: black; /* 改为黑色字体，通常白色对比度较低 */
  max-width: 1225px;
}

/* 商品详情部分样式 */
.product-detail {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

/* 商品图片样式 */
.product-info {
  flex: 1;
  padding-left: 20px;
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

/* 其他功能区域 */
.product-extra-info {
  margin-top: 30px;
  font-size: 16px;
}

.product-extra-info a {
  color: #3498db;
  text-decoration: none;
}

.product-extra-info a:hover {
  text-decoration: underline;
}

.zoomed-image {
  width: 100%;
  height: auto;
  object-fit: contain;
}
</style>
