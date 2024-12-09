<template>
    <el-form label-width="120px" @submit.native.prevent="() => save()">
      <el-form-item label="标题">
        <el-input v-model="model.title" placeholder="我是标题"></el-input>
      </el-form-item>
      <el-form-item label="导语">
        <el-input v-model="model.lead" placeholder="我是导语"></el-input>
      </el-form-item>
      <el-form-item label="缩略图">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="true"
          :on-success="(res) => $set(model, 'picture', res.url)"
        >
          <img v-if="model.picture" :src="model.picture" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="model.author"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="model.text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        model: {
          title: '',
          lead: '',
          picture: '',
          author: '',
          text: '',
        },
        id: '',
      }
    },
    methods: {
      async save() {
        try {
          if (this.id) {
            // 编辑模式，更新数据
            await this.$http.put(`/news/${this.id}`, this.model)
          } else {
            // 新建模式，提交数据
            await this.$http.post('/news', this.model)
          }
          this.$message({
            type: 'success',
            message: '保存成功',
          })
          this.$router.push('/news/list')
        } catch (error) {
          this.$message({
            type: 'error',
            message: '保存失败，请重试！',
          })
          console.error('保存文章时发生错误:', error)
        }
      },
      async fetch() {
        try {
          const res = await this.$http.get(`/news/${this.id}`)
          this.model = res.data
        } catch (error) {
          console.error('获取文章数据失败:', error)
        }
      },
    },
    created() {
      this.id = this.$route.params.id
      // 如果存在 _id，表示是编辑模式，获取数据
      if (this.id) {
        this.fetch()
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
  