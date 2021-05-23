<template>
	<swiper class="home-swiper">
		<swiper-item>
			<list-scroll>
				<list-card mode="base"></list-card>
				<list-card mode="image"></list-card>
				<list-card mode="column"></list-card>
				<list-card mode="column"></list-card>
				<list-card mode="column"></list-card>
				<list-card mode="column"></list-card>
				<list-card mode="column"></list-card>
				<list-card mode="column"></list-card>
				<list-card mode="column"></list-card>
			</list-scroll>
		</swiper-item>

	</swiper>
</template>

<script>
	export default {
		name:"list",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.home-swiper {
		height: 100%;
	}
</style>
