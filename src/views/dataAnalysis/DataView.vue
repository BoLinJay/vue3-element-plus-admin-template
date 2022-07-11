<template>
<div class="box">
  <div id="main" class="echarts"></div>
  <div id="main2" class="echarts"></div>
</div>
</template>

<script setup>
import * as echarts from 'echarts';
import { getDataviewList } from '@/api/student';
// 折线图
const draw = (legend, series, xAxis) => {
var chartDom = document.getElementById('main2');
var myChart = echarts.init(chartDom);
myChart.setOption({
tooltip: {
    trigger: 'axis'
},
legend: {
    data: legend
},
grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
},
xAxis: {
    type: 'category',
    boundaryGap: false,
    data: xAxis
},
yAxis: {
    type: 'value'
},
series: series
})
}
 // 柱状图
const histogram = () => {
var myChart = echarts.init(document.getElementById('main'));
// 基于准备好的dom，初始化echarts实例
// 绘制图表
myChart.setOption({
title: {
    text: '销量'
},
tooltip: {},
xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
},
yAxis: {},
series: [
    {
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
    }
]
});
}
// 获取数据
const getdataview = () => {
    getDataviewList().then( ({data}) => {
        console.log(data);
        // legend.value = data.legend
        // series.value = data.series
        // xAxis.value = data.xAxis
        let { legend, series, xAxis } = data
        draw(legend, series, xAxis)
        histogram()
    })
    }
// 调用数据
getdataview()
   
</script>

<style lang="scss" scoped>
.box {
    display: flex;
    justify-content: space-between;
    .echarts {
    width: 50%;
    height: 400px;
    }
}
</style>