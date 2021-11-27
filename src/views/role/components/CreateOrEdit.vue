<template>
  <el-form :model="role">
    <el-form-item label="角色名称" prop="name">
      <el-input v-model="role.name"></el-input>
    </el-form-item>
        <el-form-item label="角色编码" prop="code">
      <el-input v-model="role.code"></el-input>
    </el-form-item>
        <el-form-item label="角色描述" prop="description">
      <el-input
        type="textarea"
        :rows="3"
        v-model="role.description"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button  @click="$emit('cancel')">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import Vue from 'vue'
import { createOrUpdateRole, getRoleById } from '@/services/role'
export default Vue.extend({
  name: 'CreateOrEditRole',
  props: {
    roleId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      role: {
        name: '',
        code: '',
        description: ''
      }
    }
  },
  created () {
    if (this.roleId) {
      this.loadRole()
    }
  },
  methods: {
    async loadRole () {
      const { data } = await getRoleById(this.roleId)
      this.role = data.data
    },
    async onSubmit () {
      await createOrUpdateRole(this.role)
      this.$message.success('创建成功')
      this.$emit('success') // 父子组件通讯
    }
  }
})
</script>
