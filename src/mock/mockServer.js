//先引入mockjs模块
import Mock from 'mockjs'
//把JSON数据格式引入进来
//Webpack默认对外暴露的:图片、JSON数据格式
import banner from './banners.json'
import floor from './floors.json'

Mock.mock('/mock/banner', { code: 200, data: banner }) //模拟首页大的轮播图的数据
Mock.mock('/mock/floor', { code: 200, data: floor }) //
