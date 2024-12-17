/* eslint-disable */
import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import oxlint from "eslint-plugin-oxlint";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"],
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
  },

  ...pluginVue.configs["flat/essential"],
  ...vueTsEslintConfig(),
  oxlint.configs["flat/recommended"],
  skipFormatting,

  ...compat.extends("eslint-config-airbnb-base"),
  {
    rules: {
      "no-magic-numbers": "off",
      "no-throw-literal": "off",
      "import/no-unresolved": "off",
      "import/extensions": "off",
      "import/no-cycle": "warn",
      "import/no-extraneous-dependencies": "off",
      indent: "off",
      "vue/html-self-closing": "off",
      "vue/multi-word-component-names": "off",
      "vue/no-multiple-template-root": "off",
      "vue/singleline-html-element-content-newline": "off",
      quotes: ["error", "double"],
    },
  },
];
