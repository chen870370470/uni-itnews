<template>
	<view>
		<view class="comments-content" v-for="item in commentsList" :key="item.comment_id">
			<comments-box :comments="item" @reply="reply"></comments-box>
		</view>
		<uni-load-more v-if="commentsList.length === 0 || commentsList.length > 5" iconType="snow" :status="loading">
		</uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article_id: '',
				commentsList: [],
				page: 1,
				pageSize: 5,
				loading: 'loading'
			}
		},
		onLoad(query) {
			console.log(query);
			this.article_id = query.id
			this.getComments()
		},
		onReachBottom() {
			if (this.loading = 'noMore') return
			this.page++
			this.getComments()
		},
		methods: {
			// 请求评论内容
			getComments() {
				this.$api.get_comments({
					article_id: this.article_id,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					const {
						data
					} = res
					if (data.length === 0) {
						this.loading = 'noMore'
						return
					}
					let oldFormdata = JSON.parse(JSON.stringify(this.commentsList))
					oldFormdata.push(...data)
					this.commentsList = oldFormdata
				})
			},
			reply(e) {
				this.replyFormData = {
					"comment_id": e.comments.comment_id,
					"is_reply": e.is_reply
				}
				if (e.comments.reply_id) {
					this.replyFormData.reply_id = e.comments.reply_id
				}
				this.openComment()
			},
		}
	}
</script>

<style lang="scss">
	.comments-content {
		padding: 0 15px;
	}
</style>
