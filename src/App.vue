<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import request from '@/utils/request'

request({
  method: 'GET',
  url: 'boss'
}).then(res => console.log(res))

export default Vue.extend({
  data () {
    return {
      a: 1
    }
  },
  methods: {
    test () {
      return ''
    }
  }
})
</script>
<style lang="scss" scoped>
  .text {
    color: $success-color;
  }
</style>
<!--
<script>

function testable (target) {
  target.isTestable = true
}

@testable
class MyTestClass {

}

console.log(MyTestClass.isTestable)

</script>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

// 类装饰器
@Component
export default class App extends Vue {
  a = 1
  b = '2'

  test () {
    console.log(this.a)
  }
}
</script>

<script lang="ts">
// import Vue from 'vue'

// export default Vue.extend({
//   data () {
//     return {
//       a: 1
//     }
//   },
//   methods: {
//     test () {
//       return ''
//     }
//   }
// })
// </script>

-->
