<template>
  <div v-if="response2" class="gsonshow">
    <vue-json-pretty
      :deep="4"
      :data="response2"
    >
    </vue-json-pretty>
  </div>
</template>

<script setup>
import { defineComponent, ref,watchEffect } from 'vue';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { useFileListStore } from '@/stores/fileListStore.js'; 

// 这里调用 useFileListStore() 来获取 store 实例
const fileListStore = useFileListStore();



// 访问 store 中的第一个元素
const response2 = ref(null);

watchEffect(() => {
  // 数据存在且指定epsg不存在，则默认加载第一个
  if (fileListStore.SELECT_EPSG=="") {

    response2.value = fileListStore.epsgallData[0].data;
  }
  // 数据存在且指定epsg存在，则加载相关的坐标系数据
  if ( fileListStore.SELECT_EPSG!=="") {
    const SELECT_EPSG=fileListStore.SELECT_EPSG
    const epsgDataItem = fileListStore.epsgallData.find(item => item.EPSG === SELECT_EPSG);

    if (epsgDataItem) {
        // 如果找到了匹配的元素，epsgDataItem.data 将是我们要找的data属性
        response2.value=epsgDataItem.data;
    } else {
        // 如果没有找到匹配的元素，可以在这里处理这种情况
        console.log('没有找到匹配的EPSG值');
    }

  }
});
</script>
<style>
.gsonshow{

  /* 设置 div 的最大高度 */
  max-height: 400px; 

  /* 添加滚动条 */
  overflow-y: auto; /* 使用 'scroll' 来使滚动条始终可见 */
}
</style>