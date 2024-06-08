// 云函数入口文件 index.js
const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  
  // 解密微信运动数据
  const weRunData = event.weRunData.data

  return {
    openid: wxContext.OPENID,
    stepInfoList: weRunData.stepInfoList
  }
}
