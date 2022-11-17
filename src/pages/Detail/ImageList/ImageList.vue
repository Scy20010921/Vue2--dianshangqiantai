<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide,index) in skuImageList" :key="slide.id">
        <img :src="slide.imgUrl" :class="{active:currentIndex===index} " @click="changCurrentIndex(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

import Swiper from 'swiper'
export default {
  name: "ImageList",
  data() {
    return {
      currentIndex: -1
    }
  },
  props: ['skuImageList'],
  watch: {
    //监听数据:可以保证数据一定ok,但是不能保证v-for遍历结构是否完事
    skuImageList: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          new Swiper('.swiper-container', {
            direction: "horizontal",
            loop: true,
            //显示几个图片设置
            slidesPerView: 3,
            //每一次切换图片的个数
            slidesPerGroup: 1,
            // pagination: {
            //   el: ".swiper-pagination",
            //   //分页器类型
            //   type: "bullets",
            //   //点击分页器，切换轮播
            //   clickable: true,
            // },
            //自动轮播
            // autoplay: {
            //   delay: 3000,
            //   //新版本的写法：目前是5版本
            //   // pauseOnMouseEnter: true,
            //   //如果设置为true，当切换到最后一个slide时停止自动切换
            //   stopOnLastSlide: true,
            //   //用户操作swiper之后，是否禁止autoplay
            //   disableOnInteraction: true,
            // },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            //切换效果
            // effect: "cube",
          });
        })
      }

    }

  },
  methods: {
    changCurrentIndex(index) {
      //通知兄弟组件,当前的索引值为几
      this.currentIndex = index
      this.$bus.$emit('getIndex', this.currentIndex)

    }
  },
  computed: {

  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>