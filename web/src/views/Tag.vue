<script>
import dayjs from 'dayjs'
export default {
  data() {
    return {
      model: [],
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('/tags')
      console.log(res.data)
      this.model = res.data
    },
    getDataHover(val) {
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  mounted() {
    this.fetch()
  },
}
</script>

<template>
  <div class="main-container" v-if="model">
    <div class="main-content archive-page">
      <div class="post-title text-green fs-xxxxl">
        标签分类的博文--点击自动查找相应`Tag`
      </div>
      <div class="text-grey-2 fs-sm mt-6">Published on March 10th 2024</div>
      <div>
        <div class="post-tags">
          <a v-for="item in model" :key="item._id" :href="`#${item._id}`">
            {{ item._id }}
            <span>({{ item.count }})个</span>
          </a>
        </div>
      </div>
    </div>
    <div class="main-content archive-page">
      <div v-for="item in model" :key="item._id" :id="`${item._id}`" class="post-lists anchor">
        <div>
          <div class="categorys-title">{{ item._id }} : {{ item.count }}</div>
          <div v-for="tag in item.list" :key="tag.categories._id" class="post-list-item">
            <el-card :body-style="{ padding: '0px' }">
              <router-link :data-hover="`${tag.categories.title}`" :to="`/article/list/${tag.categories._id}`">
                <img :src="tag.categories.icon" class="image" />
                <div style="padding: 14px">
                  <div class="bottom clearfix">
                    <span>{{ tag.categories.title }}</span>
                    <div class="bottom clearfix">
                      <time class="time">
                        {{ tag.categories.createdAt.slice(0, 10) }}
                      </time>
                      <el-button type="text" class="button">
                        {{ item._id }}
                      </el-button>
                    </div>
                  </div>
                </div>
              </router-link>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.main-container {
  padding: 20px;
}

.post-tags {
  margin: 0;
  padding: 5px 0 20px;
  border-bottom: 1px solid #767676;

  a {
    font-size: 13px;
    font-weight: 600;
    display: inline-block;
    margin: 20px 8px 10px 0;
    padding: 5px 15px;
    color: #fff;
    border-radius: 15px;
    background: #6fa3ef;

    &:nth-child(2n) {
      background: #ff9800;
    }

    &:nth-child(3n) {
      background: #46c47c;
    }

    &:nth-child(4n) {
      background: #f9bb3c;
    }

    &:nth-child(5n) {
      background: #bc99c4;
    }

    &:nth-child(6n) {
      background: #e8583d;
    }
  }
}

.anchor {
  margin-top: -80px;
  padding-top: 80px;
}

.post-list-item-container {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin: 20px 0;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
}

.item-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

.item-image {
  img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 10px;
  }
}

.item-meta {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
}

.item-meta-date {
  color: #999;
}

.item-meta-tag {
  color: #007bff;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
</style>
