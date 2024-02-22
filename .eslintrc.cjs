module.exports = {
  env: {
    browser: true, // код выполняется в браузере
    es2021: true, // поддержка современных возможностей ES2021
    node: true, // поддержка Node.js для инструментов сборки
  },
  extends: [
    'eslint:recommended', // базовые рекомендуемые правила ESLint
    'plugin:react/recommended', // рекомендуемые правила для React
    'plugin:@typescript-eslint/recommended', // правила для TypeScript
  ],
  parser: '@typescript-eslint/parser', // парсер TypeScript для ESLint
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // поддержка JSX для React
    },
    ecmaVersion: 12, // поддержка синтаксиса ES2021
    sourceType: 'module', // поддержка модулей ES6
  },
  plugins: [
    'react', // плагин для правил React
    '@typescript-eslint', // плагин для интеграции TypeScript
  ],
  rules: {
    // Пользовательские правила можно добавить здесь
    indent: ['error', 2, { SwitchCase: 1 }], // отступ в 2 пробела
    'linebreak-style': ['error', 'unix'], // стиль перевода строки - unix
    quotes: ['error', 'single'], // использование одинарных кавычек
    semi: ['error', 'always'], // требование точки с запятой в конце
    'react/react-in-jsx-scope': 'off', // для новых версий React, где импорт React не требуется
    'react/prop-types': 'off', // если вы используете TypeScript, вам не нужны prop-types
  },
  settings: {
    react: {
      version: 'detect', // автоматическое определение версии React для правил плагина
    },
  },
};
