/*
 * @Date: 2024-06-25 15:32:48
 * @Author: Q9K
 * @Description: 检查邮箱是否合法
 */
function checkEmail(email) {
  // 使用正则表达式检查邮箱地址是否以 "buaa.edu.cn" 结尾
  const regex = /^[a-zA-Z0-9._%+-]+@buaa\.edu\.cn$/
  return regex.test(email)
}

export default checkEmail
