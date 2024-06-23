/*
 * @Date: 2024-06-23 12:23:59
 * @Author: Q9K
 * @Description: 登录接口
 */

import axios from 'axios'
export default function login(username, password) {
  axios({
    method: 'post',
    url: '',
    data: {
      username,
      password
    }
  }).then((res) => {})
}
