<template>
  <div id="app">
    <div id="aside">
      <h1>
        <router-link to="/">Phil Ngo</router-link>
      </h1>
      <ul>
        <li><router-link to="/writing">writing</router-link></li>
        <li><router-link to="/personal">personal</router-link></li>
        <li><router-link to="/professional">professional</router-link></li>
      </ul>
    </div>
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import '@/assets/global.css'
export default {
  name: 'App'
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  display: grid;
  grid-template-columns: 230px 1fr;
  grid-template-rows: 100%;
  grid-template-areas: "aside content";
  height: 100vh;
}

#aside {
  padding: 48px 30px;
  grid-area: aside;
  background-color: #f5f8f9;
}

h1 {
  margin-top: 0;
  font-size: 2.7rem;
  font-weight: 300;
}

a {
  color: black;
  text-decoration: none;
}

ul {
  list-style: none;
  padding-left: 0;
  margin: 20px 0;
}

#content {
  grid-area: content;
  overflow-y: auto;
  padding: 80px 150px;
}

</style>
