<template>
    <div class="search-page">
      <div class="search-bar">
        <a-input-search
            v-model:value="input"
            placeholder="input search text"
            enter-button="Search"
            size="large"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @search="search"
            style="background-color: #1890ff; border-color: #1890ff; color: #fff; width: 40rem; margin-left: 20rem;"
            />
        </div>
        <div style="width: 40rem; margin-left: 20rem;">
            <a-divider style="height: 2px; background-color: #7cb305;" />
            <el-button type="primary" style="margin-left: 8rem;">综合</el-button>
            <el-button type="primary" style="margin-left: 21rem;">职位</el-button>
        </div>
        <div style="height: 2rem;">
            <div class="flowing-text">
                <span v-for="(char, index) in visibleText" :key="index">{{ char }}</span>
            </div>
        </div>
        <div class="search-results">
            <div>
                <a-card title="公司" style="width: 40rem; margin-left: 20rem;">
                    <template #extra><a href="#">more</a></template>
                    <p>公司简介</p>
                </a-card>
            </div>
            <div style="width: 40rem; margin-left: 40rem;">
                具体结果
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted} from 'vue';

const input = ref('')
const results = ref([]);

const getSearchResult = () => {

};

const text = '今天的工作是为了明天更好的工作doge';
const visibleText = ref('');
const intervalTime = 200; // 每个字符显示的时间间隔，单位毫秒
const disappearTime = 2000; // 字符串全部显示后消失的时间，单位毫秒

const startFlowingText = () => {
  let currentIndex = 0;
  visibleText.value = '';

  const intervalId = setInterval(() => {
    if (currentIndex < text.length) {
      visibleText.value += text[currentIndex];
      currentIndex++;
    } else {
      clearInterval(intervalId);
      setTimeout(() => {
        visibleText.value = '';
        startFlowingText(); // 重新开始显示
      }, disappearTime);
    }
  }, intervalTime);
};

onMounted(() => {
  startFlowingText();
});
  </script>
  
  <style scoped>
  .search-page {
    padding: 20px;
  }
  
  .search-bar {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .search-bar input {
    flex: 1;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .search-bar button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .search-bar button:hover {
    background-color: #0056b3;
  }
  
  .search-results ul {
    list-style: none;
    padding: 0;
  }
  
  .search-results li {
    margin-bottom: 20px;
  }
  
  .search-results a {
    font-size: 18px;
    color: #007bff;
    text-decoration: none;
  }
  
  .search-results a:hover {
    text-decoration: underline;
  }
  
  .search-results p {
    margin: 5px 0 0;
  }

  .flowing-text {
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  margin-left: 30rem;
}

.flowing-text span {
  opacity: 0;
  animation: fadeIn 0.5s forwards;
  justify-content: center;
  align-items: center;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
  </style>
  