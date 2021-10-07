<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <button type="button" class="btn btn-primary">Primary</button>
  <button type="button" class="btn btn-secondary">Secondary</button>
  <button type="button" class="btn btn-success">Success</button>
  <button type="button" class="btn btn-danger">Danger</button>
  <button type="button" class="btn btn-warning">Warning</button>
  <button type="button" class="btn btn-info">Info</button>
  <button type="button" class="btn btn-light">Light</button>
  <button type="button" class="btn btn-dark">Dark</button>

  <button type="button" class="btn btn-link">Link</button>
  <router-view/>
</template>

<style lang="scss">
// ~ 與 ../node_modules 意思相同，~ 指向 webpack 根目錄
// 匯入自定義的 SCSS 元件，內容為客製化的 bootstrap，載入 SCSS 可忽略檔名類型
@import "./assets/all";
</style>
