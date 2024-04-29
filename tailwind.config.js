/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html'], // Chemins vers les fichiers HTML dans lesquels Tailwind CSS devrait rechercher les classes non utilisées
  theme: {
    extend: {
      // colors: {
      //   // Définir de nouvelles couleurs ou étendre les couleurs existantes
      //   primary: '#ff0000',
      //   secondary: '#00ff00',
      // },
      // fontFamily: {
      //   // Définir de nouvelles familles de polices ou étendre les familles existantes
      //   sans: ['Inter', 'Arial', 'sans-serif'],
      //   serif: ['Georgia', 'Times New Roman', 'serif'],
      // },
      // fontSize: {
      //   // Définir de nouvelles tailles de police ou étendre les tailles existantes
      //   '5xl': '2.5rem',
      //   '7xl': '5rem',
      // },
    },
  },
  plugins: [
    // // Ajouter des plugins Tailwind CSS supplémentaires
    // // Par exemple, vous pouvez ajouter un plugin pour la prise en charge des variantes de hover
    // require('@tailwindcss/typography'), // Ajoute la prise en charge de la typographie
    // require('@tailwindcss/forms'), // Ajoute la prise en charge des formulaires
    // require('@tailwindcss/aspect-ratio'), // Ajoute la prise en charge des ratios d'aspect
  ],
};

