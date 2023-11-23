<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
      <text class="title">{{ $t('index.demo') }}</text>
    </view>
		<view class="">
			{{ demoPinia.count }}
		</view>
		<button @click="onChange('zh-Hans')">修改</button>
		<button @click="onChange('zh-Hant')">修改</button>
		<button @click="onChange('ko')">修改</button>
		<button @click="onChange('ja')">修改</button>
		<button @click="onChange('en')">修改</button>
		<button @click="demoPinia.count++">pinia count</button>
  </view>
</template>

<script setup>
import { useDemoPinia } from '@/store/index.js'
import i18n from '@/locale/index.js'
 const demoPinia = useDemoPinia()
 let title = ref('')
 
 function onChange(type){
	 uni.setLocale(type)
		i18n.global.locale = type
	 console.log(uni.getLocale())
		uni.onLocaleChange((e) => {
		  title.value = e.locale;
		})
	 
 }
 onLoad((options)=>{
	 console.log("xx",options)
	 console.log("xx",JSON.parse(options.x))
	 console.log("xx",JSON.parse(options.obj))
 })
 onHide(()=>{
	 console.log('hide')
 })
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
