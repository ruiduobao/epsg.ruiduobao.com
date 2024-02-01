<template>
  <div class="search_login">
    <el-autocomplete
      class="search_DIV"
      v-model="state"
      :fetch-suggestions="querySearch"
      popper-class="my-autocomplete"
      :placeholder="t('home.search_text')"
      @select="handleSelect"
    >
      <template #default="{ item }">
        <div class="value">{{ item.value }}</div>
      </template>
    </el-autocomplete>
    
    <!-- <el-button class="buttonsearch" @click="handleIconClick" type="primary">搜索</el-button> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
// 引入语言包配置
import { useI18n } from "vue-i18n"; 


interface SearchItem {
  value: string;
  tag: string;
  link: string;
}
import { useFileListStore } from '@/stores/fileListStore.js'; 

export default defineComponent({
  name: 'SearchComponent',
  setup() {
    const state = ref('');
    const links = ref<SearchItem[]>([]);
    const { t, locale } = useI18n();  
    onMounted(async () => {
      try {
        const response = await fetch('/search_file/searchinformation.json');
        links.value = response.ok ? await response.json() : [];
      } catch (error) {
        console.error('Failed to load links:', error);
      }
    });

    const querySearch = async (queryString: string, cb: (results: SearchItem[]) => void) => {
      cb(queryString ? links.value.filter(createFilter(queryString)) : []);
    };

    const createFilter = (queryString: string) => (item: SearchItem) =>
      item.value.toLowerCase().includes(queryString.toLowerCase()) ||
      item.tag.toLowerCase().split(',').some(tag => tag.trim().includes(queryString.toLowerCase()));

      // fileListStore是一个列表，存着返回数据的EPSG、Name、AreaOfUse、PlotAeraOfUse、Search_infomation、PROJJSON等参数
      const fileListStore = useFileListStore();
      const handleSelect = async (item) => {
        console.log("Selected item link:", item.link);
        // 发送请求到后端
        try {
          const response = await fetch(item.link);
          
          // 检查响应状态
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          // 解析JSON响应
          const data = await response.json();
        

        fileListStore.appendepsgallData({EPSG: data.EPSG,data:data})

        // 更新Pinia store的状态，把新数据添加到列表中
        fileListStore.appendEpsgData({
          EPSG: data.EPSG,
          Name: data.Name,
          AreaOfUse: data.AreaOfUse,
          PlotAeraOfUse: data.PlotAeraOfUse,
          Search_infomation: data.Search_infomation,
          PROJJSON: data.PROJJSON
        });
        } catch (error) {
          // 处理错误
          console.error('There was an error fetching the EPSG data:', error);
        }
      };



    const handleIconClick = () => {
      console.log('Search icon clicked');
    };

    return {
      state,
      querySearch,
      handleSelect,
      handleIconClick,
      fileListStore,
      t, 
      locale,
    };
  }
});
</script>

<style>
.search_login {
  display: flex; /* 使用flex布局 */
  flex-direction: row; /* 项目排列方向为横向 */
  align-items: center; /* 项目在交叉轴上居中对齐 */
  width: 100%; /* 占满父容器的宽度 */
  margin: 0; /* 外边距为0 */
  padding: 0; /* 内边距为0 */
}

.search_DIV {

  width: 100%;
  /* margin-right: 20px; */
}
.buttonsearch{
  width: 20%;
  
}
.login {
  flex: 4; /* flex布局下，占据剩余空间的4份 */
  text-align: right; /* 文本向右对齐 */
}


</style>