<template>

  <div class="maintoolconfig">
        <div id="left-panel" :style="{ width: leftWidth + '%' }">
          <LEFT_VIEW></LEFT_VIEW>
        </div>
        <!-- 分隔线 -->
        <div ref="separator" id="separator" @mousedown="startResize"></div>
        <div id="right-panel" :style="{ width: rightWidth + '%' }">
          <open_layer_map />
        </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineComponent, onMounted, ref, type Ref } from "vue";
  
  import LEFT_VIEW from "@/views/LEFT_VIEW.vue";
  import open_layer_map from "@/views/open_layer_map.vue";
  
  // 左右面板宽度百分比
  const leftWidth = ref<number>(50);
  const rightWidth = ref<number>(50);
  // 创建 separator 的响应式引用
  const separator: Ref<HTMLElement | null> = ref(null);
  
  // 拖动操作时更新面板宽度
  const startResize = (event: MouseEvent) => {
    if (!separator.value) {
      return;
    }
  
    event.preventDefault();
    const startX = event.clientX;
    const startLeftWidth = leftWidth.value;
    const containerWidth = separator.value.parentElement!.offsetWidth;
  
    const doResize = (moveEvent: MouseEvent) => {
      const currentX = moveEvent.clientX;
      const deltaX = currentX - startX;
      const newLeftWidth = ((startLeftWidth * containerWidth) / 100 + deltaX) / containerWidth * 100;
      leftWidth.value = Math.max(5, Math.min(95, newLeftWidth));
      rightWidth.value = 100 - leftWidth.value;
    };
  
    const stopResize = () => {
      window.removeEventListener('mousemove', doResize);
      window.removeEventListener('mouseup', stopResize);
    };
  
    window.addEventListener('mousemove', doResize);
    window.addEventListener('mouseup', stopResize);
  };
  
  onMounted(() => {
    if (!separator.value) {
      console.error('Separator element is not found');
      return;
    }
  
    // 现在可以安全地使用 separator.value.parentElement!
  });
  </script>
    
  <style>
  * {
      box-sizing: border-box; /* 确保 padding 和 border 都包含在宽度计算中 */
    }
  [data-v-app] {
    margin: 0 !important; /* 使用 !important 确保覆盖其他样式 */
    padding: 0 !important; /* 使用 !important 确保覆盖其他样式 */
  }
  
  html,  body {
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
  }
  
  .maintoolconfig {
    display: flex;
    flex-direction: row;
    height: 100vh; /* 使用视口高度确保铺满整个屏幕的高度 */
    width: 100vw; /* 使用视口宽度确保铺满整个屏幕的宽度 */
    margin: 0%;
    padding: 0%;
    border: 1px solid black;
  }
  
  
  #left-panel, #right-panel {
    height: 100%;
    border: 1px solid black;
  }
  
  #separator {
    background-color: #aaa;
    cursor: col-resize;
    width: 5px;
    height: 100%;
  }
  </style>
    