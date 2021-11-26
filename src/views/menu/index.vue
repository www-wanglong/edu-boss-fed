<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button
          @click="
            $router.push({
              name: 'menu-create',
            })
          "
          >添加菜单</el-button
        >
      </div>
      <el-table :data="menus" stripe style="width: 100%">
        <el-table-column fixed label="编号" width="60" type="index">
        </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="level" label="菜单级数" width="120"> </el-table-column>
        <el-table-column prop="icon" label="菜单图标"> </el-table-column>
        <el-table-column prop="orderNum" label="排序" width="60"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllMenus, deleteMenu } from '@/services/menu'

export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      menus: []
    }
  },
  created () {
    this.loadAllMenus()
  },
  methods: {
    async loadAllMenus () {
      const { data } = await getAllMenus()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    handleEdit (index: number, row: any) {
      console.log(index, row)
    },
    handleDelete (item: any) {
      this.$confirm('确认删除吗？', '删除tishi', {})
        .then(async () => {
          const { data } = await deleteMenu(item.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadAllMenus()
          }
        }).catch(() => {
          this.$message.info('已取消删除')
        })
    }
  }
})
</script>

<style lang="scss" scoped></style>
