<template>
  <div class="bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl w-full bg-white shadow-lg rounded-lg p-8 space-y-8">
      <!-- Header Section -->
      <div class="flex items-center space-x-6">
        <img class="h-32 w-32 rounded-full object-cover border-2 border-gray-300" src="@/assets/avatar4.png" alt="Avatar">
        <div>
          <h1 class="text-3xl font-bold text-blue-800">{{ profile.nickname }}</h1>
          <p class="text-xl text-gray-700">{{ profile.name }}</p>
          <p class="text-md text-gray-500">{{ profile.education }}</p>
        </div>
      </div>

      <!-- Information Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <label class="block text-sm font-medium text-gray-700">兴趣岗位</label>
          <p class="mt-1 text-gray-900">{{ profile.interestJob }}</p>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <label class="block text-sm font-medium text-gray-700">博客链接</label>
          <a :href="profile.blogLink" class="mt-1 text-blue-600 hover:text-blue-900">{{ profile.blogLink }}</a>
        </div>
        <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <label class="block text-sm font-medium text-gray-700">仓库链接</label>
          <a :href="profile.repoLink" class="mt-1 text-blue-600 hover:text-blue-900">{{ profile.repoLink }}</a>
        </div>
      </div>

      <!-- Resume Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <label class="block text-sm font-medium text-gray-700">上传简历</label>
          <input type="file" @change="handleFileUpload" class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700">
          <button @click="uploadResume" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            上传简历
          </button>
        </div>

        <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center flex flex-col justify-center">
          <button @click="downloadResume" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            下载简历
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
const profile = ref({
  nickname: 'JohnDoe',
  name: 'John Doe',
  education: 'Bachelor of Science in Computer Science',
  interestJob: 'Frontend Developer',
  blogLink: 'https://example.com',
  repoLink: 'https://github.com/johndoe',
  avatar: 'https://via.placeholder.com/150', // You can replace this with the actual avatar URL
  file: null
});

const handleFileUpload = (event) => {
  profile.value.file = event.target.files[0];
  console.log('Uploaded file:', profile.value.file);
  // Handle file upload logic here
};

const uploadResume = () => {
  // 创建一个 FormData 对象
  const formData = new FormData();
  const fileInput = document.querySelector('input[type=file]'); // 通过选择器获取文件上传 input

  // 将文件添加到 FormData 中
  formData.append('file', profile.value.file); // 使用 Composition API 中的 file 属性

  axios.post('http://8.130.25.189:8000/api/user/resume', formData, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIxOTQ5MzAwLCJpYXQiOjE3MTg5MjUzMDAsImp0aSI6IjM5NjAwMjI3ZGUzZDQ1YTY4MDYzZjFkYTg1ZGJjMGIwIiwidXNlcl9pZCI6MX0.Rm_tZnQ9zcg9qLwWtEAjdjIj0J6zo0SqFiWMdB5ntdQ'
          }
        })
          .then(response => {
            console.log('1111111')
            alert('简历上传成功！')
          })
          .catch(error => {
            console.log(error)
          })
};

const downloadResume = () => {
  const link = document.createElement('a');
  link.href = 'path_to_resume.pdf'; // Replace with the actual path to the resume file
  link.download = 'resume.pdf';
  link.click();
};
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
.bg-gray-100 {
  background-color: #f7fafc;
}
.bg-white {
  background-color: #ffffff;
}
.bg-gray-50 {
  background-color: #f9fafb;
}
.border-gray-200 {
  border-color: #e5e7eb;
}
.text-gray-500 {
  color: #6b7280;
}
.text-gray-700 {
  color: #374151;
}
.text-gray-900 {
  color: #111827;
}
.text-blue-800 {
  color: #1e3a8a;
}
.text-blue-600 {
  color: #2563eb;
}
.text-blue-700 {
  color: #1d4ed8;
}
</style>
