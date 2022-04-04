import { createSlice } from '@reduxjs/toolkit';
import produce from 'immer'


const appSlice = createSlice({
    name: 'app',
    initialState: {
        loading: false,
        image: null,
        collections: [],

    },
    reducers: {
        setLoading: (state, action) => {
            return produce(state, draft => {
                draft.loading = action.payload;
            });
        },
        handleNewCollection: (state, action) => {},
        setImage: (state, action) => {
            return produce(state, (draft) => {
                draft.image = action.payload;
            })
        },
        handleGetCollections: (state, action) => {},
        setCollections: (state, action) => {
            return produce(state, (draft) => {
                draft.collections = action.payload;
            })
        }

    }
});

export const { setLoading, handleNewCollection, setImage, handleGetCollections, setCollections } = appSlice.actions;

export default appSlice.reducer;