<template>
	<view class="detail">
		<view class="detail-title">{{ formData.title }}</view>
		<view class="detail-header">
			<view class="detail-header__logo"><image :src="formData.author.avatar" mode="aspectFill"></image></view>
			<view class="detail-header__content">
				<view class="detail-header__content-title">{{ formData.author.author_name }}</view>
				<view class="detail-header__content-info">
					<text>{{ formData.create_time }}</text>
					<text>{{ formData.browse_count }}浏览</text>
					<text>{{ formData.thumbs_up_count }}赞</text>
				</view>
			</view>
			<button class="detail-header__button" type="default" @click="follow(formData.author.id)">{{ formData.is_author_like ? '取消关注' : '关注' }}</button>
		</view>

		<view class="detail-content">
			<view class="detail-html"><u-parse :content="formData.content" :noData="noData"></u-parse></view>
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>
				<view class="comment-content" v-for="item in commentsList" :key="item.comment_id"><comments-box :comments="item" @reply="reply"></comments-box></view>
			</view>
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom__input" @click="openComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom__icons">
				<view class="detail-bottom__icons-box" @click="open"><uni-icons type="chat" size="22" color="#f07373"></uni-icons></view>
				<view class="detail-bottom__icons-box" @click="likeTap(formData._id)">
					<uni-icons :type="formData.is_like ? 'heart-filled' : 'heart'" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box" @click="thumbsup(formData._id)">
					<uni-icons :type="formData.is_thumbs_up ? 'hand-thumbsup-filled' : 'hand-thumbsup'" size="22" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<text class="popup-header__item" @click="close">取消</text>
					<text class="popup-header__item" @click="submit">发布</text>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" v-model="commentsValue" maxlength="200" fixed="true" placeholder="请输入评论内容" />
					<view class="popup-count">{{ commentsValue.length }}/200</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uParse from '@/components/gaoyia-parse/parse.vue'

export default {
	components: {
		uParse
	},
	data() {
		return {
			formData: {},
			noData: '<p style="text-align:center;color:#666">详情加载中...</p>',
			// 输入框的值
			commentsValue: '',
			commentsList: [],
			replyFormData: {}
		}
	},
	onLoad(query) {
		this.formData = JSON.parse(query.params)
		this.getDetail()
		this.getComments()
	},
	onReady() {},
	methods: {
		// 打开评论列表
		open() {
			uni.navigateTo({
				url: '../detail-comments/detail-comments?id=' + this.formData._id
			})
		},
		// 点赞
		thumbsup(article_id) {
			this.setUpdateThumbs(article_id)
		},
		// 收藏
		likeTap(article_id) {
			this.setUpdateLike(article_id)
		},
		// 关注
		follow(author_id) {
			this.setUpdateAuthor(author_id)
		},
		// 打开评论发布窗口
		openComment() {
			this.$refs.popup.open()
		},
		// 关闭弹窗
		close() {
			this.$refs.popup.close()
		},
		// 发布弹窗
		submit() {
			console.log('发布')
			if (!this.commentsValue) {
				uni.showToast({
					title: '请输入评论内容',
					icon: 'none'
				})
				return
			}
			this.setUpdateComment({
				content: this.commentsValue,
				...this.replyFormData
			})
		},
		reply(e) {
			this.replyFormData = {
				comment_id: e.comments.comment_id,
				is_reply: e.is_reply
			}
			if (e.comments.reply_id) {
				this.replyFormData.reply_id = e.comments.reply_id
			}
			this.openComment()
		},
		setUpdateComment(content) {
			const formData = {
				article_id: this.formData._id,
				...content
			}
			console.log(formData)
			uni.showLoading()
			this.$api.update_comment(formData).then(res => {
				console.log(res)
				uni.hideLoading()
				uni.showToast({
					title: '发布成功',
					icon: 'none'
				})
				this.getComments()
				this.close()
				this.replyFormData = {}
				this.commentsValue = ''
			})
		},
		// 获取详情信息
		getDetail() {
			this.$api
				.get_detail({
					article_id: this.formData._id
				})
				.then(res => {
					const { data } = res
					this.formData = data
				})
		},
		// 请求评论内容
		getComments() {
			this.$api
				.get_comments({
					article_id: this.formData._id
				})
				.then(res => {
					const { data } = res
					this.commentsList = data
				})
		},
		// 关注作者
		setUpdateAuthor(author_id) {
			uni.showLoading()
			this.$api
				.update_author({
					author_id
				})
				.then(res => {
					uni.hideLoading()
					this.formData.is_author_like = !this.formData.is_author_like
					uni.$emit('update_author')
					uni.showToast({
						title: this.formData.is_author_like ? '关注作者成功' : '取消关注作者',
						icon: 'none'
					})
				})
		},
		// 收藏文章
		setUpdateLike(article_id) {
			uni.showLoading()
			this.$api
				.update_likes({
					article_id
				})
				.then(res => {
					uni.hideLoading()
					this.formData.is_like = !this.formData.is_like
					uni.$emit('update_article', 'follow')
					uni.showToast({
						title: this.formData.is_like ? '收藏成功' : '取消收藏',
						icon: 'none'
					})
				})
		},
		// 点赞文章
		setUpdateThumbs(article_id) {
			uni.showLoading()
			this.$api
				.update_thumbsup({
					article_id
				})
				.then(res => {
					uni.hideLoading()
					this.formData.is_thumbs_up = true
					this.formData.thumbs_up_count++
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				})
		}
	}
}
</script>

