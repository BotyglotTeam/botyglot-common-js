import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: false,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/entry.js'),
      name: 'BotyglotCommonJs',
      fileName: 'botyglot-common-js'
    },
    rollupOptions: {
      external: ['vue', 'vue-flatpickr-component'],
      output: {
        globals: {
          Vue: 'vue',
        },
      },
    },
  },
  plugins: [vue()],
});
