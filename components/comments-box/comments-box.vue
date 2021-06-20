<template>
	<view class="comments-box">
		<view class="comments-header">
			<view class="comments-header__logo">
				<image src="../../static/logo.png" mode="aspectFill"></image>
			</view>
			<view class="comments-header__info">
				<view class="title">
					meHaotian
				</view>
				<view class="">2021-06-20 11:11:11</view>
			</view>
		</view>
		<view class="comments-content">
			<view class="">
				uniapp 超级牛逼
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"comments-box",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.comments-box {
		margin: 15px 0;
		.comments-header {
			display: flex;
			.comments-header__logo {
				flex-shrink: 0;
				width: 30px;
				height: 30px;
				border-radius: 5px;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.comments-header__info {
				display: flex;
				flex-direction: column;
				padding-left: 15px;
				font-size: 12px;
				color: #999999;
				line-height: 1;
				.title {
					margin-bottom: 10px;
					font-size: 14px;
					color: #333333;
				}
			}
		}
		.comments-content {
			margin-top: 10px;
			font-size: 14px;
			color: #000000;
		}
	}
</style>
