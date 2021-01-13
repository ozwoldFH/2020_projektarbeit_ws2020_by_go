module.exports = {
    parser: "babel-eslint",
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        jest: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        indent: ["error", 4, { SwitchCase: 2 }],
        "linebreaker-style": 0,
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "no-console": [
            "warn", 
            { allow: ["clear", "info", "error", "dir", "trace"] }
        ],
    },
};