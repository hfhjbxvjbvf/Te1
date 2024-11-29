<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}文章</h1>
    <el-form ref="form" :model="model" label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" placeholder="请选择分类">
          <el-option
            v-for="item in categories"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" required>
        <el-input v-model="model.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="缩略图">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="handleUploadSuccess"
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
        <el-button type="primary" native-type="submit" @click="save">保存</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  name: "Create",
  components: {
    mavonEditor,
  },
  props: {
    id: {},
  },
  data() {
    return {
      model: {
        categories: "",
        title: "",
        body: "",
        icon: "",
      },
      categories: ["CPU", "GPU","苹果", "协处理器", "其他"],
    };
  },
  methods: {
    async save() {
      try {
        if (!this.model.title) {
          return this.$message.error("标题不能为空");
        }
        if (!this.model.categories) {
          return this.$message.error("请选择分类");
        }
        const apiUrl = this.id ? `/articles/${this.id}` : "/articles";
        const method = this.id ? "put" : "post";
        await this.$http[method](apiUrl, this.model);
        this.$message.success("保存成功");
        this.$router.push("/articles/list");
      } catch (err) {
        console.error(err);
        this.$message.error("保存失败，请检查数据或网络");
      }
    },
    async fetch() {
      try {
        const res = await this.$http.get(`/articles/${this.id}`);
        this.model = res.data;
      } catch (err) {
        console.error(err);
        this.$message.error("加载数据失败");
      }
    },
    handleUploadSuccess(res) {
      if (res.url) {
        this.model.icon = res.url;
      } else {
        this.$message.error("上传失败");
      }
    },
    $imgAdd(pos, $file) {
      const formData = new FormData();
      formData.append("file", $file);
      this.$http.post("/upload", formData).then((res) => {
        if (res.data.url) {
          this.$refs.mavon.$img2Url(pos, res.data.url);
        } else {
          this.$message.error("图片上传失败");
        }
      });
    },
  },
  created() {
    if (this.id) {
      this.fetch();
    }
  },
};
</script>
