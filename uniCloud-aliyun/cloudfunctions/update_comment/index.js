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
		content,
		// 评论id
		comment_id = ''
	} = event

	let user = await db.collection('user').doc(user_id).get()
	// 获取用户对象
	user = user.data[0]

	// 获取当前的文章信息
	const article = await db.collection('article').doc(article_id).get()
	// 获取文章下的所有评论
	const comments = article.data[0].comments
	
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
			avatar: user.avatar,
			professional: user.professional // 作者的专业
		},
		// 回复字段
		replys: []
	}
	// 评论文章
	if(comment_id === ''){
		commentObj.replys = []
		commentObj = dbCmd.unshift(commentObj)
	} else {
		// 回复对文章的评论
		// 获取评论索引
		let commentIndex = comments.findIndex(item => item.comment_id === comment_id)
		// 获取作者信息
		let commentAuthor = comments.find(item => item.comment_id === comment_id)
		commentAuthor = commentAuthor.author.author_name
		commentObj.to = commentAuthor
		
		// 更新回复信息
		commentObj = {
			[commentIndex] : {
				replys:dbCmd.unshift(commentObj)
			}
		}
	}
	await db.collection('article').doc(article_id).update({
		comments:commentObj
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
