<template>
	<view class="home">
		<!-- 自定义导航栏 -->
		<navbar></navbar>

		<tab :list="tabList" @tab="tab"></tab>
		<view>
			<list></list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				tabList: []
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			getLabel() {
				console.log(this.$api);
				this.$api.get_label().then((res) => {
					const {
						data
					} = res
					this.tabList = data
				})
			},
			tab(data) {
				console.log(data);
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		border: 1px red solid;
		overflow: hidden;
	}
</style>
