// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    // parser: "babel-eslint",
    "parserOptions": {
        "parser": "babel-eslint",
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: ["standard", "eslint:recommended", "plugin:vue/essential"],
    // required to lint *.vue files
    plugins: [
        "vue"
    ],
    // add your custom rules here
    "rules": {
        //"off"或 0 -关闭规则
        //"warn" 或 1 - 开启规则, 使用警告 程序不会退出
        //"error"或 2 - 开启规则, 使用错误 程序退出
        "indent": [2, 4],
        //分号
        "eqeqeq": 0,
        "no-useless-escape": 0,
        "brace-style": 0,//大括号风格
        "curly": [2, "all"], //[2, "all"],//必须使用 if(){} 中的{}
        "no-new": 0,
        "no-return-assign": "warn",//return 语句中不能有赋值表达式

        "handle-callback-err": 0,
        "padded-blocks": 0,
        "no-duplicate-imports": 0,
        "operator-linebreak": 0,
        "no-extend-native": 0,
        "no-sequences": 0,

        "no-debugger": 0,
        "no-eval": 0,
        "comma-dangle": [2, "never"],
        "arrow-spacing": [2, { "before": true, "after": true }],
        "no-undef": 2,
        "no-console": 0,
        "space-before-function-paren": [2, "always"],
        "keyword-spacing": [2, { "before": true, "after": true }],
        "space-before-blocks": [2, "always"],
        "spaced-comment": [2, "always", {"exceptions": ['-', '+']}],
        "quotes": [2, "double"],
        "semi": [2, "never"],
        "no-multiple-empty-lines": [2, {"max": 1}],
        "generator-star-spacing": [2, { "before": true, "after": true }],
        "object-curly-newline": ["error", { "consistent": true, "minProperties": 2 }],
        "object-curly-spacing": [2, "always"],
        "key-spacing": [2, { "beforeColon": false, "afterColon": true }],
        "linebreak-style": [2, "windows"],
		"eol-last": [2, "windows"],
        "object-property-newline": [2, {}],
        "vue/html-indent": [2, 4, {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }],
        "no-control-regex": 0
        // "vue/html-closing-bracket-newline": ["error", {
        //     "multiline": "always"
        // }],
        // "vue/max-attributes-per-line": ["error", {
        //     "singleline": 100,
        //     "multiline": {
        //       "max": 1,
        //       "allowFirstLine": true
        //     }
        // }]
    },
    globals: {
        "_": true,
        "arguments": true,
        "ActiveXObject": true,
        "AndroidLogin": true
    }
}
