/*
 * @Author: aliyun0459792885-nakAm 1308199540@qq.com
 * @Date: 2024-06-24 14:29:21
 * @LastEditors: aliyun0459792885-nakAm 1308199540@qq.com
 * @LastEditTime: 2024-06-24 14:54:13
 * @FilePath: /frontend/tailwind.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'

export default {
  content: ['./src/**/*.{html,js,vue}', './index.html','node_modules/preline/dist/*.js'],
  theme: {
    extend: {}
  },
  plugins: [forms,require('preline/plugin')]
}
