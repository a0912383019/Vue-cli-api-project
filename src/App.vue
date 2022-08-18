<template>
  <div id="app">
    <nav>
      <router-link  activeClass="myactive" to="/weather">Weather</router-link> |
      <router-link  activeClass="myactive" to="/school">KidSchool</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
  }

  .myactive{
    color: cadetblue;
  }
}
</style>
