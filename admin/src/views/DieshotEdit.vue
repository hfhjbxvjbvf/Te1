<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories">
          <el-option
            v-for="(item,index) in categories"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
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
        categories:'', // 用于存储选择的分类
        icon: '',
        body: '', // 文章内容
      },
      categories: [ "CPU", "GPU", "苹果","协处理器", "其他"], // 文章分类列表
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
    // this.fetchCategories() // 获取分类数据
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
