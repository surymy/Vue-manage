<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg"/>
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：2022年6月29日 22:34:11</p >
          <p>上次登陆地点：广西省 桂林市</p>
        </div>
      </el-card>

      <el-card style="margin-top:20px; height:455px" shadow="hover">
        <el-table :data='tableData'>
          <el-table-column 
          v-for="(val, index) in tableLabel" 
          :key="index" 
          :prop="index" 
          :label="val">
        </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <el-col style="margin-top: 20px;" :span="16">
      
      <div class="num">
        <el-card calss='card' shadow="hover" v-for="item in countData" :key="item.name" :body-style="{ display:'flex', padding: 0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color}"></i>
          <div class="detail">
            <p class="nums">￥{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>

      <el-card style="height: 280px" shadow="hover">
        <div style="height: 280px" ref='echarts'></div>
      </el-card>
      
      <div class="graph" style="margin-top: 20px;display: flex;justify-content: space-between;">
        <el-card style="height: 260px;width: 48%;" shadow="hover">
          <div style="height: 240px" ref="userEcharts"></div>
        </el-card>

        <el-card style="height: 260px;width: 48%;" shadow="hover">
          <div style="height: 240px" ref="videoEcharts"></div>
        </el-card>
      </div>

    </el-col>
  </el-row>
</template>

<script>
import {getData} from '../../api/data.js'
import * as echarts from 'echarts'

export default {
  name: "Main",
  data() {
    return {
      userImg: require('../assets/images/user.jpg'),
      tableData: [
      
      ],
      tableLabel: {
        name: '品牌',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    }
  },
  mounted() {
    getData().then(response => {
      const {code, data} = response
      if(code === 20000) {
        this.tableData = data.tableData // 表格数据

        // 折线图

        const order = data.orderData
        const xDate = order.date
        const keyArray =  Object.keys(order.data[0])  //取出key值
        const series = []
        keyArray.forEach(key => {
          series.push({
            name: key,
            data: order.data.map(item => item[key]),
            type: 'line'
          })
        })

        const option = {
          xAxis: {
            data : xDate
          },
          yAxis: {
          
          },
          legend: {
            data: keyArray
          },
          series 
        }

        const E = echarts.init(this.$refs.echarts)
        E.setOption(option)  
        
        // 柱状图

        const userOption = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
            data: ['新增用户', '活跃用户']
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: data.userData.map(item => item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name: '新增用户',
              data: data.userData.map(item => item.new),
              type: 'bar'
            },
            {
              name: '活跃用户',
              data: data.userData.map(item => item.active),
              type: 'bar'
            }
          ],
        }
        const U = echarts.init(this.$refs.userEcharts)
        U.setOption(userOption)
        
        // 饼状图

        const videoOption = {
          tooltip: {
             trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              data: data.videoData,
              type: 'pie'
            }
          ],
        }

        const V = echarts.init(this.$refs.videoEcharts)
        V.setOption(videoOption)
      }
      console.log('@',data)
    })
  }
}
</script>

<style>

</style>