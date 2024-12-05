<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-cascader
          v-model="model.categories"
          :options="categories"
          @change="handleCategoryChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="缩略图">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="(res) => $set(model, 'icon', res.url)"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="详情">
        <mavon-editor
          code_style="monokai-sublime"
          :ishljs="true"
          ref="mavon"
          v-model="model.body"
          @imgAdd="$imgAdd"
        ></mavon-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'ArticleForm',
  components: {
    mavonEditor,
  },
  props: {
    id: {}, // 通过路由传递的文章ID
  },
  data() {
    return {
      model: {
        title: '',
        categories: [], // 用于存储每一级别的分类数据
        icon: '',
        body: '', // 文章内容
      },
      categories: [
        {
          value: 'CPU',
          label: 'CPU',
          children: [
            {
              value: 'Intel',
              label: 'Intel',
            },
            {
              value: 'AMD',
              label: 'AMD',
            },
          ],
        },
        {
          value: 'GPU',
          label: 'GPU',
          children: [
            {
              value: 'Nvidia',
              label: 'Nvidia',
            },
            {
              value: 'Intel',
              label: 'Intel',
            },
            {
              value: 'AMD',
              label: 'AMD',
            },
          ],
        },
        {
          value: 'Apple',
          label: 'Apple',
        },
        {
          value: '协处理器',
          label: '协处理器',
        },
        {
          value: '其他',
          label: '其他',
        },
      ], // 分类列表
    }
  },
  methods: {
    async save() {
      console.log(this.model)
      try {
        // 根据是否有ID来决定是创建还是编辑
        if (this.id) {
          await this.$http.put(`/articles/${this.id}`, this.model)
        } else {
          await this.$http.post('/articles', this.model)
        }

        // 成功保存后跳转到文章列表
        this.$router.push('/dieshot/list')
        this.$message({
          type: 'success',
          message: '保存成功',
        })
      } catch (error) {
        // 请求失败时提示错误
        this.$message({
          type: 'error',
          message: '保存失败，请重试！',
        })
        console.error('保存文章时发生错误:', error)
      }
    },
    // 获取文章数据
    async fetch() {
      try {
        const res = await this.$http.get(`/articles/${this.id}`)
        this.model = res.data
      } catch (error) {
        console.error('获取文章数据失败:', error)
      }
    },
    // 获取文章分类数据
    async fetchCategories() {
      try {
        const res = await this.$http.get('/categories')
        this.categories = res.data
      } catch (error) {
        console.error('获取分类数据失败:', error)
      }
    },
    // 处理分类选择的变化，记录每个级别的选中值
    handleCategoryChange(value) {
      console.log('选择的分类值:', value)
      // 在这里你可以处理每个级别的选中值
      // `value` 是一个数组，记录了级联选择器每个级别的选中值
      this.model.categories = value
    },
    // 处理富文本编辑器中的图片上传
    $imgAdd(pos, $file) {
      const formData = new FormData()
      formData.append('file', $file)
      this.$http.post('upload', formData).then((res) => {
        this.$refs.mavon.$img2Url(pos, res.data.url)
      })
    },
  },
  created() {
    if (this.id) {
      this.fetch() // 编辑时，获取当前文章数据
    }
  },
}
</script>

<style scoped>
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
  border-radius: 50%;
}
</style>
