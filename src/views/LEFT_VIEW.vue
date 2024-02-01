<template>
    <div class="top">
        <div class="image-center">
            <el-image :src="epsg_logo" :fit='scale-down' style="width: 179px; height: 100px"></el-image>
            <!-- 切换语言 -->
        </div>
        <div class="switch">
            <el-radio-group v-model="lanradio" size="small" class="lanswitch">
                <el-radio-button label="ZH" />
                <el-radio-button label="EN" />
            </el-radio-group>
        </div>
    </div>
    <Search_Component />
    <el-tabs type="border-card" class="showlist">
        <el-tab-pane :label="t('home.left_panel_NAME')">
                <!-- 直接将 fileListStore.epsgData 传递给 el-table -->
                <el-table :data="fileListStore.epsgData" style="width: 100%"   
                @current-change="handleRowClick"  
                highlight-current-row>
                    <el-table-column prop="Name" :label="t('home.left_panel_table_first')" width="180" />
                    <el-table-column prop="EPSG" :label="t('home.left_panel_table_second')" width="180" />
                    <el-table-column prop="AreaOfUse" :label="t('home.left_panel_table_third')" />
                </el-table>
        </el-tab-pane>
        <el-tab-pane :label="t('home.right_panel_NAME')">
                <gson_view />
        </el-tab-pane>
    </el-tabs>
    <div class="loadbound">
        <el-button @click="loadFile" type="primary">{{t("home.load_BTN")}}</el-button>
    </div>
</template>
  

<script  setup>
import Search_Component from '@/views/Search_Component.vue'
import gson_view from '@/views/gson_view.vue'
import epsg_logo from '@/assets/epsg_logo.png'
import { useFileListStore } from '@/stores/fileListStore.js'; 
import {ref,watch} from 'vue'

// 引入语言包配置
import { useI18n } from "vue-i18n"; 
const { t, locale } = useI18n();  
// 默认中文
const lanradio = ref("ZH")

// 观测 lanradio 的变化
watch(lanradio, (newValue, oldValue) => {
  console.log(`lanradio changed from ${oldValue} to ${newValue}`);
  // 切换语言环境
  locale.value = newValue === 'ZH' ? 'ZH' : 'EN';
})

const fileListStore = useFileListStore();

// 选中行的数据
const currentRow=ref(null)
// 更新 handleRowClick 函数，保存当前选中的行
const handleRowClick = (newCurrentRow) => {
  currentRow.value = newCurrentRow;
  console.log(`当前选中行：${JSON.stringify(newCurrentRow)}`);
};

// 事件处理函数：更新 map_show_status 属性
const loadFile = () => {
  if (currentRow.value) {
    fileListStore.SELECT_EPSG=currentRow.value.EPSG
  } else {
    console.log('没有选中的行');
  }
};


</script>
<style scoped> 
.top {
  display: flex;
  justify-content: space-between; /* 分隔子元素：图片居中，语言切换按钮组在最右边 */
  align-items: center;
  margin-bottom: 20px;
}

.image-center {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.switch {
  display: flex;
}

.lanswitch {
  margin-right: 0px;
}
.showlist{
    margin-top: 20px;
}
.loadbound{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

}


</style>