<script>
export default {
  data() {
    return {
      showModal: false,
      imageUrl: 'https://example.com/path/to/chip-image.jpg', // 替换成实际的图片地址
      data: {},
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
        this.imageUrl = res.data.icon
        console.log(res)
      } catch (error) {}
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
      <div class="image-container" @click="showModal = true">
        <img :src="imageUrl" alt="chip image" class="thumbnail" />
      </div>
      <div class="description">
        <h2>{{ data.title }}</h2>
        <p>
          介绍:<br>
          {{ data.body }}
        </p>
      </div>
    </div>

    <!-- 图片放大弹窗 -->
    <div v-if="showModal" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <img :src="imageUrl" alt="large image" class="large-image" />
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
  padding:10px ;
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
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
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
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.large-image {
  margin: auto;
  width: 200%;
  border-radius: 8px;
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