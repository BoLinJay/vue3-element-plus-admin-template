<template>
  <div id="main"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import chinaMapJson from '@/map/china.json'
import { nextTick } from 'vue';
const chinaMap = () => {
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
                    shadowColor: 'rgb(58, 115, 192)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                },
                emphasis: {
                    areaColor: 'rgb(46, 229, 206)',
                    borderWidth: 0.1
                },
              
            },
            
                
        }
    })
}

nextTick(() => {
    chinaMap()
})
</script>

<style lang="scss" scoped>
#main {
    width: 100%;
    height: 100%;
}
</style>