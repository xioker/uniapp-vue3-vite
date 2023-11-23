<script setup>
  onLaunch(() =>{
		console.log(uni.getLocale())
		console.log('App Launch',import.meta.env)
	})
		
  onShow(() =>{
		console.log('App Show')
	})
  onHide(() => {
		console.log('App Hide')
	})
</script>

<style lang="scss">
/*每个页面公共css */
</style>
