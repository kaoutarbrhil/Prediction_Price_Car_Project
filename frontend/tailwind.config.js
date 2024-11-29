/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {colors: {
      // Vous pouvez étendre les couleurs ici si nécessaire pour le mode sombre
      dark: '#1a202c', // Exemple de couleur sombre
    },},
  },
  plugins: [],
}


