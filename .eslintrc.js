// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: "babel-eslint",
    parserOptions: {
        sourceType: "module"
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: ["standard", "eslint:recommended"],
    // required to lint *.vue files
    plugins: [
        "html"
    ],
    // add your custom rules here
    "rules": {
        //"off"或0 -关闭规则
        //"warn" 或1 - 开启规则, 使用警告 程序不会退出
        //"error"或2 - 开启规则, 使用错误 程序退出
        "indent": ["error", 4],
        //分号
        "eqeqeq": "off",
        "no-useless-escape": "off",
        "brace-style": 0,//大括号风格
        "curly": ["error", "all"], //[2, "all"],//必须使用 if(){} 中的{}
        "no-new": "off",
        "no-return-assign": "warn",//return 语句中不能有赋值表达式
        
        "handle-callback-err": 0,
        "padded-blocks": 0,
        "no-duplicate-imports": 0,
        "operator-linebreak": 0,
        "no-extend-native": 0,
        "no-sequences": 0,
        
        "no-debugger": 0,
        "no-eval": 0,
        "comma-dangle": ["error", "never"],
        "arrow-spacing": ["error", { "before": true, "after": true }],
        "no-undef": "error",
        "no-console": 0,
        "space-before-function-paren": ["error", "always"],
        "keyword-spacing": ["error", { "before": true, "after": true }],
        "space-before-blocks": ["error", "always"],
        "spaced-comment": ["error", "always", {"exceptions": ['-', '+']}],
        "quotes": ["error", "double"],
        "semi": ["error", "never"],
        "no-multiple-empty-lines": ["error", {"max": 1}],
        "generator-star-spacing": ["error", { "before": true, "after": true }],
        "object-curly-newline": ["error", "always"],
        "linebreak-style": ["error", "windows"],
        "eol-last": ["error", "windows"]
    },
    globals: {
        "_": true,
        "arguments": true,
        "ActiveXObject": true
    }
}
