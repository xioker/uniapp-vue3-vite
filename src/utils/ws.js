export default class Ws {
	// ws实例
	static instance = null
	// 是否连接
	protected connected = false
	// 重发次数
	protected retrySend = 0
	// 重连次数
	protected retryConnect = 0
	// 重发timer定时器
	protected sendTimer = null
	// 重连timer定时器
	protected connectTimer = null
	// 最大 重连 重发次数
	protected maxCount = 10
	// ping延时器
	protected interTimer = null

	static get Instance(){
		if(this.instance === null){
			this.instance = new Ws()
		}
		return this.instance
	}
	
	// 实例销毁
	static destroy(){
		this.instance = null
		uni.closeSocket()
		if(this.connectTimer){
			clearTimeout(this.connectTimer)
			this.connectTimer = null
		}
		if(this.sendTimer){
			clearTimeout(this.sendTimer)
			this.sendTimer = null
		}
		if(this.interTimer){
			clearInterval(this.interTimer)
			this.interTimer = null
		}
	}
	
	// 发送消息
	sendMsg(data){
		if(this.connected){
			this.retrySend = 0
			uni.sendSocketMessage({ data });
		}else{
			if(this.retrySend >= this.maxCount) return
			this.retrySend++
			setTimeout(()=>{
				this.sendMsg(data)
			},500 * this.retrySend)
		}
	}
	
	// websocket连接
	initWs(){
		if(this.connected || this.retryConnect>=this.max) {
			return
		}
		uni.connectSocket({
		  url: import.meta.env.VITE_WS_URL,
			complete: ()=>{}
		})
		
		uni.onSocketOpen((res) => {
			this.connected = true
			this.retryConnect = 0
			// 定时发送ping
			this.interTimer = setInterval(()=> {
				this.sendMsg('ping')
			},3*60*1000)
			
			if(this.connectTimer) {
				clearTimeout(this.connectTimer)
				this.connectTimer = null
			}
		  console.log('WebSocket连接已打开！');
		})
		
		uni.onSocketClose((res) => {
			this.connected = false
			this.retryConnect++
			this.connectTimer = setTimeout(() => {
				this.initWs()
			}, 500 * this.retryConnect)
		  console.log('WebSocket 已关闭！');
		})

		uni.onSocketMessage((res) => {
		  console.log('收到服务器内容：' + res.data);
		})
	}
	
	
}