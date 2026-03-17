import { fileURLToPath, URL } from 'node:url'
import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import vueDevTools from 'vite-plugin-vue-devtools'
import checker from 'vite-plugin-checker'
import tailwindcss from '@tailwindcss/vite'
import eslint from 'vite-plugin-eslint'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig(
  (): UserConfig => ({
    base: process.env.VITE_BASE,
    // base: './',
    // base: '/sds/',
    plugins: [
      {
        ...eslint({
          failOnError: false,
          failOnWarning: false,
        }),
        apply: 'build',
        enforce: 'pre',
      },
      vue(),
      vueJsx(),
      // vueDevTools(),
      checker({
        typescript: true,
        vueTsc: {
          tsconfigPath: './tsconfig.json',
        } /** or an object config */,
      }),
      tailwindcss(),
      basicSsl(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 8000,
      host: true,
      allowedHosts: ['localhost', 'view-localhost'],
      // https: {
      //   insecureHTTPParser: true,
      // },
      https: false, // 이 줄 추가
    },
    preview: {
      port: 9000,
      host: true,
      // https: {
      //   insecureHTTPParser: true,
      // },
      https: false, // 이 줄 추가
    },
  })
) 