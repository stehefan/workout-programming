import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import { fixupConfigRules } from '@eslint/compat';

const compat = new FlatCompat();
export default tseslint.config(
    stylistic.configs.customize({
        indent: 4,
        semi: true,
    }),
    eslint.configs.recommended,
    ...fixupConfigRules(
        compat.extends('plugin:@next/next/recommended'),
        compat.extends('plugin:@next/next/core-web-vitals'),
    ),

);
