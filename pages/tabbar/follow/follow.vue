<template>
	<view class="follow">
		<!-- 当行切换 -->
		<view class="follow-tab">
			<view class="follow-tab_box">
				<view class="follow-tab__item" :class="{active:activeIndex === 0}" @click="tab(0)">文章</view>
				<view class="follow-tab__item" :class="{active:activeIndex === 1}" @click="tab(1)">作者</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0
			}
		},
		methods: {
			tab(index) {
				this.activeIndex = index
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.follow {
		height: 100%;
		display: flex;
		flex-direction: column;
		flex: 1;
		box-sizing: border-box;

		.follow-tab {
			height: 30px;
			padding: 10px 20px;
			border: 1px #F5F5F5 solid;

			.follow-tab_box {
				display: flex;
				width: 100%;
				height: 100%;
				border-radius: 5px;
				border: 1px $mk-base-color solid;

				.follow-tab__item {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
					color: #666666;
					font-size: 14px;

					&:first-child {
						border-right: 1px $mk-base-color solid;
					}

					&.active {
						color: $mk-base-color;
					}
				}
			}
		}
	}
</style>
