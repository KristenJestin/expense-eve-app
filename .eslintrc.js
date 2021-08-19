module.exports = {
    root: true,
    extends: ['@react-native-community', 'prettier'],
    plugins: ['prettier'],
    parserOptions: {
        sourceType: 'module',
    },
    rules: {
        'prettier/prettier': ['error'],
    },
    globals: {
        JSX: true,
    },
}
