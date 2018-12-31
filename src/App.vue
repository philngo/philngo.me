<template>
  <div id="app">
    <div id="nav">
      <h1 id="name">
        <router-link class="black" to="/">Phil Ngo</router-link>
      </h1>
      <div class="catchphrase">
       &gt;&gt;&gt; import this
      </div>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  display: grid;
  grid-template-columns: 230px 1fr;
  grid-template-rows: 100%;
  grid-template-areas:
    "nav content";
  height: 100vh;
}
@media screen and (max-width: 900px) {
  #app {
    grid-template-columns: auto;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "nav"
      "content";
    height: auto;
  }
}

#nav {
  padding: 48px 30px;
  grid-area: nav;
  background-color: #f5f8f9;
}
@media screen and (max-width: 900px) {
  #nav {
    padding: 40px 40px;
  }
}

#content {
  grid-area: content;
  overflow-y: auto;
  padding: 80px 150px;
}
@media screen and (max-width: 900px) {
  #content {
    padding: 40px;
  }
}

#name {
  margin: 0;
  font-size: 2.7rem;
  font-weight: 300;
}
@media screen and (max-width: 900px) {
  #name {
    font-size: 2.0rem;
  }
}

.catchphrase {
  color: #777;
  font-family: Consolas, monaco, monospace; font-size: 14px;
}

#menu {
  list-style: none;
  padding-left: 0;
  margin: 20px 0;
}
@media screen and (max-width: 900px) {
  #menu {
    margin: 0;
  }
}

/* App-wide styles go here */

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

</style>
