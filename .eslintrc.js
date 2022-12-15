module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:react/recommended', 'standard', 'prettier'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        semi: [1, 'never'],
        'space-before-function-paren': [
            'error',
            { anonymous: 'always', named: 'never' }
        ],
        'multiline-ternary': 'off',
        quotes: [
            'error',
            'single',
            {
                allowTemplateLiterals: false,
                avoidEscape: true
            }
        ]
    }
}
