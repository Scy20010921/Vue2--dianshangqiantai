<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <!-- 放大右侧图片 -->
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <!-- 左侧透明：遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    handler(event) {
      let big = this.$refs.big
      let mask = this.$refs.mask;
      //event 表示当前元素的元素数据
      //offsetX表示当前元素的x轴位置
      //offsetWidth 父元素的偏移量
      //等于当前触摸的元素的x轴位置-mask盒子在父级宽度的占比/2
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2
      //约束范围
      if (left <= 0) left = 0
      if (left >= mask.offsetWidth) left = mask.offsetWidth
      if (top <= 0) top = 0
      if (top >= mask.offsetHeight) top = mask.offsetHeight
      //修改元素的left|top属性值
      mask.style.left = left + 'px';
      mask.style.top = top + 'px'
      big.style.left = -2 * left + 'px'
      big.style.top = -2 * top + 'px'
    }
  },
  props: ['skuImageList'],
  computed: {
    imgObj() {
      return this.skuImageList[this.currentIndex] || {}
    }
  },
  mounted() {
    //全局事件总线:获取兄弟组件传递过来的索引值
    this.$bus.$on('getIndex', (index) => {
      this.currentIndex = index
    })
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  //触碰显示样式
  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>