<script>
export default {
  data() {
    return {
      isCollapse: true,
      isCollapseText: "展开",
      categories: [
        {
          name: "CPU",
          children: ["Intel", "AMD"],
        },
        {
          name: "GPU",
          children: ["Nvidia", "Intel", "AMD"],
        },
        {
          name: "Apple",
          children: [],
        },
        {
          name: "协处理器",
          children: [],
        },
        {
          name: "其他",
          children: [],
        },
      ],
      currentCategory: "", // 当前选中的类别
      currentSubCategory: "", // 当前选中的子类别
      data: [],
    };
  },
  methods: {
    // 处理菜单点击
    handleMenuClick(parent, child) {
      if (child) {
        this.currentCategory = parent;
        this.currentSubCategory = child;
        this.Operation([parent, child]);
      } else {
        this.currentCategory = parent;
        this.currentSubCategory = "";
        this.Operation([parent]);
      }
    },
    // 获取数据
    async getDate(category) {
      try {
        console.log(category);
        const res = await this.$http.get('/dieshot', { params: { category: category } });
        this.data = res.data;
        console.log(this.data);
      } catch (error) {
        console.error("获取数据失败", error);
      }
    },
    // 处理操作
    Operation(category) {
      this.getDate(category);
    },
  },
  mounted() {
    // 加载默认数据
    this.getDate(["CPU","Intel"]);
  },
};
</script>

<template>
  <div id="box">
    <div style="margin-top: 70px">
      <el-row class="tac" :gutter="20">
        <!-- 左侧导航栏 -->
        <el-col :span="4">
          <h5>dieshot导航栏</h5>
          <el-menu default-active="0" class="el-menu-vertical-demo">
            <el-submenu
              v-for="(category, index) in categories"
              :key="index"
              :index="String(index)"
            >
              <template slot="title">
                <span>{{ category.name }}</span>
              </template>
              <!-- 子选项 -->
              <el-menu-item
                v-for="(child, childIndex) in category.children"
                :key="childIndex"
                :index="`${index}-${childIndex}`"
                @click="handleMenuClick(category.name, child)"
              >
                {{ child }}
              </el-menu-item>
              <!-- 如果没有子选项，父级可直接点击 -->
              <el-menu-item
                v-if="category.children.length === 0"
                :index="`${index}-parent`"
                @click="handleMenuClick(category.name)"
              >
                {{ category.name }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>

        <!-- 右侧内容 -->
        <el-col :span="20" v-if="data.length > 0">
          <el-col
            :xs="12"
            :sm="8"
            :md="6"
            :lg="5"
            v-for="(item, index) in data"
            :key="index"
          >
            <el-card class="card-view">
              <router-link :to="`/dieshot/${item._id}`">
                <div class="box-img">
                  <img :src="item.picture.picture_360p" class="image" />
                </div>
                <div class="title">{{ item.title }}</div>
              </router-link>
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
#box {
  margin: 0 auto;
  max-width: 90%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  height: 100%;
}

.el-menu-item {
  white-space: nowrap; /* 防止溢出 */
}

.el-menu-item:hover {
  background-color: #f5f5f5; /* 修改鼠标悬浮背景色 */
}

.card-view {
  display: flex;
  flex-direction: column;
  margin: 20px 0px;
  height: 300px; /* 控制卡片的总高度 */
  cursor: pointer;
}

.box-img {
  flex: 1; /* 使图片占据卡片的剩余空间 */
  display: flex;
  justify-content: flex-start; /* 使图片在上方 */
  align-items: center; /* 图片垂直居中 */
}

.image {
  width: 210px;
  height: 200px; /* 确保所有图片的高度一致 */
  object-fit: cover; /* 确保图片在宽高比不一致时裁剪 */
}

.title {
  text-align: center;
  margin-top: 10px;
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