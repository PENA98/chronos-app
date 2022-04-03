import { createSlice } from '@reduxjs/toolkit';
import produce from 'immer';



const authSlice = createSlice({
    name: 'auth',
    initialState: {
        signUpUser: {},
    },
    reducers: {
        handleSignUp: (state, action) => {},
        setSignUpUser: (state, action) => {
            produce(state, (draft) => {
                draft.signUpUser = action.payload;
            });
        }
    }
});


export const { handleSignUp ,setSignUpUser } = authSlice.actions;

export default authSlice.reducer;