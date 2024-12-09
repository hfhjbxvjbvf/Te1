<script>
export default {
  data() {
    return {
      showModal: false,
      imgUrl: '', // 替换成实际的图片地址
      data: {},
      is4K: false,
    }
  },
  methods: {
    closeModal() {
      this.showModal = false
    },
    async getData() {
      const id = this.$route.params.id
      try {
        const res = await this.$http.get(`/dieshot/${id}`)
        this.data = res.data
        console.log("输出", res)
        // 默认显示标清图片
        if (res.data.picture.picture_360p) {
          this.imgUrl = res.data.picture.picture_360p
        } else {
          console.error('标清图片URL为空')
        }
      } catch (error) {
        console.error('获取数据失败:', error)
      }
    },
    switChover() {
      this.is4K = !this.is4K
      if (this.is4K && this.data.picture.picture_4K) {
        this.imgUrl = this.data.picture.picture_4K
      } else if (!this.is4K && this.data.picture.picture_360p) {
        this.imgUrl = this.data.picture.picture_360p
      } else {
        console.error('切换图片时发现URL为空')
      }
    },
    downloadImage() {
    const link = document.createElement('a')
    link.href = this.imgUrl
    link.download = 'image.jpg' // 设置下载的文件名
    link.click()
  },
  },
  
  mounted() {
    this.getData()
  },
}
</script>
<template>
  <div id="box">
    <!-- 页面内容 -->
    <div class="content">
      <div id="left">
        <div class="image-container" @click="showModal = true">
          <img :src="imgUrl" alt="chip image" class="thumbnail" />
        </div>
        <div id="buttons" style="margin-top: 30px">
          切换
          <span v-html="is4K ? '标清图片' : '4K图片'"></span>
          <el-button
            type="primary"
            icon="el-icon-refresh"
            circle
            @click="switChover"
          ></el-button>
          下载当前图片
          <el-button
            type="success"
            icon="el-icon-download"
            circle
            style="margin-left: 20px"
            @click="downloadImage"
          ></el-button>
        </div>
      </div>

      <div class="description">
        <h2>{{ data.title }}</h2>
        <p>
          介绍:
          <br />
          {{ data.body }}
        </p>
      </div>
    </div>

    <!-- 图片放大弹窗 -->
    <div v-if="showModal" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <img :src="imgUrl" alt="large image" class="large-image" />
        <button class="close-btn" @click="closeModal">×</button>
      </div>
    </div>
  </div>
</template>



<style scoped>
#box {
  margin: 0 auto;
  max-width: 80%;
  background: rgb(244, 249, 255);
  margin-top: 65px;
  padding: 10px;
}

.content {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.image-container {
  flex: 0 0 30%;
}

.thumbnail {
  width: 500px;
  border-radius: 8px;
  cursor: pointer;
  object-fit: contain;
  transition: transform 0.3s;
}

.thumbnail:hover {
  transform: scale(1.05);
}

.description {
  flex: 1;
  padding: 10px;
}

h2 {
  font-size: 24px;
  font-weight: bold;
}

p {
  font-size: 16px;
  line-height: 1.6;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: auto; /* 允许滚动 */
}

.modal-content {
  position: relative;
  max-width: 100%; /* 限制图片的最大宽度 */
  max-height: 100%; /* 限制图片的最大高度 */
}

.large-image {
  width: auto;
  height: auto;
  max-width: 100%; /* 图片不超出窗口宽度 */
  max-height: 100%; /* 图片不超出窗口高度 */
  border-radius: 8px;
  object-fit: contain; /* 保证图片比例不变 */
}


.close-btn {
  position: fixed;
  top: 10px;
  right: 10px;
  background: transparent;
  color: white;
  font-size: 30px;
  border: none;
  cursor: pointer;
}
</style>