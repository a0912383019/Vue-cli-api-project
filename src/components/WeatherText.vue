<template>
  <div>
    <h3><button @click="changeday(when.index - 1)">&lt;</button>
    各城市天氣預報
    <button @click="changeday(when.index + 1)">&gt;</button></h3>
    <input type="text" v-model="city" @keyup.enter="consl" placeholder="Search">

    <br><br>
    <div class="weatherdiv" v-for="(data, idx) in getdatalist" :key="idx" v-bind:class="bgfn(idx,when.index)">
      <h2>{{ data.locationName }}</h2>
      <p style="text-align: left;">
        <b>{{ data.weatherElement[0].time[when.index].startTime }}</b>
      </p> <b>~</b>
      <p style="text-align: right;">
        <b>{{ data.weatherElement[0].time[when.index].endTime }}</b>
      </p>
      <br>
      <p class="pinline">天氣氣象 : </p><p>{{data.weatherElement[0].time[when.index].parameter.parameterName}}</p>
      <p class="pinline">降雨機率 : </p><p>{{data.weatherElement[1].time[when.index].parameter.parameterName}} %</p>
      <hr style="float:none;">
      <div style="width: 100%; margin: 0;">
        <div class="temp" v-bind:class="tempbg(idx,when.index,2)">
          <p>最低溫</p>
          <hr>
          <h1>{{data.weatherElement[2].time[when.index].parameter.parameterName}} &#176;C</h1>
        </div>
        <div class="temp" v-bind:class="tempbg(idx,when.index,4)">
          <p>最高溫</p>
          <hr>
          <h1>{{data.weatherElement[4].time[when.index].parameter.parameterName}} &#176;C</h1>
        </div>
        <p style="font-size: 1.4rem;">
          {{data.weatherElement[3].time[when.index].parameter.parameterName}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import { json } from 'body-parser'
export default {
  data () {
    return {
      when: {
        index: 0
      },
      weather: [],
      city: ''
    }
  },
  methods: {
    changeday (e) {
      if (e < 0) {
        this.when.index = 2
      } else if (e > 2) {
        this.when.index = 0
      } else {
        this.when.index = e
      }
    },
    bgfn (e, b) {
      // for (let i = 0; i < 3; i++) {
      // console.log(this.weather[e].weatherElement[0].time[b].parameter.parameterName)
      // }
      const type = this.weather[e].weatherElement[0].time[b].parameter.parameterName
      if (type === '陰時多雲' || type === '多雲時陰' || type === '多雲') {
        return 'cloudy'
      } else if (type === '多雲午後短暫雷陣雨' || type === '晴午後短暫雷陣雨') {
        return 'rainy'
      } else if (type === '多雲時晴' || type === '晴時多雲') {
        return 'sunny'
      } else {
        return 'sunny'
      }
    },
    tempbg (e, b, n) {
      const temp = this.weather[e].weatherElement[n].time[b].parameter.parameterName
      // console.log(temp)
      if (temp >= 32) {
        return 'burn'
      } else if (temp < 32 && temp > 28) {
        return 'hot'
      } else {
        return 'warm'
      }
    }
  },
  mounted () {
    axios('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-FC326C8D-7E42-4B6F-ADA5-8D2B499E5912').then(res => {
      // console.log(res)
      this.weather = res.data.records.location
    }).catch(err =>
      console.log(err)
    )
  },
  computed: {
    getdatalist () {
      if (this.city === '') {
        return this.weather
      } else {
        // console.log(this.weather.filter(item => item.locationName.indexOf(this.city) > -1))
        return this.weather.filter(item => item.locationName.indexOf(this.city) > -1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.weatherdiv {
  position: relative;
  display: inline-block;
  border: 1px black solid;
  width: 350px;
  height: 420px;
  margin: 10px;
  *{
    margin-left: 10px;
    margin-right: 10px;
  }
  p{
    margin-top: 5px;
    margin-bottom: 0;
  }
  .temp{
    margin: 8px;
    width: 45%;
    height: 115px;
    border: 1px solid rgb(162, 162, 162);
    box-sizing: border-box;
    float: left;
  }
}
.pinline{
  float: left;
  text-align: left;
  margin-left: 20px;
}
.sunny{
  background: linear-gradient(rgba(251, 251, 251, 0.9), rgba(232, 232, 232, 0.6)), url('@/../public/wType/sunnycloud.gif') no-repeat 0% 10%/ contain;
  background-size: 50%;
}
.cloudy{
  background: linear-gradient(rgba(251, 251, 251, 0.9), rgba(232, 232, 232, 0.6)), url('@/../public/wType/cloudy.gif') no-repeat 0% 10%/ contain;
  background-size: 50%;
}
.rainy{
  background: linear-gradient(rgba(251, 251, 251, 0.9), rgba(232, 232, 232, 0.6)), url('@/../public/wType/rain.gif') no-repeat 0% 10%/ contain;
  background-size: 50%;
}
.burn{
  background-color: rgba(205, 2, 2, 0.893);
  color: white;
}
.hot{
  background-color: rgba(229, 115, 8, 0.913);
}
.warm{
  background-color: rgba(249, 195, 68, 0.868);
}
</style>
