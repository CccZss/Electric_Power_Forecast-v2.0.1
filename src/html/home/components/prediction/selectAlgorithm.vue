<template>
	<section>
		<h1 class="title">选择算法</h1>
	</section>
</template>

<script>
	import { mapActions} from 'vuex';
	import user from  '../../store/types/user'
	export default {
		data () {
			return {
			}
		},
		methods: {
			...mapActions(user.actions),

		}
	}
</script>

<style scoped>
	.title {
		border-bottom: 2px solid #c3c3c3;
    	padding: 0 0 5px 10px;
	}
</style>