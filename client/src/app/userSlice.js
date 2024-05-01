// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    id: null,
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loggedInSuccess(state, action) {
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.isLoggedIn = true;
        },
        loggedOutSuccess(state) {
            state.email = null;
            state.id = null;
            state.isLoggedIn = false;
        },
    },
});

export const { loggedInSuccess, loggedOutSuccess } = userSlice.actions;
export default userSlice.reducer;