<template>
	<section>
		<h1 class="title">开始预测</h1>
	</section>
</template>

<script>
	import { mapActions} from 'vuex';
	import data from  '../../store/types/data'
	export default {
		data () {
			return {
				dataName: '',
				dataFile : null
			}
		},
		methods: {
			...mapActions(data.actions),
		}
	}
</script>

<style scoped>
	.title {
		border-bottom: 2px solid #c3c3c3;
    	padding: 0 0 5px 10px;
	}
</style>