// eg
export const useDemoPinia = defineStore('demo', () => {
	// state
	const count = ref(0);
	
	// getters 
	
	// actions
	function increment() {
		count.value++;
	}

	return { count, increment };
});
