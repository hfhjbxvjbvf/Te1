<script>
export default {
  data(){
    return{
      data:[],
    }
  },
  methods: {
    async fetch(){
      const res = await this.$http.get('/news')
      this.data = res.data
      console.log(this.data)
    },
    async remove(id){
      this.$confirm('是否确定要删除这篇文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      .then(async () => {
        await this.$http.delete(`/news/${id}`)
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
        await this.fetch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        })
      })
    },
   
  },

  async created() {
    await this.fetch()
  },
}
</script>
<template>
  <el-table :data="data" stripe >
    <el-table-column label="ID" prop="_id"></el-table-column>
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
    <el-table-column label="标题" prop="title" ></el-table-column>
    <el-table-column label="作者" prop="author"></el-table-column>
    <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="$router.push(`/news/edit/${scope.row._id}`)"
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
</template>

<style>

</style>