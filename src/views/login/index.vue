<template>
  <div class="login">
    <el-form
      class="login-form"
      label-position="top"
      ref="form"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="手机号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="onSubmit">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}
.login-btn {
  width: 100%;
}
</style>
