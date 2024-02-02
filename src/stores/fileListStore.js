// fileListStore.js
import { defineStore } from 'pinia';

export const useFileListStore = defineStore('fileList', {
  state: () => ({
    epsgData: [],
    epsgallData: [],
    SELECT_EPSG:"",
  }),
  actions: {
    setEpsgData(newEpsgData) {
      this.epsgData = newEpsgData;
    },
    appendEpsgData(newData) {
      this.epsgData.push(newData);
    },
    setepsgallData(newepsgallData) {
        this.epsgallData = newepsgallData;
      },
    appendepsgallData(newepsgallData) {
        this.epsgallData.push(newepsgallData);
      },
  },
});