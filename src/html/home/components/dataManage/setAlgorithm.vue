<template>
    <section>
        <div class="algorithm-wrap">
            <p><Icon type="android-radio-button-on"></Icon> 组合算法</p>
            <span class="algorithm-item" v-for="(item, index) in groupAlgorithm" :key="index">
                <Checkbox v-model="item.value" @on-change="changeValue">{{item.name}}</Checkbox>
            </span>
        </div>
        <div class="algorithm-wrap">
            <p><Icon type="android-radio-button-on"></Icon> 单算法</p>
            <span class="algorithm-item" v-for="(item, index) in singleAlgorithm" :key="index">
                <Checkbox v-model="item.value" @on-change="changeValue">{{item.name}}</Checkbox>
            </span>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: ['groupAlgorithm', 'singleAlgorithm'],
    methods: {
        changeValue() {
           var algorithm = [];
            this.groupAlgorithm.forEach(item => {
                if(item.value) {
                    algorithm.push(item.name)
                }
            })
            this.singleAlgorithm.forEach(item => {
                if(item.value) {
                    algorithm.push(item.name)
                }
            })
            this.$emit('on-change', algorithm)
        }
    }
}
</script>

<style scoped>
	.algorithm-wrap {
        width: 450px;
		margin: 10px 0 10px 55px;
		padding-bottom: 10px;
	}
	.algorithm-wrap p {
		font-size: 16px;
		color: #00adfb;
		margin: 0 0 10px -30px;
	}
	.algorithm-item {
        display: inline-block;
		margin: 0 8px 10px 0;
        min-width: 80px
	}
</style>
