  import js from '@eslint/js'
  import globals from 'globals'
  import reactHooks from 'eslint-plugin-react-hooks'
  import reactRefresh from 'eslint-plugin-react-refresh'
  import tseslint from 'typescript-eslint'
  import eslintPluginPrettier from "eslint-plugin-prettier";
  import importEslint from "eslint-plugin-import";
  import vitest from "eslint-plugin-vitest";
  import reactCompiler from "eslint-plugin-react-compiler";
  import tansTackQuery from "@tanstack/eslint-plugin-query";
  import jsxally from 'eslint-plugin-jsx-a11y';
  import prettier from 'eslint-config-prettier'


  export default tseslint.config({
    extends: [js.configs.recommended, ...tseslint.configs.recommended, ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,

    ],
    files: ['**/*.{ts,tsx}'],
    ignores: ['dist'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'typescript-eslint': tseslint,
      "prettier": eslintPluginPrettier,
      "import": importEslint,
      "vitest": vitest,
      "eslint-plugin-react-compiler": reactCompiler,
      "@tanstack/eslint-plugin-query": tansTackQuery,
      '@tanstack/query': tansTackQuery,
      "eslint-plugin-jsx-a11y": jsxally,
      "eslint-plugin-prettier": prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      ...importEslint.configs.recommended.rules,
      ...vitest.configs.recommended.rules,
      ...tansTackQuery.configs.recommended.rules,
      ...prettier.rules,
      "import/no-named-as-default": 0,
    },
  })
