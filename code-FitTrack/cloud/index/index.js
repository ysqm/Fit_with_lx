// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  // 根据用户提交的cloudid 获取对应的运动数据
  let weRunData = event.weRunData
  //同步运动数据
  let res = await GrowthValue(weRunData.data.stepInfoList)
  return weRunData.data.stepInfoList
}
