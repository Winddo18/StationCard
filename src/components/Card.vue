<template>
  <div class="w-850px h-500px card flex flex-col items-center adjust">
    <div class="flex">
      <img src="../assets/NIST.png" alt="NIST" width="120" height="80" class="mt-10px h-80px"/>
      <div class="ml-40px item-center pt-15px">
        <span class="text-2xl block font-serif italic font-bold">国家计算机信息内容安全重点实验室（威海）</span>
        <span class="text-2xl block font-serif italic font-bold"
          >哈尔滨工业大学（威海）网络与信息安全技术研究中心</span
        >
      </div>
    </div>
    <div class="flex flex-col items-center justify-center h-29/40">
      <span class="text-5xl justify-center items-center mb-20px">{{ name }}</span>
      <span class="text-3xl"
        >{{ department }}&emsp;|&emsp; {{ grade }}&emsp;|&emsp; #{{ id }}</span
      >
    </div>
    <div class="flex w-full flex-1 h-40px">
      <div
        class="text-2xl text-center flex-auto card__grade word"
        v-for="(item, index) of list"
        :key="index"
        :class="{active: isActive-1 > index}"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NTag } from 'naive-ui'
import { defineProps, h, onMounted, ref, render } from 'vue'

const props = defineProps({
  name: String,
  id: String,
  department: String,
  grade: String,
})

const isActive = ref(0)
const list:any = ref([])
const underGraduate = ref(['大一', '大二', '大三', '大四'])
const master = ref(['硕一','硕二','硕三'])
const phd = ref(['博一','博二','博三','博四','博五'])

onMounted(() => {
  //计算入学时间---
  const date = new Date()
  const year = Number(date.getFullYear().toString().slice(1,4))
  const startYear = Number(props.id?.slice(1,3))
  isActive.value = year - startYear
  //---------

  //设置年级------
  if(props.grade == '本科'){
    list.value = underGraduate.value
  }
  if(props.grade == '硕士'){
    list.value = master.value
  }
  if(props.grade == '博士'){
    list.value = phd.value
  }
})
</script>

<style scoped>
.card {
  background-color: #FCFAFE;
  border: 2px solid rgb(200, 197, 197);
  border-radius: 5px;
  /* box-shadow: 0 0 15px rgb(95, 94, 94); */
}
.active{
  background-color: #F3EFF6;
}
.adjust{
  -webkit-print-color-adjust: exact;
}
.word{
  line-height: 40px;
}
.card__grade{
  border: 1px solid #FCFAFE;
  color: white;
  font-size: bold;
}
</style>
