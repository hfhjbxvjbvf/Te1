<template>
  <header
    class="head nav d-flex jc-around ai-center"
    :class="isScrolling ? `mini` : ''"
  >
    <div class="hand">
      <router-link tag="div" to="/">
        <img
          src="../assets/images/cropped-logo.png"
          height="42"
          class="main-img"
        />
      </router-link>
    </div>
    <div class="d-flex text-white hand">
      <div
        v-for="item in items"
        :key="item.text"
        @click="toggleSubMenu(item.text)"
        class="nav-item px-5 icon"
      >
        <router-link :to="item.link">
          {{ item.text }}
        </router-link>
      </div>

      <!-- 产品二级分类 -->
      <div
        v-show="activeSubMenu === '产品'"
        class="sub-menu"
        @mouseleave="hideSubMenu"
      >
        <div
          v-for="subItem in productSubItems"
          :key="subItem.text"
          class="sub-item"
          @mouseover="hoverSubItem(subItem.text)"
          @mouseleave="hoverSubItem('')"
          :class="{ hovered: hoveredSubItem === subItem.text }"
        >
          <router-link :to="subItem.link">{{ subItem.text }}</router-link>
        </div>
      </div>

      <div class="play pl-5">
        <!-- 音乐播放相关代码保持不变 -->
        <i
          v-show="!isPlay"
          active-class="active"
          class="iconfont icon-music-o nav-item"
          @click="playMusic(true)"
        ></i>
        <i
          v-show="isPlay"
          active-class="active"
          class="iconfont icon-Pause1 nav-item"
          @click="playMusic(false)"
        ></i>
      </div>
      <div v-show="isPlay">
        <audio
          id="music"
          ref="music"
          src="https://miqilin-blog.oss-cn-shenzhen.aliyuncs.com/Prospect.mp3"
          loop
        ></audio>
      </div>
      <!-- 省略其他部分代码 -->
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isShowMenu: false,
      isPlay: false,
      isScrolling: false,
      activeSubMenu: '', // 控制显示的二级菜单
      hoveredSubItem: '', // 记录当前悬停的二级分类
      items: [
        { text: '首页', link: '/' },
        { text: 'Dieshot', link: '/tags' },
        { text: '产品', link: '/product' }, // 产品分类
        { text: '留言', link: '/message' },
        { text: '关于', link: '/about' },
      ],
      productSubItems: [
        { text: '手机', link: '/product/mobile' },
        { text: '笔记本', link: '/product/laptop' },
        { text: '平板', link: '/product/tablet' },
      ], // 产品下的二级分类
    }
  },
  mounted() {
    this.ajustNavigation()
    window.addEventListener('scroll', this.ajustNavigation)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.ajustNavigation)
  },
  methods: {
    ajustNavigation() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      this.isScrolling = scrollTop > 0
    },
    toggleSubMenu(itemText) {
      console.log('点击了', itemText)
      // 如果点击的是“产品”，显示二级分类
      this.activeSubMenu = this.activeSubMenu === itemText ? '' : itemText
      console.log('当前显示的二级菜单：', this.activeSubMenu)
    },
    hideSubMenu() {
      console.log('离开了')
      // 鼠标离开时隐藏二级分类
      this.activeSubMenu = ''
    },
    hoverSubItem(subItemText) {
      // 当鼠标悬停时记录二级分类名称
      this.hoveredSubItem = subItemText
    },
    playMusic(play) {
      this.isPlay = !this.isPlay
      if (play) {
        this.$refs.music.play()
        return
      }
      this.$refs.music.pause()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/style.scss';

.nav-item.active {
  color: map-get($colors, 'red');
}

.nav-item:hover {
  color: map-get($colors, 'red');
}

.head {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  display: relative;
  height: 65px;
  background-color: transparent;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.5);
  transition: 0.5s ease-in-out;
  .icon-music-o {
    font-size: 19px;
  }
  .icon-Pause1 {
    font-size: 19px;
  }
}

.mini {
  background-color: map-get($colors, 'navcolor');
  height: 56px;
  transition: 0.5s ease-in-out;
}

/* 产品二级菜单的样式 */
.sub-menu {
  position: absolute;
  top: 65px;
  background-color: #fff;
  width: 200px;
  border: 1px solid #ddd;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}

.sub-item {
  padding: 10px;
  font-size: 14px;
  transition: background-color 0.3s;
  cursor: pointer;
}

.sub-item.hovered {
  background-color: map-get($colors, 'navcolor');
  color: #fff;
}

.menu-button {
  border: none;
  display: none;
  i {
    display: block;
    width: 24px;
    height: 3px;
    background-color: #fff;
    margin: 5px auto;
    transition: 0.2s ease-in-out;
  }
}
.el-dropdown-link {
  cursor: pointer;
}

@media screen and (max-width: 650px) {
  .nav-item {
    display: none;
  }
  .play {
    display: none;
  }
  .menu-button {
    display: block;
    margin-left: 120px;
  }
}
</style>
