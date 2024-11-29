<script>
export default {
  data() {
    return {
      isCollapse: true,
      isCollapseText: '展开',
      category: ['CPU', 'GPU', '苹果','协处理器', '其他'],
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
  <div id="box">
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
          v-for="(item, index) in data"
          :key="index"
        >
          <el-card class="card-view">
                  <div class="box-img">
                    <img :src="item.icon" class="image" />
                  </div>
                    <div class="title">{{ item.title }}</div>

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
</div>
</template>

<style lang="scss" scoped>
#box{
  margin: 0 auto;
  max-width: 90%;
}
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
.card-view {
  display: flex;
  flex-direction: column;
  margin: 20px 0px;
  height: 300px; /* 控制卡片的总高度 */
  cursor: pointer; /* 鼠标变为手型 */
}

.box-img {
  flex: 1; /* 使图片占据卡片的剩余空间 */
  display: flex;
  justify-content: flex-start; /* 使图片在上方 */
  align-items: center; /* 图片垂直居中 */
}

.image {
  width: 235px;
  height: 200px; /* 确保所有图片的高度一致 */
  object-fit: cover; /* 确保图片在宽高比不一致时裁剪 */
}
.title{
  text-align: center;
  margin-top:10px ;
}

.card-view > div {
  padding: 14px;
  flex-shrink: 0; /* 确保文字部分不压缩 */
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
