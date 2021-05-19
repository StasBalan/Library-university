<template>
  <div id="app">
    <div class="app__header">
      <img src="@/assets/logo.png" alt="logo" />
      <p>Library</p>
    </div>

    <div class="main">
      <el-menu
        :router="true"
        :default-active="$route.name"
        class="el-menu-vertical-demo"
      >
        <el-menu-item index="Books" :route="{ name: 'Books' }">
          <i class="el-icon-reading"></i>
          <span>Books</span>
        </el-menu-item>

        <el-menu-item index="Readers" :route="{ name: 'Readers' }">
          <i class="el-icon-user"></i>
          <span>Readers</span>
        </el-menu-item>
    
        <el-menu-item index="Writers" :route="{ name: 'Writers' }">
          <i class="el-icon-notebook-2"></i>
          <span>Writers</span>
        </el-menu-item>

        <el-menu-item index="ReaderBooksAdding" :route="{ name: 'ReaderBooksAdding' }">
          <i class="el-icon-s-operation"></i>
          <span>Add a books to the reader</span>
        </el-menu-item>
      </el-menu>

      <div class="app__content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

.app__header {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #e6e6e6;
}

.app__header img {
  width: 50px;
  height: 50px;
  margin-right: 5px;
}

.app__header p {
  color: #409EFF;
  font-weight: bold;
  font-size: 30px;
}

.main {
  display: flex; 
  height: 100%;
}

.app__content {
  flex-grow: 1;
  padding: 20px;
}

.el-menu {
  width: 250px;
}

.el-menu-item a {
  color: inherit;
}
</style>
