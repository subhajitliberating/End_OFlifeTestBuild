// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     // Adjust chunk size warning limit to 1000 KB (1 MB)
//     chunkSizeWarningLimit: 1000, // Set this to 1MB or any size you're comfortable with

//     rollupOptions: {
//       output: {
//         // This will help split node_modules libraries into separate chunks
//         manualChunks(id) {
//           // Check if the module is from node_modules
//           if (id.includes('node_modules')) {
//             // Split third-party libraries into separate chunks based on their name
//             return id.split('node_modules/')[1].split('/')[0]
//           }
//         }
//       }
//     }
//   }
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/End_OFlifeTestBuild/', // Set the base path for GitHub Pages
  build: {
    chunkSizeWarningLimit: 1000, // Set chunk size warning limit to 1 MB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split third-party libraries into separate chunks
            return id.split('node_modules/')[1].split('/')[0];
          }
        },
      },
    },
  },
});