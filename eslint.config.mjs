// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs, configureVueProject } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

configureVueProject({
  tsSyntaxInTemplates: true,
  scriptLangs: ['ts', 'js', 'tsx', 'jsx'],
  rootDir: import.meta.dirname,
  ignores: ['node_modules/*', '!src/**/*'],
})

export default defineConfigWithVueTs(
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommendedTypeChecked,
  vueTsConfigs.strictTypeChecked,
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      'prettier/prettier': 0, //prettier off
      'no-console': 'off',
    },
    ignores: ['node_modules/*', '!src/**/*'],
  },
  skipFormatting
) 