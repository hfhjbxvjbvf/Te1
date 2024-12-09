<script>
export default {
  data() {
    return {
      data: {
        title: '',
        lead: '',
        author: '',
        picture: '',
        text: '',
        updatedAt: '',
      },
    }
  },
  methods: {
    async fetch(id) {
      try {
        const res = await this.$http.get(`news/${id}`)
        console.log(res.data)
        this.data = res.data
      } catch (err) {
        console.error('获取新闻数据失败', err)
      }
    },
    formatDate(dateString) {
      if (!dateString) return '无日期'
      const date = new Date(dateString)
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }
      return date.toLocaleDateString(undefined, options)
    },
  },
  async created() {
    const id = this.$route.params.id
    await this.fetch(id)
  },
}
</script>

<template>
  <div id="news-detail">
    <!-- 标题 -->
    <h1 class="news-title">{{ data.title }}</h1>

    <!-- 作者信息 -->
    <div class="news-meta">
      <span>作者：{{ data.author }}</span>
    </div>

    <!-- 导语 -->
    <p class="news-lead"> {{ data.lead }}</p>
    <!-- 导语开头加空格 -->

    <!-- 图片 -->
    <div class="news-image">
      <img :src="data.picture" alt="news image" />
    </div>

    <!-- 正文 -->
    <div class="news-content">
      <p>{{ data.text }}</p>
    </div>

    <!-- 修改时间 -->
    <div class="news-updated">
      <span>最后修改时间：{{ formatDate(data.updatedAt) }}</span>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#news-detail {
  width: 70%;
  margin: auto;
  margin-top: 65px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

.news-title {
  text-align: center;
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
}

.news-meta {
  text-align: center;
  font-size: 0.9em;
  color: #666;
  margin-bottom: 15px;
}

.news-lead {
  font-size: 1.2em;
  margin-bottom: 20px;
  text-indent: 2em; /* 首行缩进 */
}

.news-image {
  text-align: center;
  margin-bottom: 20px;
}

.news-image img {
  max-width: 100%;
  border-radius: 10px;
}

.news-content {
  font-size: 1em;
  margin-bottom: 20px;
}

.news-content p {
  margin-bottom: 15px; /* 每段正文之间的间距 */
}

.news-updated {
  text-align: right;
  font-size: 0.9em;
  color: #666;
  margin-top: 20px;
}
</style>
