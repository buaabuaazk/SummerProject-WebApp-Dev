function checkEmail(email){
    // 使用正则表达式检查邮箱地址是否以 "buaa.edu.cn" 结尾
    const regex = /^[a-zA-Z0-9._%+-]+@buaa\.edu\.cn$/;
    return regex.test(email);
}

export default checkEmail;