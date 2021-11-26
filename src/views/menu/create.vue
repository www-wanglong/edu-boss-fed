<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>添加菜单</span>
  </div>
  <div>
<el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="菜单名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="菜单路径">
      <el-input v-model="form.href"></el-input>
    </el-form-item>
    <el-form-item label="展示图标">
      <el-input v-model="form.icon"></el-input>
    </el-form-item>
     <el-form-item label="上级菜单">
      <el-select v-model="form.parentId" placeholder="请选择上级菜单">
        <el-option :value="-1" label="无上级菜单"></el-option>
        <el-option
          :label="item.name"
          :value="item.id"
          :key="item.id"
          v-for="item in parentMenuList"
        >

        </el-option>

      </el-select>
    </el-form-item>
    <el-form-item label="菜单描述">
      <el-input type="textarea" v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item label="是否显示">
      <el-radio-group v-model="form.shown">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="排序">
      <el-input-number v-model="form.orderNum" :min="1" label="描述文字"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
  </div>
</el-card>

</template>

<script lang="ts">
import Vue from 'vue'
import { createOrUpdateMenu, getEditMenuInfo } from '@/services/menu'

export default Vue.extend({
  name: 'CreateMenu',
  data () {
    return {
      form: {
        parentId: -1,
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: false
      },
      parentMenuList: []
    }
  },
  created () {
    this.loadMenuInfo()
  },
  methods: {
    async onSubmit () {
      const { data } = await createOrUpdateMenu(this.form)
      if (data.code === '000000') {
        this.$message.success('创建成功')
        this.$router.back()
      }
    },
    async loadMenuInfo () {
      const { data } = await getEditMenuInfo()
      if (data.code === '000000') {
        this.parentMenuList = data.data.parentMenuList
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
