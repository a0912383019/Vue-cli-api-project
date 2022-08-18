<template>
  <div>
    <h2>臺中市轄屬非營利幼兒園名</h2>

    <ul>
      <h5>我的最愛</h5>
      <li v-for="(n,i) in heartlist" :key="i" v-show="heartlist[i]" style="list-style: none;">
        {{nonbenfit[i].District}} - {{nonbenfit[i].Name}}
      </li>
    </ul>
    <div v-for="(item, idx) in nonbenfit" :key="idx" class="card">
      <h4>{{ item.District }} - {{ item.Name }}</h4>
      <div style="text-align: left;">
        <h5>電話 : {{ item.Tel }}</h5>
        <h5>地址 : {{ item.Address }}</h5>
      </div>
      <i class="fa fa-heart-o" style="font-size:24px;" v-show="heartlist[idx] == 0" @click="ch(idx)"></i>
      <i class="fa fa-heart" style="font-size:24px;color: red;" v-show="heartlist[idx] == 1" @click="ch(idx)"></i>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      nonbenfit: [],
      heartlist: []
    }
  },
  mounted () {
    axios('https://datacenter.taichung.gov.tw/Swagger/OpenData/da14aacd-2364-4540-82b0-8edc1329e7c3?limit=1000').then(res => {
      // console.log(res.data)
      this.nonbenfit = res.data
      console.log(sessionStorage.hkey === undefined)
      if (sessionStorage.hkey === undefined) {
        for (let i = 0; i < this.nonbenfit.length; i++) {
          this.heartlist[i] = 0
        }
        sessionStorage.setItem('hkey', [this.heartlist])
      } else {
        this.heartlist = sessionStorage.getItem('hkey').split(',')
        for (let i = 0; i < this.heartlist.length; i++) {
          this.heartlist[i] = Number(this.heartlist[i])
        }
        console.log(this.heartlist)
      }
    }).catch(err =>
      console.log(err)
    )
  },
  methods: {
    ch (e) {
      this.nonbenfit[e].istrur = !this.nonbenfit[e].istrur
      this.heartlist[e] = this.heartlist[e] === 1 ? 0 : 1
      sessionStorage.setItem('hkey', [this.heartlist])
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  display: inline-block;
  border: 1px black solid;
  width: 350px;
  min-height: 250px;
  max-height: 250px;
  margin: 10px;
  padding: 10px;
}
</style>
