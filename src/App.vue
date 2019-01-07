<template>
  <div id="app">
    <div id="nav">
      <div id="nav-header">
        <h1 id="name">
          <router-link class="black" to="/">Phil Ngo</router-link>
        </h1>
        <div id="catchphrase">
          <router-link :to="{ name: 'import-this'}">
            &gt;&gt;&gt; import this
          </router-link>
        </div>
      </div>
      <div id="nav-body">
        <ul id="menu">
          <li><router-link class="black" to="/writing">writing</router-link></li>
          <li><router-link class="black" to="/personal">personal</router-link></li>
          <li><router-link class="black" to="/professional">professional</router-link></li>
        </ul>
      </div>
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
  grid-template-areas:
    "nav content";
  height: 100vh;
}

#nav {
  padding: 48px 30px;
  grid-area: nav;
  background-color: #f5f8f9;
}

#nav-body {
  padding-top: 20px;
}

#name {
  margin: 0;
  font-size: 2.7rem;
  font-weight: 300;
}

#catchphrase > a {
  color: #777;
  font-family: Consolas, monaco, monospace;
}

#menu {
  list-style: none;
  padding-left: 0;
  margin: 20px 0;
}

#menu >>> .black.router-link-active {
  font-weight: 600;
}

#menu >>> .black:hover {
  font-weight: 600;
  transition: 200ms ease font-weight;
}

#content {
  grid-area: content;
  overflow-y: auto;
  padding: 80px 12%;
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

  #nav {
    padding: 20px 6%;
    display: flex;
    justify-content: space-between;
  }

  #nav-body {
    padding: 0 0 0 20px;
  }

  #name {
    font-size: 2.0rem;
  }

  #menu {
    margin: 0;
  }

  #content {
    padding: 20px 6%;
  }
}
</style>
