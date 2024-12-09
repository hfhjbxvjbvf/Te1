<script>
export default {
  data() {
    return {
      data: [], // 当前页数据
      page: 1, // 当前页码
      total: 0, // 总条目数
      pageSize: 10, // 每页条数
    };
  },
  methods: {
    async fetch() {
      // 根据当前页码和每页条数请求数据
      const res = await this.$http.get('/news', {
        params: {
          page: this.page,
          pageSize: this.pageSize,
        },
      });
      console.log(res.data);
      this.data = res.data.newsList;
      this.total = res.data.total;
    },
    formatDate(dateString) {
      if (!dateString) return '无日期';
      const date = new Date(dateString);
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      return date.toLocaleDateString(undefined, options);
    },
    handleSizeChange(newSize) {
      // 当每页条数发生变化时，重新加载数据
      this.pageSize = newSize;
      this.page = 1; // 重置为第一页
      this.fetch();
    },
    handleCurrentChange(newPage) {
      // 当页码发生变化时，重新加载数据
      this.page = newPage;
      this.fetch();
    },
  },
  created() {
    this.fetch(); // 初始加载数据
  },
};
</script>


<template>
  <div id="box">
    <div class="card-container">
      <el-card
        shadow="hover"
        class="card"
        v-for="(item, index) in data"
        :key="index"
      >
        <router-link :to="`/news/${item._id}`">
          <div class="news-item">
            <!-- 左边图片区域 -->
            <div class="news-image">
              <img :src="item.picture" alt="news image" class="picture" />
            </div>
            <!-- 右边文字区域 -->
            <div class="news-content">
              <h1 class="news-title">{{ item.title }}</h1>
              <h3 class="news-lead"> {{ item.lead }}</h3>
              <!-- 导语前加空格 -->
              <div class="news-meta">
                <span>作者：{{ item.author }}</span>
                <span>创建时间：{{ formatDate(item.createdAt) }}</span>
                <span>修改时间：{{ formatDate(item.updatedAt) }}</span>
              </div>
            </div>
          </div>
        </router-link>
      </el-card>
    </div>
    <!-- 分页 -->
    <el-pagination
      id="pagination"
      background
      layout="sizes, prev, pager, next, jumper, ->, total"
      :total="total"
      :page-size="pageSize"
      :current-page="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#box {
  width: 70%;
  margin: auto;
  margin-top: 65px;
}

.card-container {
  display: flex;
  flex-wrap: wrap; /* 多行排列 */
  gap: 20px; /* 卡片之间的间距 */
  justify-content: space-between; /* 平均分布 */
}

.card {
  flex: 0 0 48%; /* 每个卡片占宽度的 48% */
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 5px;
}

.news-item {
  display: flex;
  align-items: center; /* 垂直居中 */
}

.news-image {
  flex: 0 0 40%; /* 左侧占40% */
  display: flex;
  justify-content: center;
  align-items: center;
}

.news-image .picture {
  max-height: 150px;
  border-radius: 5px;
}

.news-content {
  flex: 1; /* 右侧占60% */
  padding-left: 20px;
}

.news-title {
  font-size: 1.5em;
  font-weight: bold;
  text-align: center; /* 标题居中 */
  margin-bottom: 10px;
}

.news-lead {
  font-size: 1em;
  margin: 10px 0;
  line-height: 1.5;
  text-indent: 2em; /* 导语开头空两字 */
}

.news-meta {
  display: flex;
  flex-direction: column; /* 元信息纵向排列 */
  font-size: 0.9em;
  color: #666;
  margin-top: 15px;
}

.news-meta span {
  margin-bottom: 5px;
}
#pagination{
  margin-left:33%;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
