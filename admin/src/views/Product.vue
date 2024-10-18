<template>
  <div class="product-management">
    <h1>{{ id ? '编辑商品' : '商品上架' }}</h1>
    <form @submit.prevent="submitProduct">
      <div>
        <label for="name">商品名称:</label>
        <input v-model="product.name" id="name" required />
      </div>
      <div>
        <label for="description">描述:</label>
        <textarea v-model="product.description" id="description" required></textarea>
      </div>
      <div>
        <label for="price">价格:</label>
        <input type="number" v-model="product.price" id="price" required />
      </div>
      <div>
        <label for="image">上传图片:</label>
        <input type="file" @change="handleFileUpload" id="image" required />
      </div>
      <div v-if="imageUrl">
        <h3>预览:</h3>
        <img :src="imageUrl" alt="Product Image" class="image-preview" />
      </div>
      <button type="submit">{{ id ? '保存修改' : '上架商品' }}</button>
    </form>
    <div v-if="message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    id: {}  // 接收是否是编辑模式的产品 ID
  },
  data() {
    return {
      product: {
        name: '',
        description: '',
        price: 0,
        image: '',
      },
      imageFile: null,
      imageUrl: '',
      message: '',
    };
  },
  methods: {
    handleFileUpload(event) {
      this.imageFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result; // 显示预览
      };
      reader.readAsDataURL(this.imageFile);
    },
    async submitProduct() {
      try {
        // 上传图片并获取 URL
        const formData = new FormData();
        formData.append('file', this.imageFile);
        const uploadResponse = await this.$http.post('/admin/api/upload', formData);
        this.product.image = uploadResponse.data.url; // 获取上传后的图片 URL

        // 新建或编辑产品
        if (this.id) {
          const response = await this.$http.put(`/admin/api/rest/products/${this.id}`, this.product);
          this.message = `商品 ${response.data.name} 修改成功！`;
        } else {
          const response = await this.$http.post('/admin/api/rest/products', this.product);
          this.message = `商品 ${response.data.name} 上架成功！`;
        }

        this.resetForm();
      } catch (error) {
        this.message = '操作失败，请检查输入！';
      }
    },
    resetForm() {
      this.product.name = '';
      this.product.description = '';
      this.product.price = 0;
      this.product.image = '';
      this.imageUrl = '';
      this.imageFile = null;
    },
    async fetchProduct() {
      if (this.id) {
        const res = await this.$http.get(`/admin/api/rest/products/${this.id}`);
        this.product = res.data;
      }
    }
  },
  created() {
    this.id && this.fetchProduct();
  },
};
</script>

<style scoped>
.product-management {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.product-management h1 {
  text-align: center;
}

.product-management form {
  display: flex;
  flex-direction: column;
}

.product-management div {
  margin-bottom: 15px;
}

.product-management label {
  margin-bottom: 5px;
}

.product-management input,
.product-management textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.product-management button {
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.image-preview {
  max-width: 100%;
  margin-top: 10px;
}
</style>
