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
      <transition name="slide">
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
          >
            <router-link :to="subItem.link">{{ subItem.text }}</router-link>
          </div>
        </div>
      </transition>

      <div class="play pl-5">
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

      <!-- 汉堡菜单按钮 -->
      <div class="menu-button" @click="isShowMenu = !isShowMenu">
        <i class="iconfont icon-menu"></i>
      </div>

      <!-- 在手机端显示的菜单 -->
      <div v-if="isShowMenu" class="mobile-menu">
        <div
          v-for="item in items"
          :key="item.text"
          class="nav-item"
          @click="toggleSubMenu(item.text)"
        >
          <router-link :to="item.link" style="color: aqua;">{{ item.text }}</router-link>
          <transition name="slide">
            <div v-show="activeSubMenu === item.text" class="sub-menu">
              <div
                v-for="subItem in productSubItems"
                :key="subItem.text"
                class="sub-item"
              >
                <router-link :to="subItem.link">{{ subItem.text }}</router-link>
              </div>
            </div>
          </transition>
        </div>
      </div>
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
        { text: '产品', link: '/product' },
        { text: '留言', link: '/message' },
        { text: '关于', link: '/about' },
      ],
      productSubItems: [
        { text: '手机', link: '/product/mobile' },
        { text: '笔记本', link: '/product/laptop' },
        { text: '平板', link: '/product/tablet' },
      ],
    };
  },
  mounted() {
    this.ajustNavigation();
    window.addEventListener('scroll', this.ajustNavigation);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.ajustNavigation);
  },
  methods: {
    ajustNavigation() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      this.isScrolling = scrollTop > 0;
    },
    toggleSubMenu(itemText) {
      this.activeSubMenu = this.activeSubMenu === itemText ? '' : itemText;
    },
    hideSubMenu() {
      this.activeSubMenu = '';
    },
    hoverSubItem(subItemText) {
      this.hoveredSubItem = subItemText;
    },
    playMusic(play) {
      this.isPlay = !this.isPlay;
      if (play) {
        this.$refs.music.play();
        return;
      }
      this.$refs.music.pause();
    },
  },
};
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
}

.mini {
  background-color: map-get($colors, 'navcolor');
  height: 56px;
  transition: 0.5s ease-in-out;
}

/* 产品二级菜单的样式 */
.sub-menu {
  position: absolute;
  top: 65px; /* 使其在一级菜单下方 */
  left: 0; /* 对齐到左边 */
  background-color: map-get($colors, 'navcolor'); /* 背景颜色与一级导航相同 */
  width: 100%; /* 宽度与一级导航相同 */
  border: none; /* 去掉边框 */
  display: flex;
  flex-direction: row; /* 横向排列 */
  padding: 10px 0; /* 上下内边距 */
  transition: transform 0.3s ease, opacity 0.3s ease; /* 添加过渡动画 */
  transform: translateY(-20px); /* 初始位置 */
  opacity: 0; /* 初始透明度 */
}

.sub-menu-enter-active,
.sub-menu-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.sub-menu-enter,
.sub-menu-leave-to {
  transform: translateY(0); /* 进入动画 */
  opacity: 1; /* 进入时可见 */
}

.sub-item {
  padding: 10px 20px; /* 添加左右内边距 */
  font-size: 14px;
  transition: background-color 0.3s;
  cursor: pointer;
}

.sub-item.hovered {
  background-color: map-get($colors, 'red'); /* 悬停时背景色 */
  color: #fff; /* 悬停时文字颜色 */
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

.mobile-menu {
  position: absolute;
  top: 65px; /* 根据需要调整 */
  left: 0;
  background-color: #fff;
  width: 100%;
  height: 20px;
  border: 1px solid #ddd;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
}

@media screen and (max-width: 650px) {
  .nav-item {
    display: none; /* 隐藏一级导航 */
  }
  .play {
    display: none; /* 隐藏音乐播放控件 */
  }
  .menu-button {
    display: block; /* 显示汉堡菜单 */
    margin-left: 120px;
  }
}
</style>
