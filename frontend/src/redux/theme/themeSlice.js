// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     theme: 'light',
// }

// const themeSlice = createSlice({
//     name: 'theme',
//     initialState,
//     reducers: {
//         toggleTheme: (state) => {
//             state.theme = state.theme === 'light' ? 'dark' : 'light';
//         }
//     }
// }) 

// export const {toggleTheme} = themeSlice.actions 

// export default themeSlice.reducer 


import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  if (localStorage.getItem('theme')) {
    return localStorage.getItem('theme');
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const initialState = {
  theme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);

      // Appliquer la classe 'dark' sur le <html>
      if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
