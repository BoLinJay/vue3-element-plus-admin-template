<template>
  <div id="main"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import chinaMapJson from '@/map/china.json'
import { nextTick, onMounted } from 'vue';
import { getTravelMapList } from '@/api/student';
const GetList = () => {
    getTravelMapList().then( data => {
        console.log(data);
        let { points, linesData } = data.data
        chinaMap(points, linesData)
    })
}
const chinaMap = (points, linesData) => {
    echarts.registerMap('china', chinaMapJson );
    var chart = echarts.init(document.getElementById('main'));
    chart.setOption({
        geo:{
            map: 'china',
            zoom: 1.1,
            roam: true,
            scaleLimit: {
                min:1.1,
                max: 5
            },
            label: {
                normal: {
                    show: true,
                    textStyle:{
                        color: '#1DE9B6'
                    }
                },
                emphasis: {
                    textStyle: {
                        color: 'rgb(183, 185, 14)'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    areaColor: {
                        type: 'redial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.8,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgb(31, 54, 150)'
                            },
                            {
                                offset: 1,
                                color: 'rgb(89, 128, 142)'
                            }
                        ],
                        globalCoord: true
                    },
                },
                emphasis: {
                    areaColor: 'rgb(46, 229, 206)',
                    borderWidth: 0.1
                },
              
            },
        },
        series: [
            {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                showEffectOn: 'render',
                symbolSize: 10,
                zelvel: 1,
                data: points,
                rippleEffect: {
                    period: 15,
                    scale: 4,
                    brushType: 'fill'
                }
            },
            {
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 4,
                    stmbol: 'arrow',
                    symbolSize: 7,
                    trailLength: 0.4
                },
                lineStyle: {
                    normal: {
                        color: '#1DE9B6',
                        width: 1,
                        opacity: 0.1,
                        curveness: 0.9
                    }
                },
                data: linesData
            }
        ]
        
    })
}
onMounted(() => {
    GetList()
})
</script>

<style lang="scss" scoped>
#main {
    width: 100%;
    height: 100%;
}
</style>