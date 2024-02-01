import { createI18n } from 'vue-i18n'

const messages = {
    EN: {
        home: {
            search_text: 'EPSG ID or name',
            left_panel_NAME: 'Coordinate table',
            right_panel_NAME: 'More',
            left_panel_table_first: 'name',
            left_panel_table_second: 'EPSG',
            left_panel_table_third: 'bound',
            load_BTN: 'Load this EPSG',
            JILIN:'JILIN_map',
            XINGTU:'geovis_map',
            bing:'bing_map',
            GAODE:'gaode_map',
            GAODESAT:'gaode_satellite',
            Google:'Google_satellite',
            ESRI:'ESRI World image',
            setcenter:'Set Center',
            addmark:'Add Mark',
        },
    },
    ZH: {
        home: {
            search_text: 'EPSG编号或者坐标系名称',
            left_panel_NAME: '相关坐标系',
            right_panel_NAME: '详细参数',
            left_panel_table_first: '名称',
            left_panel_table_second: 'EPSG编号',
            left_panel_table_third: '可用经纬度范围',
            load_BTN: '范围加载',
            JILIN:'吉林一号',
            XINGTU:'星图地球',
            bing:'必应地图',
            GAODE:'高德注记图',
            GAODESAT:'高德影像',
            Google:'Google影像',
            ESRI:'ESRI影像',
            setcenter:'Set Center',
            addmark:'Add Mark',
        }
    }
}

const i18n = createI18n({
    legacy: false, // VUE3 组合式API
    locale: 'ZH', // 默认cn语言环境
    fallbackLocale: 'EN',  //备用语言环境
    messages
})

export default i18n