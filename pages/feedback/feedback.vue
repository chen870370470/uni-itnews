<template>
	<view>
		<view class="feedback-title">意见反馈</view>
		<view class="feedback-content"><textarea class="feedback-textarea" value="" placeholder="请输入你要反馈的问题" /></view>
		<view class="feedback-title">反馈图片</view>
		<view class="feedback-image-box">
			<view class="feedback-image-item" v-for="(item, index) in imageList" :key="index">
				<view class="close-icon" @click="del(index)"><uni-icons type="closeempty" size="18" color="#fff"></uni-icons></view>
				<view class="image-box"><image :src="item.url" mode="aspectFill"></image></view>
			</view>
			<view v-if="imageList.length < 5" class="feedback-image-item" @click="addImage">
				<view class="image-box"><uni-icons type="plusempty" size="50" color="#eee"></uni-icons></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			imageList: []
		}
	},
	methods: {
		del(index){
			this.imageList.splice(index,1)
		},
		addImage() {
			const count = 5 - this.imageList.length
			uni.chooseImage({
				count: count,
				success: res => {
					const { tempFilePaths } = res
					tempFilePaths.forEach((item, index) => {
						// 处理h5多选的状况
						if (index < count) {
							this.imageList.push({
								url: item
							})
						}
					})
					console.log(tempFilePaths)
				}
			})
		},
		
	}
}
</script>

<style lang="scss">
.feedback-title {
	margin: 15px;
	margin-bottom: 0;
	font-size: 14px;
	color: #666;
}
.feedback-content {
	margin: 15px;
	padding: 10px;
	box-sizing: border-box;
	border: 1px red solid;
	.feedback-textarea {
		font-size: 12px;
		width: 100%;
		height: 100px;
	}
}
.feedback-image-box {
	display: flex;
	flex-wrap: wrap;
	padding: 10px;
	.feedback-image-item {
		position: relative;
		width: 33.3%;
		height: 0;
		padding-top: 33.3%;
		box-sizing: border-box;
		.close-icon {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			right: 0;
			top: 0;
			width: 22px;
			height: 22px;
			border-radius: 50%;
			background-color: #ff5a5f;
			z-index: 2;
		}
		.image-box {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 5px;
			left: 5px;
			bottom: 5px;
			right: 5px;
			border: 1px #eee solid;
			border-radius: 5px;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
