<template>
  <div>
    <course-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CourseList from './components/List.vue'

export default Vue.extend({
  name: 'CourceIndex',
  components: {
    CourseList
  }
})
</script>

<style lang="scss" scoped>

</style>
