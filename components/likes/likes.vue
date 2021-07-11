<template>
	<view class="icons" @click.stop="likeTap">
		<uni-icons :type="item.is_like?'heart-filled':'heart'" size="20" color="#f07373"></uni-icons>
	</view>
</template>

<script>
	export default {
		name: "likes",
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			},
			types:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				like: false
			};
		},
		// watch: {
		// 	item(newVal) {
		// 		this.like = this.item.is_like
		// 	}
		// },
		// created() {
		// 	this.like = this.item.is_like
		// },
		methods: {
			likeTap() {
				this.item.is_like = !this.item.is_like
				this.setUpdateLikes()
			},
			setUpdateLikes() {
				uni.showLoading({
					
				})
				this.$api.update_likes({
					// user_id: '60a27cb24b9480000118e97f',
					article_id: this.item._id
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title:this.item.is_like?'收藏成功':'消除收藏',
						icon:'none'
					})
					uni.$emit('update_article',this.types)
					// console.log(res);
				}).catch(()=>{
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">
	.icons {
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
	}
</style>
