'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command

exports.main = async (event, context) => {

	const {
		// 用户id
		user_id,
		// 文章id
		article_id,
		// 评论内容
		content
	} = event

	let user = await db.collection('user').doc(user_id).get()
	// 获取用户对象
	user = user.data[0]

	let commentObj = {
		// 评论id
		comment_id: getID(5),
		// 评论内容
		comment_content: content,
		// 创建时间
		create_time: new Date().getTime(),
		// 作者信息
		author: {
			author_id: user._id,
			author_name: user.author_name,
			avator: user.avator,
			professional: user.professional // 作者的专业
		},
		// 回复字段
		replys: []
	}
	
	await db.collection('article').doc(article_id).update({
		comments:dbCmd.unshift(commentObj)
	})

	//返回数据给客户端
	return {
		code:200,
		msg:'数据更新成功'
	}
};

function getID(length) {
	return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}
