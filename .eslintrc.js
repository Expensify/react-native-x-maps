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
            {
                selector: 'FunctionDeclaration[async=true]',
                message: 'async functions are not allowed',
            },
            {
                selector: 'FunctionExpression[async=true]',
                message: 'async functions are not allowed',
            },
            {
                selector: 'ArrowFunctionExpression[async=true]',
                message: 'async functions are not allowed',
            },
            {
                selector: 'MethodDefinition[async=true]',
                message: 'async methods are not allowed',
            },
        ],
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
        },
    ],
};
