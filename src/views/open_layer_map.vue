<template>
  <ol-map ref="mapRef" style="height: 100%" :controls="[]">
    <ol-view
      ref="view"
      :center="center"
      :rotation="rotation"
      :zoom="zoom"
      :projection="projection"
    />
    <ol-tile-layer ref="xingtu" 
    title="XINGTU" 
    :visible="xingtu_visible"
    :zIndex=0
    >
      <ol-source-xyz
        crossOrigin="anonymous"
        
        url="https://tiles1.geovisearth.com/base/v1/img/{z}/{x}/{y}?format=webp&tmsIds=w&token=0aeb02f29320b060c2e2d0c04eb4887c6b8d5a8ed479b3aacff2b6a273b0d38d"
      />
    </ol-tile-layer>

    <ol-tile-layer ref="JILIN" 
    title="吉林一号" 
    :visible="JILIN_visible"
    :zIndex=0
    >
      <ol-source-xyz
        crossOrigin="anonymous"
        
        url="https://api.jl1mall.com/getMap/{z}/{x}/{-y}?mk=2d9bf902749f1630bc25fc720ba7c29f&tk=2c24512f36eb651e674e1d4b7d69b449"
      />
    </ol-tile-layer>

    <ol-tile-layer ref="ESRI_layer" 
    title="ESRI影像"
    :visible="ESRI_layer_visible"
    :zIndex=esriIndex
    >
      <ol-source-xyz
        crossOrigin="anonymous"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
    </ol-tile-layer>

    <ol-tile-layer ref="google_layer" 
    title="google影像"
    :visible="google_layer_visible"
    :zIndex=0
    >
      <ol-source-xyz
        crossOrigin="anonymous"
        url="http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}"
      />
    </ol-tile-layer>

    <ol-tile-layer ref="mapbox_layer" 
    :visible="mapbox_layer_visible"
    :zIndex=0
    title="mapbox"
    >
      <ol-source-xyz
        url="https://api.mapbox.com/styles/v1/ruiduobao/clhsti3xz00r001rhctgnfybh/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicnVpZHVvYmFvIiwiYSI6ImNsaHN0MDc3dTExc3IzZ281bzIwMG5haGIifQ._UKtfA26MjZPgh0D_NnFaA"
      />
    </ol-tile-layer>

    <ol-tile-layer ref="GAODE_layer" 
    title="高德影像"
    :visible="GAODE_layer_visible"
    :zIndex=0
    >
      <ol-source-xyz
        url="https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}"
      />
    </ol-tile-layer>

    <ol-tile-layer ref="GAODE_name_layer" 
    title="高德注记"
    :visible="GAODE_name_layer_visible"
    :zIndex=0
    >
      <ol-source-xyz
        url="https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
      />
    </ol-tile-layer>

    <ol-tile-layer ref="bingLayer" 
    title="Bing地图"
    :visible="bingLayer_visible"
    :zIndex=0
    >
      <ol-source-bingmaps
        apiKey="Alszrov8wBjaxruqKteIdI-LC24iM6IbD39yFzaghKlHCM_ZAHc_fdEE-O_oDRf0"
        :imagerySet="'Aerial'"
      />
    </ol-tile-layer> 

    <!-- 画一个矩形框 -->
    <ol-vector-layer
    :zIndex=99>
      <ol-source-vector>
        <ol-feature>
          <ol-geom-polygon :coordinates="[boxCoordinates]"></ol-geom-polygon>
          <ol-style>
            <ol-style-stroke
              :color="strokeColor"
              :width="strokeWidth"
            ></ol-style-stroke>
            <ol-style-fill :color="fillColor"></ol-style-fill>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>


      <!-- 比例尺 -->
    <ol-scaleline-control />
    <!-- 地图全屏 -->
    <ol-fullscreen-control />
      <!-- 缩放组件 -->
    <!-- <ol-zoomslider-control /> -->
    <!-- 经纬度显示 -->
    <ol-mouseposition-control 
    className="showposition"
    projection="EPSG:4326"/>
    <!-- 鼠标右键标记栏 -->
    <ol-context-menu-control :items="contextMenuItems" />
    <ol-vector-layer
    :zIndex=100
    >
        <ol-source-vector ref="markers"> </ol-source-vector>
        <ol-style>
          <ol-style-icon :src="marker" :scale="0.081"></ol-style-icon>
        </ol-style>
    </ol-vector-layer>

  </ol-map>
  
  <div class="basemap-select">
      <el-dropdown @command="handleCommand">
          <el-button type="primary" plain class="buttonfontsize">
          <el-icon class="el-icon--right"><Coin /><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="JILIN">{{t('home.JILIN')}}</el-dropdown-item>
                <el-dropdown-item command="xingtu">{{t('home.XINGTU')}}</el-dropdown-item>
                <el-dropdown-item command="bingLayer">{{t('home.bing')}}</el-dropdown-item>
                <el-dropdown-item command="GAODE_name_layer">{{t('home.GAODE')}}</el-dropdown-item>
                <el-dropdown-item command="GAODE_layer">{{t('home.GAODESAT')}}</el-dropdown-item>
                <el-dropdown-item command="mapbox_layer">mapbox</el-dropdown-item>
                <el-dropdown-item command="google_layer">{{t('home.Google')}}</el-dropdown-item>
                <el-dropdown-item command="ESRI_layer">{{t('home.ESRI')}}</el-dropdown-item>            
              </el-dropdown-menu>
          </template>
        </el-dropdown>
    </div>
