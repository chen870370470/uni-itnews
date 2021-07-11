<template>
	<view class="follow">
		<!-- 当行切换 -->
		<view class="follow-tab">
			<view class="follow-tab_box">
				<view class="follow-tab__item" :class="{ active: activeIndex === 0 }" @click="tab(0)">文章</view>
				<view class="follow-tab__item" :class="{ active: activeIndex === 1 }" @click="tab(1)">作者</view>
			</view>
		</view>
		<view class="follow-list">
			<swiper class="follow-list__swiper" :current="activeIndex" @change="change">
				<swiper-item>
					<list-scroll>
						<uni-load-more v-if="list.length === 0 && !articleShow" iconType="snow" status="loading"></uni-load-more>
						<list-card v-else v-for="(item, index) in list" :key="item._id" :item="item" types="follow"></list-card>
						<view v-show="articleShow" class="articleShow">没有数据</view>
					</list-scroll>
				</swiper-item>
				<swiper-item>
					<list-scroll><list-author v-for="(item, index) in authorLists" :item="item" :key="item.id"></list-author></list-scroll>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			activeIndex: 1,
			list: [],
			authorLists: [],
			articleShow: false
		}
	},
	onLoad() {
		// 自定义事件$on只能在打开的页面触发
		uni.$on('update_article', () => {
			this.getFollow()
		})
		uni.$on('update_author', () => {
			this.getAuthor()
		})
		this.getFollow()
		this.getAuthor()
	},
	methods: {
		change(e) {
			this.activeIndex = e.detail.current
		},
		tab(index) {
			this.activeIndex = index
		},
		getFollow() {
			this.$api.get_follow().then(res => {
				const { data } = res
				this.list = data
				this.articleShow = this.list.length === 0 ? true : false
			})
		},
		getAuthor() {
			this.$api.get_author().then(res => {
				this.authorLists = res.data
			})
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
		border: 1px #f5f5f5 solid;

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

	.follow-list {
		flex: 1;

		.follow-list__swiper {
			height: 100%;

			.swiper-item {
				height: 100%;
			}
		}
	}
}

.articleShow {
	padding: 50px;
	font-size: 14px;
	color: #999999;
	text-align: center;
}
</style>
