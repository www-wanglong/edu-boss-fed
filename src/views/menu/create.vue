<template>
<el-card class="box-card">
  <div>
    <create-or-edit />
  </div>

</el-card>

</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'CreateMenu',
  components: {
    CreateOrEdit
  },
  data () {
    return {

    }
  },
  methods: {
  }
})
</script>

<style lang="scss" scoped></style>
