module.exports = {
    root: true,
    plugins: ['react', 'jsx-a11y', '@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'airbnb',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier',
    ],
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            plugins: ['@typescript-eslint'],
            extends: [
                'plugin:@typescript-eslint/recommended-type-checked',
                'airbnb-typescript',
                'prettier',
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: './tsconfig.json',
            },
        },
    ],
};
