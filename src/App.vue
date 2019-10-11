<template>
  <div id="app">
    <header>flatfair</header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  background-color: #6785ff;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  padding: 20px;
}

main {
  height: 100vh;
  padding-top: 25px;
  background: linear-gradient(110deg, #fff 60%, #fbfbfb 60%);
}
</style>
