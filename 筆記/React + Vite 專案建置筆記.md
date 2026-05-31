# React + Vite 專案建置筆記

## react vite

- 安裝 : npm create vite@latest my-react-app --template

## 別名

- 安裝 : npm i @types/node -D

- 配置 :
  vite.config.ts

```
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
```

tsconfig.app.json  
tsconfig.node.json

```
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
```

## less 配置 (選用)

- 安裝 : npm install -D less

## sass 配置 (選用)

- 安裝 :  
  npm install sass -D  
  npm install -D sass-embedded

## eslint

https://ithelp.ithome.com.tw/articles/10309086

## css 初始化 (若使用 antd reset.css 就不須而外引入)

- 安裝 : npm install normalize.css
- 配置 : main.tsx
  ```
    import 'normalize.css'
  ```

## react-router

- 安裝 : npm i react-router-dom@v6.3.0

## redux

- 安裝 :
  npm i @reduxjs/toolkit react-redux
  npm i redux-persist
  <!-- npm i redux-promise -->

## axios

- 安裝 : npm install axios@1.1.3

## style components

- 安裝 :  
  npm install styled-components  
  //npm i --save-dev @type/styled-components

## antd

- 安裝 :  
  npm install antd --save

  // 在react 19 使用 npm install @ant-design/v5-patch-for-react-19 --save  
  // 在 react 18 以下使用 npm install @ant-design/icons --save

## antd icon

- 安裝 : npm install @ant-design/icons@5.x --save

## mui

- 安裝 : npm install @mui/material @mui/styled-engine-sc styled-components  
  //版本要一致

## classnames

- 安裝 : npm install classnames //可在 css 中寫 if 決定是否顯

## xlsx

- 安裝 : npm install clsx

## i18n

- 安裝 : npm install i18next react-i18next

## ts-md5

- 安裝 : npm install ts-md5

## 進度條

- 安裝 : npm install nprogress @types/nprogress

## 全局類型宣告

- 檔名 :xxx.d.ts

```
//使用關鍵字 declare
declare interface XXX{
}
```

## qs 物件序列化成URL字串

- 安裝 : npm install qs @types/qs

## ahook 工具庫

- 安裝 : npm install ahook

## react-hook-form + zod 表單組件

- npm install react-hook-form
- npm install zod
- npm install @hookform/resolvers

## react query

npm install @tanstack/react-query

## lodash.debounce

npm install lodash.debounce
npm install @types/lodash.debounce
