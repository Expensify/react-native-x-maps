module.exports = {
    extends: [
        'eslint:recommended',
        'airbnb',
        'plugin:react/recommended',
        'jsx-a11y',
        'plugin:@typescript-eslint/recommended-type-checked',
        'airbnb-typescript',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    plugins: ['react', 'jsx-a11y', '@typescript-eslint'],
    root: true,
};
