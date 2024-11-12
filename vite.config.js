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
      external: ['vue', 'vue-flatpickr-component', '@popperjs/core', 'date-fns', 'date-fns-tz', '@vueup/vue-quill', '@guolao/vue-monaco-editor', 'intl-tel-input', 'k-utils-js', 'lodash', 'ramda', 'vue-multiselect', 'vue-select', 'vuex'],
      output: {
        globals: {
          Vue: 'vue',
        },
      },
    },
  },
  plugins: [vue()],
});
