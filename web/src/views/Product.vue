<script>
export default {
  data() {
    return {
      carousel: [], // 轮播图数据
      categoryData: [
        {
          name: 'CPU',
          productList: [], // 手机商品列表
        },
        {
          name: 'GPU',
          productList: [],
        },
        {
          name: '苹果',
          productList: [],
        },
        {
          name: '协处理器',
          productList: [],
        },
        {
          name: '其他',
          productList: [],
        },
      ],
    }
  },
  async created() {
    // 加载数据
    this.fetchSlideshow()
    await this.loadCategoryData()
    console.log(this.categoryData)
  },
  methods: {
    // 获取轮播图数据
    async fetchSlideshow() {
      try {
        const slideshowRes = await this.$http.get('slideshows')
        this.carousel = await Promise.all(
          slideshowRes.data.map(async (item) => {
            const res = await this.$http.get(`products/${item.productId}`)
            return res.data
          })
        )
        console.log('轮播图', this.carousel)
      } catch (error) {
        console.error('获取轮播图数据失败', error)
      }
    },

    // 加载商品数据
    async loadCategoryData() {
      console.log(this.categoryData.length)
      for (let i = 0; i < this.categoryData.length; i++) {
        this.categoryData[i].productList = await this.getPromo(
          this.categoryData[i].name,
          this.categoryData[i].productList
        )
      }
      console.log('商品', this.categoryData)
    },

    // 获取各类商品数据
    async getPromo(categoryName, productList) {
      try {
        const res = await this.$http.get(`products`, {
          params: {
            category: categoryName,
            page: 1,
            limit: 8,
          },
        })
        productList = res.data
        return productList
      } catch (err) {
        return Promise.reject(err)
      }
    },
  },
}
</script>
<template>
  <div class="home" id="home" name="home">
    <!-- 轮播图 -->
    <el-carousel class="zoom-image" :interval="5000" arrow="always">
      <el-carousel-item v-for="(item, index) in carousel[0].image" :key="index">
        <img :src="item" class="image" />
      </el-carousel-item>
    </el-carousel>
    <!-- 轮播图END -->

    <div class="main-box">
      <div class="main">
        <!-- 动态商品展示区域 -->
        <div
          v-for="(category, index) in categoryData"
          :key="index"
          class="product-category"
        >
          <div class="box-title">
            <div class="title">{{ category.name }}</div>
            <div class="more">更多商品></div>
          </div>
          <div class="box-bd">
            <el-row :gutter="20" v-if="category.productList.length > 0">
              <!-- :xs="12"
                :sm="8"
                :md="6"
                :lg="6" -->
              <el-col
                :span="6"
                v-for="(item, imgIndex) in category.productList"
                :key="imgIndex"
              >
                <el-card class="card-view">
                  <router-link :to="`/goods/${item._id}`">
                    <div class="box-img">
                      <img :src="item.image[0]" class="image" />
                    </div>
                    <div class="title">{{item.name }}</div>
                  </router-link>
                </el-card>
              </el-col>
            </el-row>
            <div style="text-align: center; margin-top: 100px" v-else>
              抱歉，暂时还没有该分类的图片
            </div>
          </div>
        </div>
        <!-- 动态商品展示区域 END -->
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#home {
  margin-top: 55px;
}
.main-box {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}

.main {
  margin: 0 auto;
  max-width: 1225px;
}

/* 轮播图CSS */
.zoom-image {
  margin: 0 auto;
  width: 1225px;
  height: 350px;
  display: block;
}
.zoom-image .image {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 保持图片比例 */
  transform: scale(1.4); /* 缩放图片至原大小的 80% */
  background-color: white; /* 背景色为白色 */
  display: block;
  margin: auto; /* 使图片居中 */
}

/* 轮播图CSS END */

.box-title {
  width: 100%;
  height: 58px;
  margin: 20px 0 0 0;
  display: block;
}

.box-title .title {
  float: left;
  font-size: 22px;
  font-weight: 200;
  line-height: 58px;
  color: #333;
}
.box-title .more {
  font-size: 18px;
  font-weight: 200;
  line-height: 58px;
  float: right;
}
.box-bd {
  height: 625px;
  display: block;
  z-index: 1000;
}
.card-view {
  display: flex;
  flex-direction: column;
  margin: 20px 0px;
  height: 300px; /* 控制卡片的总高度 */
  transition: all 0.3s ease, box-shadow 0.3s ease;
}

.card-view:hover {
  transform: translateY(-5px); /* 鼠标悬停时卡片向上浮动 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); /* 增加阴影效果 */
  cursor: pointer; /* 鼠标变为手型 */
}

.box-img {
  flex: 1; /* 使图片占据卡片的剩余空间 */
  display: flex;
  justify-content: flex-start; /* 使图片在上方 */
  align-items: center; /* 图片垂直居中 */
}

.image {
  width: 250px;
  height: 200px; /* 确保所有图片的高度一致 */
  object-fit: cover; /* 确保图片在宽高比不一致时裁剪 */
  margin: 10px auto;
  margin-top:0px ;
}
.title{
  text-align: center;
}

.card-view > div {
  padding: 14px;
  flex-shrink: 0; /* 确保文字部分不压缩 */
}

</style>