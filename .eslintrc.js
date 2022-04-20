module.exports = {
    root: true,
    env: {
        node: true,
        'vue/setup-compiler-macros': true
    },
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/airbnb',
        '@vue/typescript/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        semi: [2, 'never'],
        'space-before-function-paren': [2, 'always'],
        indent: [2, 4],
        'comma-dangle': [0, 'ignore'],
        'object-curly-newline': [0, 'ignore'],
        '@typescript-eslint/ban-ts-comment': [0, 'ignore'],
        'max-len': [0, 150],
        '@typescript-eslint/no-this-alias': [0, 'ignore'],
        'no-param-reassign': [0, 'ignore'],
        'no-lonely-if': [0, 'ignore'],
        '@typescript-eslint/no-explicit-any': [0, 'ignore'],
        'vuejs-accessibility/click-events-have-key-events': [0, 'ignore'],
        'no-restricted-syntax': [0, 'ignore'],
        'arrow-body-style': [0, 'ignore'],
        'prefer-template': [0, 'ignore'],
        '@typescript-eslint/no-unused-vars': [0, 'ignore'],
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)',
            ],
            env: {
                mocha: true,
                'vue/setup-compiler-macros': true
            },
        },
    ],
}
