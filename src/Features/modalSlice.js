import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  isOpen1:false,
  isOpen2:false,
  isOpen3:false,
  isOpen4:false
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
    },
    openModal1: (state, action) => {
      state.isOpen1 = true;
    },
    closeModal1: (state, action) => {
      state.isOpen1 = false;
    },
    openModal2: (state, action) => {
      state.isOpen2 = true;
    },
    closeModal2: (state, action) => {
      state.isOpen2 = false;
    },
    openModal3: (state, action) => {
      state.isOpen3 = true;
    },
    closeModal3: (state, action) => {
      state.isOpen3 = false;
    },
    openModal4: (state, action) => {
      state.isOpen4 = true;
    },
    closeModal4: (state, action) => {
      state.isOpen4 = false;
    },
  },
});

export const { openModal, closeModal, openModal1, closeModal1, openModal2, closeModal2, openModal3, closeModal3, openModal4, closeModal4 } = modalSlice.actions;

export default modalSlice.reducer;