<template>
  <h1>{{ msg }}</h1>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="state.count++">count is: {{ state.count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup>
import { defineProps, reactive, onMounted } from 'vue'
import { fetchFundManagerList, fetchFundManagerDetail } from '@/utils/api.js'
defineProps({
  msg: String
})
const state = reactive({ count: 0 })

onMounted(() => {
  console.log('2')
  fetchFundManagerList({pageSize: 100}).then((result) => {
    state.count = result.Datas?.length
    getBaseInfo(result.Datas)
  }).catch((err) => {
    console.error(err)
  });
})

const getBaseInfo = (data = []) => {
  const lateMonths = []
  const lateQoarterlys = []
  const lateYears = []
  data.forEach(item => {
    const { M, Q, Y, YIELDSE} = item
    lateMonths.push(Number(M))
    lateQoarterlys.push(Number(Q))
    lateYears.push(Number(Y))
  })
  getSortInfo({lateMonths, lateQoarterlys, lateYears,data})
}

const getSortInfo = ({lateMonths, lateQoarterlys, lateYears, data}) => {
  const sortLateMonths = [...lateMonths].sort((a,b) => b - a)
  const sortLateQoarterlys = [...lateQoarterlys].sort((a,b) => b - a)
  const sortLateYears = [...lateYears].sort((a,b) => b - a)
  const param = {lateMonths, lateQoarterlys, lateYears, sortLateMonths, sortLateQoarterlys, sortLateYears}
  param.target = 100
  const targetIdx = sortByTarget(param)
  const targetManager = targetIdx.map(item => data[item])
  console.log(targetIdx, targetManager)
  const promisArr = targetManager.map(item => fetchFundManagerDetail({mgrid: item.MGRID}))
  getManagerDetail(promisArr)
}

const getManagerDetail = (promisArr) => {
  Promise.all(promisArr).then(res => {
    res = res.filter(item => {
      return (item.Datas.TOTALDAYS / 5) > 365 && item.Datas.NETNAV > (10000*10000*20) && item.Datas.FMAXRETRA1 < 0.3
    })
    console.log('-----',res)
  })
}

const sortByTarget = ({lateMonths, lateQoarterlys, lateYears, sortLateMonths, sortLateQoarterlys, sortLateYears, target}) => {
  const mTop = []
  const qTop = []
  const yTop = []
  let idx = 0
  while(idx < target) {
    const m = sortLateMonths[idx]
    const q = sortLateQoarterlys[idx]
    const y = sortLateYears[idx]
    const mi = lateMonths.indexOf(m)
    const qi = lateQoarterlys.indexOf(q)
    const yi = lateYears.indexOf(y)
    mTop.push(mi)
    qTop.push(qi)
    yTop.push(yi)
    ++idx
  }
  return mTop.filter(item => {
    return qTop.includes(item) && yTop.includes(item)
  })
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
