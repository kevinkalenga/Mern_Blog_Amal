// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/flowbite/**/*.js", // ← Important pour Flowbite
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: "#1e40af", // ← Exemple de couleur personnalisée
//       },
//     },
//   },
//   plugins: [
//     require('flowbite/plugin'), // ← Active Flowbite
//   ],
// }

///////////////////////////////////


// import flowbiteReact from "flowbite-react/plugin/tailwindcss";

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     ".flowbite-react\\class-list.json"
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [flowbiteReact],
// }


// const flowbite = require("flowbite-react/tailwind");

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './index.html',
//     './src/**/*.{js,ts,jsx,tsx}',     
//     'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
//     flowbite.content(),
//   ],
//   plugins: [
//     // ...
//      flowbite.plugin(),
//     // require('flowbite/plugin')
    
//   ],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/line-clamp'),
    
  ],
}


