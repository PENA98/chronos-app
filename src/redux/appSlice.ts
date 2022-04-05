import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

const appSlice = createSlice({
  name: "app",
  initialState: {
    loading: false,
    image: null,
    collections: [],
    collectionError: "",
    collectionImage: "",
    successSaving: false,
  },
  reducers: {
    setLoading: (state, action) => {
      return produce(state, (draft) => {
        draft.loading = action.payload;
      });
    },
    handleNewCollection: (state, action) => {},
    setImage: (state, action) => {
      return produce(state, (draft) => {
        draft.image = action.payload;
      });
    },
    handleGetCollections: (state, action) => {},
    setCollections: (state, action) => {
      return produce(state, (draft) => {
        draft.collections = action.payload;
      });
    },
    deleteCollectionHandler: (state, action) => {},
    setCollectionError: (state, action) => {
      return produce(state, (draft) => {
        draft.collectionError = action.payload;
      });
    },
    setCollectionImage: (state, action) => {
      return produce(state, (draft) => {
        draft.collectionImage = action.payload;
      });
    },
    setSuccessSaving: (state, action) => {
      return produce(state, (draft) => {
        draft.successSaving = action.payload;
      });
    },
    handleCollectionEdit: (state, action) => {},
  },
});

export const {
  setLoading,
  handleNewCollection,
  setImage,
  handleGetCollections,
  setCollections,
  deleteCollectionHandler,
  setCollectionError,
  setCollectionImage,
  setSuccessSaving,
  handleCollectionEdit,
} = appSlice.actions;

export default appSlice.reducer;
