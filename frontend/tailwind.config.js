/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js", // ← Important pour Flowbite
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e40af", // ← Exemple de couleur personnalisée
      },
    },
  },
  plugins: [
    require('flowbite/plugin'), // ← Active Flowbite
  ],
}


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