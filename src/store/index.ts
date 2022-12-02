import { defineStore } from 'pinia';
import { getList } from '../api';
import type { Data, Children, ChinaAdd, ChinaTotal } from './type';

export const useStore = defineStore('main', {
  state: () => {
    return {
      list: <Data>{},
      item: <Children[]>[],
      chinaAdd: <ChinaAdd>{},
      chinaTotal: <ChinaTotal>{},
    };
  },
  getters: {
  },
  actions: {
    async getList() {
      const result = await getList();
      this.list = result;
      this.chinaAdd = result.diseaseh5Shelf.chinaAdd;
      this.chinaTotal = result.diseaseh5Shelf.chinaTotal;
    },
  },
});
