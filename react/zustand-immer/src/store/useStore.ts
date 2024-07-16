// src/store/useStore.ts
import { create } from 'zustand';
import { produce } from 'immer';

interface StoreState {
  data1: string[];
  data2: string[];
  addData1: (item: string) => void;
  addData2: (item: string) => void;
  resetData: () => void;
}

const useStore = create<StoreState>((set) => ({
  data1: [],
  data2: [],

  addData1: (item: string) =>
    set(produce((state: StoreState) => { state.data1.push(item); })),
  addData2: (item: string) =>
    set(produce((state: StoreState) => { state.data2.push(item); })),
  resetData: () =>
    set(produce((state: StoreState) => {
      state.data1 = [];
      state.data2 = [];
    })),
}));

export default useStore;
