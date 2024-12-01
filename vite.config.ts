import { fileURLToPath, URL } from 'node:url'


import vue from '@vitejs/plugin-vue'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })

import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    console.log(env.API_URL)
    return {
        plugins: [
              vue(),
            ],
            resolve: {
              alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
              }
            },
          define: {
            'process.env.API_HOST': env.API_HOST,
            'process.env.API_PORT': env.API_PORT
            // If you want to exposes all env variables, which is not recommended
            // 'process.env': env
        },
    };
});

