import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

const appSlice = createSlice({
  name: "app",
  initialState: {
    loading: false,
    image: null,
    collections: [],
    collection: {},
    collectionItems: [],
    collectionError: "",
    collectionImage: "",
    collectionItemImage: "",
    collectionItemError: "",
    successSaving: false,
    disableButton: false,
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
    handleGetCollection: (state, action) => {},
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
    handleNewCollectionItem:(state, action) => {},
    handleGetCollectionItems:(state, action) => {},
    handleDeleteCollectionItem:(state, action) => {},
    handleEditCollectionItem:(state, action) => {},
    setCollectionItemImage:(state, action) => {
      return produce(state, (draft) => {
        draft.collectionItemImage = action.payload;
      });
    },
    setCollectionItems:(state, action) => {
      return produce(state, (draft) => {
        draft.collectionItems = action.payload;
      });
    },
    setCollectionItemError:(state, action) => {
      return produce(state, (draft) => {
        draft.collectionItemError = action.payload;
      });
    },
    setCollection: (state, action) => {
      return produce(state, (draft) => {
        draft.collection = action.payload;
      });
    },
    setDisableButton: (state, action) => {
      return produce(state, (draft) => {
        draft.disableButton = action.payload;
      });
    }
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
  handleNewCollectionItem,
  handleGetCollectionItems,
  handleDeleteCollectionItem,
  handleEditCollectionItem,
  setCollectionItemImage,
  setCollectionItems,
  setCollectionItemError,
  handleGetCollection,
  setCollection,
  setDisableButton
} = appSlice.actions;

export default appSlice.reducer;
