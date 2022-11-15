<template>
  <div>
    <!-- 商品分类三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread:面包屑,带有x的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <!-- 关键词的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="removeTrademark">×</i></li>
            <!-- 平台售卖的面包屑 -->
            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">{{attrValue.split(":")[1]}}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector:子组件-->
        <SearchSelector @tradeMatkInfo="tradeMatkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <!-- 排序的结构 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 价格结构 -->
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOreder('1')">
                  <a>综合<span v-show="isOne" class="iconfont" :class="{'icon-arrowdown':isDesc,'icon-arrowup':isAsc}"></span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOreder('2')">
                  <a>价格<span v-show="isTwo" class="iconfont" :class="{'icon-arrowdown':isDesc,'icon-arrowup':isAsc}"></span></a>
                </li>

              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good,index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"><img :src="good.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> {{good.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html">{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bor btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bor">收藏</a>
                  </div>
                </div>
              </li>

            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="1" :pageSize="3" :total="91" :continues="5"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import SearchSelector from './SearchSelector/SearchSelector'
export default {
  name: 'Search',
  components: {
    SearchSelector
  },
  data() {
    return {
      //带给服务器参数
      searchParams: {
        //一级分类的id
        category1Id: '',
        //二级分类的id
        category2Id: '',
        //三级分类的id
        category3Id: '',
        //分类名字
        categoryName: '',
        //关键词
        keyword: "",
        //排序:初始的状态应该是综合|降序
        order: "1:desc",
        //分页器用的参数,代表的是当前第几页
        pageNo: 1,
        //代表的是每一个展示数据的个数
        pageSize: 10,
        //平台售卖属性操作带的参数
        props: [],
        //品牌
        trademark: ""

      }
    }
  },
  //当组件挂载完毕之前执行一次【先于mounted之前】
  beforeMount() {
    // this.searchParams.category1Id = this.$route.query.category1Id;
    // this.searchParams.category2Id = this.$route.query.category2Id;
    // this.searchParams.category3Id = this.$route.query.category3Id;
    // this.searchParams.categoryName = this.$route.query.categoryName
    // this.searchParams.keyword = this.$route.params.keyword;
    //Object.assign:Es6新增的语法,合并对象
    // 在发起请求之前,把接口需要传递参数,进行整理(在给服务器发请求之前,把参数整理好,服务器就会返回查询的数据)
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  //组件挂载完毕执行一次【仅仅执行一次】
  mounted() {
    //在发请求之前带给服务器参数【searchParams参数发生变化有数值带给服务器】
    this.getaDate()
    //先测试接口返回的数据格式
    // this.$store.dispatch('getSearchList', {})
  },
  methods: {
    //向服务器发请求获取search模块数据(根据参数不同的数据进行展示)
    //把这次请求封装成一个函数:当你需要在调用的时候调用即可
    getaDate() {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    //删除分类的名字
    removeCategoryName() {
      // 把带给服务器的参数置空了,还需要向服务器发起请求
      // 带给服务器的参数说明都是可有可无的:如果属性值为空的字符串还是会把相应的字段带给服务器
      // 但是你把相应的字段变为undefined,当前这个字段不会带给服务器
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.getaDate();
      //地址栏也需要修改,进行路由跳转(现在的路由跳转只是跳转到自己这里)
      //严谨:本意是删除query,如果路径当中出现params不应该删除,路由跳转的时候应该带着
      //如果没有params参数 可以直接跳转路由 this.$router.push({name:"search"})
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params })
      } else {
        this.$router.push({ name: "search" })
      }
    },
    //删除关键词
    removeKeyword() {
      this.searchParams.keyword = undefined
      this.getaDate();
      //通知兄弟组件Header清除关键词
      this.$bus.$emit("clear")
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query })
      } else {
        this.$router.push({ name: "search" })
      }
    },
    //删除品牌
    removeTrademark() {
      //将品牌信息置空 再次发起请求
      this.searchParams.trademark = undefined
      this.getaDate();
    },
    //删除平台售卖
    removeAttr(index) {
      this.searchParams.props.splice(index, 1)
      this.getaDate()
    },
    //自定义事件回调 收集品牌
    tradeMatkInfo(trademark) {
      //1.整理品牌字段的参数 "ID：品牌"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      this.getaDate()
      console.log(this.searchParams);
    },
    //收集平台属性的地方的回调函数(自定义事件)
    attrInfo(attr, attrValue) {
      // ["属性ID:属性值:属性名"]
      // console.log(attr, attrValue);
      // 参数格式整理
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      //数组去重
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props)
      }
      //再次发起请求
      this.getaDate()
    },
    //排序的操作
    changeOreder(flag) {
      //flag形参:它是一个标记,代表用户点击的是综合(1)价格(2) [用户点击的时候传递进来的]
      // let originOrder = this.searchParams.order;  //拿到数据 初始值order: "1:desc",
      //这里获取到的是最开始的状态
      let originFlag = this.searchParams.order.split(':')[0] //默认为1
      let orginSort = this.searchParams.order.split(':')[1] //默认为desc
      //准备一个新的order属性值
      let newOrder = ''
      //点击的是综合  
      if (flag == originFlag) {       //如果点击的是1则true 否则为true
        newOrder = `${originFlag}:${orginSort == "desc" ? "asc" : "desc"}`; //则返回1:
        console.log(newOrder);
      } else {
        //点击的是价格
        newOrder = `${flag}:${'desc'}`;
      }
      this.searchParams.order = newOrder
      this.getaDate();
    }

  },
  computed: {
    // ...mapState({
    //   goodsList: state => state.search.searchList.goodsList
    // })
    //mapGetters里面的写法,传递的是数组,因为getters计算是没有划分模块【home,search】
    ...mapGetters(['goodsList']),
    isOne() {
      return this.searchParams.order.indexOf('1') != -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') != -1
    },
    isAsc() {
      return this.searchParams.order.indexOf('asc') != -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') != -1
    }
  },
  //数据监听:监听组件实例身上的属性的属性值变化
  watch: {
    //监听路由的信息,是否发送变化
    $route(newValue, oldValue) {
      //再次发请求之前再次整理带给服务器的参数
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      // 再次发请求ajax请求
      this.getaDate()
      //每一次请求完毕,应该把相应的1、2、3级分类的id置空的,让他接受下一次的相应1、2、3级id

      console.log(this.searchParams)
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bor {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>