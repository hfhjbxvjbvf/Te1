<template>
  <div>
    <h1>轮播图列表</h1>
    <!-- 全选复选框 -->
    <div>
      <el-checkbox
        v-model="selectAll"
        @change="toggleSelectAll"
        label="全选"
        style="margin-bottom: 10px"
      >
        全选
      </el-checkbox>
      <!-- 如果点击确定的时候，将选择状态提交，避免重复提交 -->
      <el-button
        type="primary"
        @click="saveDateSelected"
        style="margin-left: 85%"
      >
        确定
      </el-button>
    </div>

    <el-table :data="products" style="width: 100%">
      <!-- 复选框列 -->
      <el-table-column label="选择" width="60">
        <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row.selected"
            @change="updateSelected"
          ></el-checkbox>
        </template>
      </el-table-column>

      <el-table-column
        prop="name"
        label="商品名称"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="商品价格"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="category"
        label="商品分类"
        width="180"
      ></el-table-column>
      <el-table-column prop="image" label="商品图片" width="180">
        <template slot-scope="scope">
          <img
            :src="scope.row.image"
            alt="商品图片"
            style="width: 50px; height: 50px"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="danger" @click="deleteProductImg(scope.row._id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @current-change="fetchSlideshowAndProducts"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="totalProducts"
      layout="total, prev, pager, next, jumper"
      style="margin-top: 20px"
    />
  </div>
</template>

  
<script>
export default {
  data() {
    return {
      products: [],
      selectAll: false, // 用于全选的复选框状态
      currentPage: 1,
      pageSize: 10,
      totalProducts: 0,
    }
  },
  methods: {
    async fetchSlideshowAndProducts() {
      try {
        // 获取幻灯片数据
        const slideshowRes = await this.$http.get('rest/slideshow')
        console.log('请求返回:', slideshowRes)
        // 假设获取的幻灯片数据中包含 productId
        const productIds = slideshowRes.data.map((item) => item.productId) // 提取 productId
        // 如果 productIds 有数据，则调用产品列表接口
        let n = 0
        while (n < productIds.length) {
          const res = await this.$http.get(`rest/products/${productIds[n]}`)
          n++
          this.products.push(res.data)
        }
      } catch (error) {
        console.error('获取数据失败', error)
      }
    },

    async deleteProductImg(id) {
      try {
        const response = await this.$http.delete(`rest/slideshow/${id}`)
        console.log('删除响应:', response) // 打印删除结果
        this.$message.success('删除成功')
        this.products = []
        this.fetchSlideshowAndProducts() // 刷新列表
      } catch (error) {
        this.$message.error('删除失败，请重试！')
        console.error('删除轮播图时发生错误:', error)
      }
    },
    updateSelected() {
      // 当有任意单个复选框改变时，更新全选按钮的状态
      this.selectAll = this.products.every((product) => product.selected)
    },
    toggleSelectAll(val) {
      // 当全选按钮状态改变时，更新所有行的复选框状态
      this.products.forEach((product) => {
        product.selected = val
      })
    },
    async saveDateSelected() {
      try {
        console.log('准备发送请求')
        const response = await this.$http.post('rest/slideshow', this.products)
        console.log('请求返回:', response)
        this.$message.success('保存成功')
      } catch (error) {
        this.$message.error('保存失败，请重试！')
        console.error('保存失败:', error)
      }
    },
  },
  created() {
    this.fetchSlideshowAndProducts()
  },
}
</script>

  <style scoped>
/* 可以根据需要添加样式 */
</style>
  