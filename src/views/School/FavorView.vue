<template>
  <div>
    Favor
    <!-- {{consl}} -->
    <!-- {{see}} -->
    <div v-for="(item,idx) in nonbenfit" :key="idx" v-show="heartlist[idx]">
        <h4>{{item.Name}}</h4>
    </div>
    <!-- <button @click="consl">click</button> -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      userData: 'Hello',
      nonbenfit: [],
      heartlist: []
    }
  },
  methods: {
    consl () {
      console.log('aa')
    },
    gets (e) {
      this.heartlist = e.split(',')
      console.log(this.heartlist)
      for (let i = 0; i < this.heartlist.length; i++) {
        this.heartlist[i] = Number(this.heartlist[i])
      }
      console.log(this.heartlist)
      this.$forceUpdate()
    }
  },
  mounted () {
    axios('https://datacenter.taichung.gov.tw/Swagger/OpenData/da14aacd-2364-4540-82b0-8edc1329e7c3?limit=1000').then(res => {
      // console.log(res.data)
      this.nonbenfit = res.data
      //   this.heartlist = sessionStorage.getItem('hkey')
      this.gets(sessionStorage.getItem('hkey'))
    //   console.log(this.heartlist)
    }).catch(err =>
      console.log(err)
    )
  },
  computed: {
    see () {
    //   console.log(this.gets(sessionStorage.getItem('hkey')))
      this.gets(sessionStorage.getItem('hkey'))
      return sessionStorage.getItem('hkey')
    }
  }
}
</script>
