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
		<uni-card>
			<text>这是一个基础卡片示例，内容较少，此示例展示了一个没有任何属性不带阴影的卡片。使用uni-ui</text>
		</uni-card>
		<uni-badge size="small" :text="100" absolute="rightBottom" type="primary">
			<button type="default">右下</button>
		</uni-badge>
		
		<uni-badge text="1"></uni-badge>
		
		<uni-badge text="2" type="purple" @click="bindClick"></uni-badge>
		
		<uni-badge text="3" type="primary" :inverted="true"></uni-badge>
		<button @click="onChange('zh-Hans')">修改</button>
		<button @click="onChange('zh-Hant')">修改</button>
		<button @click="onChange('ko')">修改</button>
		<button @click="onChange('ja')">修改</button>
		<button @click="onChange('en')">修改</button>
		<button @click="demoPinia.increment">pinia count</button>
		<button @click="go">gogogo</button>
  </view>
</template>

<script setup>
import { useDemoPinia } from '@/store/index.js'
import i18n from '@/locale/index.js'
import urlFormat from '@/router';
 const demoPinia = useDemoPinia()
 let title = ref('')
 
 function bindClick(){
	 
 }
 
 function onChange(type){
  uni.setLocale(type)
	i18n.global.locale = type
	uni.onLocaleChange((e) => {
		title.value = e.locale;
	})
 }
 function go(){
	 uni.navigateTo({ url: urlFormat('demo',{demo:'xxx',x: [1,2,3], obj:{name:'ss'},b:''})})
 }
 onLoad(()=>{
	 console.log("xx")
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
