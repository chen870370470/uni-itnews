'use strict';
// 获取数据库的引用
const db = uniCloud.database()
exports.main = async (event, context) => {
	// 接收分类，通过分类去筛选数据
	const {
		name
	} = event
	// 聚合：更精细化的去处理数据  求和、分组、指定返回哪些字段
	const list = await db.collection('article')
		.aggregate()
		.match({
			classify: name
		})
		.project({
			content: false
		})
		.end()
	// const list = await db.collection('article')
	// .field({
	// 	// true 表示返回这个字段，false 表示不返回
	// 	content:false
	// })
	// .get()

	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
