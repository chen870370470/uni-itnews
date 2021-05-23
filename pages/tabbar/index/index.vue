<template>
	<view class="home">
		<!-- 自定义导航栏 -->
		<navbar></navbar>
		<tab :list="tabList" @tab="tab"></tab>
		<view class="home-list">
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
				this.$api.get_label().then((res) => {
					const {
						data
					} = res
					this.tabList = data
				})
			},
			tab(data) {
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
		overflow: hidden;
		.home-list {
			flex: 1;
			box-sizing: border-box;
			border: 1px red solid;
		}
	}
</style>
