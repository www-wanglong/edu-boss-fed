<template>
  <el-container>
    <el-aside width="200px">
      <app-aside />
    </el-aside>
    <el-container>
      <el-header>
        <app-header />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'

export default Vue.extend({
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  }
})

</script>

<style lang="scss" scoped>
.el-container {
  min-height: 100vh;
  min-width: 980px;
}
.el-aside {
  background: #b3c0d1;
}
.el-header {
  background: #ffffff;
}
.el-main {
  background: #e9eef3;
}
</style>
