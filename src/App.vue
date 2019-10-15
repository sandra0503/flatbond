<template>
  <div id="app">
    <header><div class="header__container">flatfair</div></header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Lato:400,700&display=swap");
@import "@/styles/custom.scss";
@import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss";

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

h1 {
  font-family: "Lato", sans-serif;
  font-size: 40px;
  font-weight: 700;
}

header {
  background-color: #6785ff;
  font-family: "Lato", sans-serif;
  font-weight: 700;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  padding: 20px 0;

  .header__container {
    max-width: 1024px;
    margin: auto;
  }
}

main {
  position: relative;
  min-height: calc(100vh - 70px);
  padding-top: 30px;
  margin: 0 20px;
}
</style>
