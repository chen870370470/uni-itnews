<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏 -->
			<view :style="{height: statusBarHeight + 'px'}">
			</view>
			<!-- 导航栏内容 -->
			<view class="navbar-content" :style="{height: navBarHeight + 'px', width: windowWidth + 'px'}">
				<view class="navbar-serach">
					<view class="navbar-serach_icon">
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<view class="navbar-serach_text">uni-app、vue</view>
				</view>
			</view>
		</view>
		<view :style="{height:statusBarHeight+navBarHeight+'px' }"></view>
	</view>
</template>

<script>
	export default {
		name: "navbar",
		data() {
			return {
				statusBarHeight: 20,
				navBarHeight: 45,
				windowWidth: 375
			};
		},
		created() {
			// 获取手机系统信息
			const info = uni.getSystemInfoSync()
			// 设置状态栏高度
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			// 获取小程序右上角胶囊的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// ()
			this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info
				.statusBarHeight)
			this.windowWidth = menuButtonInfo.left
			// #endif
		}
	}
</script>

<style lang="scss">
	@import '../../common/css/icons.css';

	.navbar {
		.navbar-fixed {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			width: 100%;
			background-color: $mk-base-color;

			.navbar-content {
				display: flex;
				justify-content: center;
				align-items: center;
				// height: 45px;
				padding: 0 15px;
				box-sizing: border-box;

				.navbar-serach {
					display: flex;
					align-items: center;
					width: 100%;
					height: 30px;
					border-radius: 30px;
					padding: 0 10px;
					background-color: #fff;

					.navbar-serach_icon {
						margin-right: 10px;
					}

					.navbar-serach_text {
						font-size: 12px;
						color: #999999;
					}
				}
			}

		}
	}
</style>
