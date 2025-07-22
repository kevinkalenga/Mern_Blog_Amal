import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // L'utilisateur n'existe pas encore
    currentUser: null,
    error: null,
    loading: false
}

// Création de slice 
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        // au debut
        signInstart: (state) => {
            state.loading =  true,
            state.error = null
        },
        // resussie
        signInSuccess: (state, action) => {
            // payload parle de données de l'utilisateur
            state.currentUser = action.payload;
            state.loading = false,
            state.error = null
        },
        // Echec
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart: (state) => {
            state.loading = true;
            state.error = null
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateFailure: (state, action) => {
            
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart: (state) => {
            state.loading = true;
            state.error = null
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false
            state.error = null
        },
        deleteUserFailure: (state, action) => {
            
            state.loading = false;
            state.error = action.payload;
        },

    }
})

export const 
   {
    signInstart, 
    signInSuccess, 
    signInFailure, 
    updateStart, 
    updateSuccess, 
    updateFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure
} = userSlice.actions;
// exporte reducer dans store.js et renome comme c'est un export default
export default userSlice.reducer