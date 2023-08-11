module.exports = {
    root: true,
    ignorePatterns: ['node_modules', 'dist'],
    plugins: ['react', 'jsx-a11y', '@typescript-eslint'],
    extends: ['eslint:recommended', 'airbnb', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:jsx-a11y/recommended', 'prettier'],
    rules: {
        'arrow-parens': [
            'error',
            'as-needed',
            {
                requireForBlockBody: true,
            },
        ],
        'no-invalid-this': 'error',
        'prefer-arrow-callback': 'off',
        'react/function-component-definition': [
            'error',
            {
                namedComponents: 'function-declaration',
                unnamedComponents: 'arrow-function',
            },
        ],
        'no-restricted-syntax': [
            'error',
            // The following four selectors prevent the usage of async/await
            {
                selector: 'AwaitExpression',
                message: 'async/await is not allowed',
            },
        ],
        'react/jsx-props-no-spreading': 'off',
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            plugins: ['@typescript-eslint'],
            extends: ['plugin:@typescript-eslint/recommended-type-checked', 'airbnb-typescript', 'prettier'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: './tsconfig.json',
            },
            rules: {
                '@typescript-eslint/no-floating-promises': 'off',
            },
        },
    ],
};
