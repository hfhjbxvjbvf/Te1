<script>
export default {
  data() {
    return {
      isCollapse: true,
      isCollapseText: '展开',
      category: ['CPU', 'GPU', '协处理器', '其他'],
      currentCategory: '', // 用于记录当前选中的类别
      data:[],
    }
  },
  methods: {
    Operation(category) {
      this.currentCategory = category
      console.log(category)
      this.getDate(category)
    },
    // 获取数据的方法
    async getDate(category) {
      try {
        console.log(category)
        const res = await this.$http.get(`/articles?category=${category}`)
        
        console.log(res.data) // 处理获取的数据
         this.data = res.data
         console.log(this.data)
      } catch (error) {
        console.error('获取数据失败', error)
      }
    },
  },
  mounted() {
    // 初始时，获取CPU分类的数据
    this.getDate(this.category[0])
  },
}
</script>

<template>
  <div style="margin-top: 70px">
    <el-row class="tac" :gutter="20">
      <el-col :span="4">
        <el-menu default-active="0" class="el-menu-vertical-demo">
          <!-- 遍历category，绑定点击事件并传递当前分类 -->
          <el-menu-item
            v-for="(item, index) in category"
            :key="index"
            :index="String(index)"
            @click="Operation(item)"
          >
            <template slot="title">
              <span>{{ item }}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" v-if="data.length>0">
        <el-col
          :xs="12"
          :sm="8"
          :md="6"
          :lg="5"
          :xl="1"
          v-for="(item, index) in data"
          :key="index"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img
              :src="item.icon"
              class="image"
            />
            <div style="padding: 14px">
              <span>{{ item.title }}</span>
            </div>
          </el-card>
        </el-col>
      </el-col>
      <el-col :span="20" v-else>
        <div style="text-align: center; margin-top: 100px">
          抱歉，暂时还没有该分类的图片
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  height: 100%;
}
#right-box {
  width: 100px;
  height: 100px;
  background: #000;
  position: absolute;
  right: 0px;
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
