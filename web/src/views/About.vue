<template>
  <div
    class="main-container page-about d-flex flex-column ai-center pt-9 content"
  >
    <div class="page p-5">
      <div class="text-green fs-xxxxl">About</div>
      <div class="text-grey-2 fs-sm mt-5">Published on March 10th 2024</div>
      <div class="mt-5 mb-5"></div>
      <div class="py-4">
        <span class="fs-xxl text-green">#</span>
        &nbsp;
        <span class="fs-xxl text-grey-1">关于自己</span>
      </div>
      <div class="pl-5 text-green-1">
        <!-- <p>• 转行半吊子前端一枚，目前📍：杭州</p>
        <p>• 未来希望成为一名优秀的前端程序🐵</p>
        <p>• 业余爱好比较多，喜欢烹饪、烘焙、音乐制作、踢⚽等等</p> -->
      </div>
      <div class="py-4">
        <span class="fs-xxl text-green">#</span>
        &nbsp;
        <span class="fs-xxl text-grey-1">关于博客</span>
      </div>
      <div class="pl-5 text-green-1">
        <!-- <p>
          •
          该博客用Vue实现，express提供数据接口，mongoDB储存数据，部署在腾讯云或阿里云的linux服务器上，搭建博客的初衷是希望把自己平常工作学习生活中值得记录的东西记录下来
        </p>
        <p>• 如有错误、bug的地方烦请指正</p> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/style.scss';
.content {
  line-height: 1.8 !important;
}

.bd-bottom-about {
  border-bottom: 1px solid grey;
  &.bd-bottom-about:hover {
    color: map-get($colors, 'red');
  }
}
</style>
