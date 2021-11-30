<template>
  <create-or-update is-edit :courseId="courseId" />
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrUpdate from './components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'CourseEdit',
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  components: {
    CreateOrUpdate
  },
  data () {
    return {

    }
  },
  methods: {

  }
})
</script>
