<template>
  <div>
    <h1>dieshot列表</h1>
    <el-form>
      <el-form-item label="所属分类">
        <el-cascader
          v-model="categoriVules"
          :options="categories"
          @change="handleCategoryChange"
        ></el-cascader>
        <el-button type="primary" @click="fetch">筛选</el-button>
      </el-form-item>
    </el-form>
    
    
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createdAt | date('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="最后更新时间">
        <template slot-scope="scope">
          {{ scope.row.updatedAt | date('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="$router.push(`/dieshot/edit/${scope.row._id}`)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
            @click="remove(scope.row._id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
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
      categoriVules: [],
    }
  },
  methods: {
    //筛选
    async fetch(){
      const res = await this.$http.get('/articles',{params:{category:this.categoriVules}})
      console.log("输出",res)
      this.items = res.data
    },
    remove(id) {
      this.$confirm('是否确定要删除这篇文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await this.$http.delete(`/articles/${id}`)
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          await this.fetch()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
     // 处理分类选择的变化，记录每个级别的选中值
     handleCategoryChange(value) {
      console.log('选择的分类值:', value)
      this.categoriVules = value
    },
    
    
  },
  created() {
    this.fetch()
  },
}
</script>
