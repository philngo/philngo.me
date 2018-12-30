<template>
  <div id="app">
    <div id="aside">
      <h1 id="name">
        <router-link class="black" to="/">Phil Ngo</router-link>
      </h1>
      <ul id="menu">
        <li><router-link class="black" to="/writing">writing</router-link></li>
        <li><router-link class="black" to="/personal">personal</router-link></li>
        <li><router-link class="black" to="/professional">professional</router-link></li>
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

<style>
/* App-wide styles are fine here */
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

#name {
  margin-top: 0;
  font-size: 2.7rem;
  font-weight: 300;
}

a {
  color: black;
  text-decoration: none;
}
a:hover {
  color: #aa0505;
}
a.red {  /* always red */
  color: #aa0505;
}
a.black:hover {  /* always black */
  color: black;
}

#menu {
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