</template>

<script setup>
import { ref, onMounted,inject,watchEffect,computed,watch} from "vue";
import { get as getProjection } from 'ol/proj';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { getWidth, getTopLeft } from 'ol/extent';
import { Coin } from '@element-plus/icons-vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import marker from '@/assets/marke.png';
import { useI18n } from "vue-i18n"; 
const { t, locale } = useI18n(); 
// 监测是否需要显示
import { useFileListStore } from '@/stores/fileListStore.js'; 
 
// 这里调用 useFileListStore() 来获取 store 实例
const fileListStore = useFileListStore();
// 获取范围的经度纬度
const min_LONG=ref(0)
const max_LONG=ref(0)
const min_LAN=ref(0)
const max_LAN=ref(0)

watchEffect(() => {
  if ( fileListStore.SELECT_EPSG!=="") {
    const SELECT_EPSG=fileListStore.SELECT_EPSG
    const epsgDataItem = fileListStore.epsgData.find(item => item.EPSG === SELECT_EPSG);

    if (epsgDataItem) {
        // 如果找到了匹配的元素，找到框的经纬度值
        console.log("此时经纬度的值为",epsgDataItem.PlotAeraOfUse)
        min_LONG.value=epsgDataItem.PlotAeraOfUse[0]
        min_LAN.value=epsgDataItem.PlotAeraOfUse[1]
        max_LONG.value=epsgDataItem.PlotAeraOfUse[2]
        max_LAN.value=epsgDataItem.PlotAeraOfUse[3]

    } else {
        // 如果没有找到匹配的元素，可以在这里处理这种情况
        console.log('没有找到匹配的经纬度范围值');
    }

  }
});
// 确保闭合多边形并转为对应的坐标系
const toEPSG3857 = (coord) => {
  const x = coord[0] * 20037508.34 / 180;
  let y = Math.log(Math.tan((90 + coord[1]) * Math.PI / 360)) / (Math.PI / 180);
  y = y * 20037508.34 / 180;
  return [x, y];
};
// 画一个框
const strokeWidth = ref(2);
const strokeColor = ref("red");
const fillColor = ref("rgba(255, 0, 0, 0.2)"); // 设置透明度，以便能看到地图

// 将 boxCoordinates 定义为一个计算属性
const boxCoordinates = computed(() => {
  return [
    [min_LONG.value, min_LAN.value],
    [max_LONG.value, min_LAN.value],
    [max_LONG.value, max_LAN.value],
    [min_LONG.value, max_LAN.value],
    [min_LONG.value, min_LAN.value]
  ].map(coord => toEPSG3857(coord));
});

let esriIndex=ref(0)


