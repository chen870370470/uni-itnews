<template>
	<view>
		<view class="my-header">
			<view class="my-header__background"><image src="../../../static/logo.png" mode=""></image></view>
			<view class="my-header__logo">
				<view class="my-header__logo-box"><image src="/static/logo.png" mode="aspectFill"></image></view>
				<text class="my-header__name">陈继康</text>
			</view>
			<view class="my-header__info">
				<view class="my-header__info-box">
					<text class="my-header__info-title">被关注</text>
					<text>1245</text>
				</view>
				<view class="my-header__info-box">
					<text class="my-header__info-title">粉丝</text>
					<text>1245</text>
				</view>
				<view class="my-header__info-box">
					<text class="my-header__info-title">积分</text>
					<text>1245</text>
				</view>
			</view>
		</view>
		<view class="my-content">
			<view class="my-content__list">
				<view class="my-content__list-title">
					<uni-icons class="icons" type="contact" size="16" color="#666"></uni-icons>
					<text>我的文章</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
			<view class="my-content__list" @click="openFeedback">
				<view class="my-content__list-title">
					<uni-icons class="icons" type="help" size="16" color="#666"></uni-icons>
					<text>意见反馈</text>
				</view>
				<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {
		openFeedback(){
			uni.navigateTo({
				url:'/pages/feedback/feedback'
			})
		}
	}
}
</script>

<style lang="scss">
page {
	background-color: #f5f5f5;
}
.my-header {
	position: relative;
	padding-bottom: 15px;
	.my-header__background {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		filter: blur(8px);
		opacity: 0.3;
		image {
			height: 100%;
			width: 100%;
		}
	}
	.my-header__logo {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 30px;
		.my-header__logo-box {
			width: 60px;
			height: 60px;
			border-radius: 50%;
			overflow: hidden;
			image {
				height: 100%;
				width: 100%;
			}
		}
		.my-header__name {
			margin-top: 15px;
			font-size: 16px;
			font-weight: bold;
		}
	}
	.my-header__info {
		margin-top: 15px;
		display: flex;
		.my-header__info-box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100%;
			font-size: 12px;
			color: #999;
			.my-header__info-title {
				font-size: 14px;
				color: #333;
			}
		}
	}
}
.my-content {
	.my-content__list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px;
		margin-top: 10px;
		background-color: #ffffff;
		color: #333333;
		font-size: 14px;
		.my-content__list-title {
			display: flex;
			align-items: center;
			.icons {
				margin-right: 5px;
			}
		}
	}
}
</style>
