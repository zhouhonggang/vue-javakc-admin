<template>

  <!-- 报表显示区域 -->
  <div id="userChart" style="width: 100%;height: 440px"></div>

</template>

<script>
  let that
  //引入echarts报表工具
  import echarts from 'echarts'
  export default {
    name: 'UserChar',
    data() {
      return {
        chart: null,
        xdata: [],
        ydata: []
      }
    },
    beforeCreate: function () {
      that = this;
    },
    methods: {
      init() {
        //初始化报表对象
        this.chart = echarts.init(document.getElementById('userChart'))

        //查询报表数据
        that.axios.get('/system/user/chart')
          .then(result => {
            {
              //配置报表参数信息
              let option = {
                title: {
                  text: '用户增长趋势图',
                  subtext: '系统用户增长趋势'
                },
                xAxis: {
                  type: 'category',
                  data: result.data.xdata
                },
                yAxis: {
                  type: 'value'
                },
                series: [{
                  data: result.data.ydata,
                  type: 'line'
                }],
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'shadow'
                  },
                },
                toolbox: {
                  show: true,
                  showTitle: false, // 隐藏默认文字，否则两者位置会重叠
                  feature: {
                    saveAsImage: {
                      show: true,
                      title: '保存为图片'
                    },
                    dataView: {
                      show: true,
                      title: 'Data View'
                    },
                  },
                  tooltip: { // 和 option.tooltip 的配置项相同
                    show: true,
                    formatter: function (param) {
                      return '<div>' + param.title + '</div>'; // 自定义的 DOM 结构
                    },
                    backgroundColor: '#222',
                    textStyle: {
                      fontSize: 12,
                    },
                    extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);' // 自定义的 CSS 样式
                  }
                },
              };
              this.chart.setOption(option)
            }
          })
          .catch(error => (console.log(error)))
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style scoped>
  #userChart {
    margin:35px auto auto auto;
  }
</style>