<style lang="scss">
.detail {
	padding: 15px 0;
	padding-bottom: 54px;
}

.detail-title {
	padding: 0 15px;
	font-size: 18px;
	font-weight: bold;
	color: #333333;
}

.detail-header {
	display: flex;
	align-items: center;
	margin-top: 10px;
	padding: 0 15px;

	.detail-header__logo {
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.detail-header__content {
		width: 100%;
		padding-left: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 12px;

		.detail-header__content-title {
			font-size: 14px;
			color: #333333;
		}

		.detail-header__content-info {
			color: #999999;

			text {
				margin-right: 10px;
			}
		}
	}

	.detail-header__button {
		flex-shrink: 0;
		height: 30px;
		font-size: 12px;
		color: #ffffff;
		background-color: $mk-base-color;
	}
}

.detail-content {
	margin-top: 20px;
	min-height: 500px;

	.detail-html {
		padding: 0 15px;
	}

	.detail-comment {
		margin-top: 30px;

		.comment-title {
			padding: 10px 15px;
			font-size: 14px;
			color: #666;
			border-bottom: 1px #f5f5f5 solid;
		}

		.comment-content {
			padding: 0 15px;
			border-top: 1px #eeeeee solid;
		}
	}
}

.detail-bottom {
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	align-items: center;
	width: 100%;
	height: 44px;
	border-top: 1px #f5f5f5 solid;
	background-color: #ffffff;
	box-sizing: border-box;

	.detail-bottom__input {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 10px;
		padding: 0 10px;
		width: 100%;
		height: 30px;
		border: 1px #ddd solid;
		border-radius: 5px;

		text {
			font-size: 14px;
			color: #999;
		}
	}

	.detail-bottom__icons {
		display: flex;
		flex-shrink: 0;
		padding: 0 10px;

		.detail-bottom__icons-box {
			position: relative;
			display: felx;
			align-items: center;
			justify-content: center;
			width: 44px;
		}
	}
}

.popup-wrap {
	background-color: #ffffff;

	.popup-header {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		color: #666;
		border-bottom: 1px #f5f5f5 solid;

		.popup-header__item {
			height: 50px;
			line-height: 50px;
			padding: 0 15px;
		}
	}

	.popup-content {
		width: 100%;
		padding: 15px;
		box-sizing: border-box;

		.popup-textarea {
			width: 100%;
			height: 200px;
		}

		.popup-count {
			display: flex;
			justify-content: flex-end;
			font-size: 12px;
			color: #999999;
		}
	}
}
</style>