// 右键标记初始化
const contextMenuItems = ref([]);
const markers = ref(null);
const view = ref(null);
const Feature = inject("ol-feature");
const Geom = inject("ol-geom");

contextMenuItems.value = [
  {
    text: t('home.setcenter'),
    classname: "some-style-class", // add some CSS rules
    callback: (val) => {
      view.value.setCenter(val.coordinate);
      const currentZoom = view.value.getZoom(); // 获取当前的缩放级别
      view.value.setZoom(currentZoom + 3); // 在当前缩放级别的基础上增加3
    }, // `center` is your callback function
  },
  {
    text: t('home.addmark'),
    classname: "some-style-class", // you can add this icon with a CSS class
    // instead of `icon` property (see next line)
    icon: marker, // this can be relative or absolute
    callback: (val) => {
      console.log(val);
      const feature = new Feature({
        geometry: new Geom.Point(val.coordinate),
      });
      markers.value.source.addFeature(feature);
    },
  },
  "-", // this is a separator
];



// 切换底图函数
const handleCommand = (command) => {
  // 创建一个映射关系，将命令与对应的可见性变量关联起来
  const visibilityMap = {
    xingtu: xingtu_visible,
    JILIN: JILIN_visible,
    bingLayer: bingLayer_visible,
    ESRI_layer: ESRI_layer_visible,
    google_layer: google_layer_visible,
    mapbox_layer: mapbox_layer_visible,
    GAODE_layer: GAODE_layer_visible,
    GAODE_name_layer: GAODE_name_layer_visible
  };

  // 遍历映射关系，根据命令设置可见性
  Object.keys(visibilityMap).forEach(key => {
    if (key === command) {
      visibilityMap[key].value = true;
    } else {
      visibilityMap[key].value = false;
    }
  });
  // 底图切换提示


  const commandNameMap = {
    JILIN: "吉林一号",
    xingtu: "星图地球",
    bingLayer: "Bing地图",
    GAODE_name_layer: "高德注记",
    GAODE_layer: "高德影像",
    mapbox_layer: "mapbox",
    google_layer: "google影像",
    ESRI_layer: "ESRI影像"
  };
  Object.keys( commandNameMap).forEach(key => {
    if (key === command) {
      ElMessage(`底图切换为 ${commandNameMap[key]}`);
    } 
  });
  
};


const rotation = ref(0); // 添加这一行来定义 rotation 变量，默认值设置为 0
const center = ref([11158582, 4813697]);
const projection = ref("EPSG:3857");
const zoom = ref(4);
const layerList = ref([]);

// 定义图层和可视化变量
const xingtu = ref(null);
const xingtu_visible= ref(false);

const JILIN = ref(null);
const JILIN_visible=ref(false)

const bingLayer = ref(null);
const bingLayer_visible=ref(false)

const ESRI_layer = ref(null);
const ESRI_layer_visible = ref(true); 

const google_layer = ref(null);
const google_layer_visible= ref(false);

const mapbox_layer = ref(null);
const mapbox_layer_visible= ref(false);

const GAODE_layer = ref(null);
const GAODE_layer_visible = ref(false); 

const GAODE_name_layer = ref(null);
const GAODE_name_layer_visible= ref(false); 


const mapRef = ref(null);
const mapInstance = ref(null);





onMounted(() => {
//  打印ol-map
  mapInstance.value = mapRef.value;
  console.log("在vue中ol-map打印",mapInstance.value.map)
  // 打印所有图层
  var layers_OL = mapInstance.value.map.getLayers().getArray();
  console.log("所有图层",layers_OL)
  console.log("已有图层1",layers_OL[0])
  console.log("已有图层0的values",layers_OL[0].values_)
  console.log("已有图层0的values的title",layers_OL[0].values_.title)

});
</script>

<style>
.showposition{
  position: absolute;
  right: 0; /* 控制右边距 */
  bottom: 0; /* 控制底部边距 */
}
/* 滑动块 */
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}
.buttonfontsize{
 font-size: 30px;
}

.basemap-select{
  position: absolute;
  right: 3%; /* 控制右边距 */
  top: 90%; /* 控制底部边距 */
  z-index: 2;
}

</style>