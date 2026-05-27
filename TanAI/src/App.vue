<script setup>
// Dashboard 主應用
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style>
/* 全域樣式重置 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: var(--sb-canvas-warm);
  color: var(--sb-text);
  letter-spacing: -0.01em;
}

#app {
  width: 100%;
  min-height: 100vh;
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--sb-green-uplift);
  border-radius: 3px;
  opacity: 0.5;
}
</style>

