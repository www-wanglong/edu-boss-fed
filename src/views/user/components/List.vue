<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form :model="filterParams" ref="filter-form">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="filterParams.phone"></el-input>
        </el-form-item>
        <el-form-item label="注册时间" prop="rangeDate">
          <el-date-picker
            v-model="filterParams.rangeDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item>
          <el-button :disabled="isLoading" @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleQuery" :disabled="isLoading"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-table
      v-loading="isLoading"
      :data="users"
      style="width: 100%; margin-bottom: 20px"
    >
      <el-table-column prop="id" label="用户ID" width="100"> </el-table-column>
      <el-table-column prop="name" label="头像" width="80">
        <template slot-scope="scope">
          <img
            width="30px"
            :src="
              scope.row.portrait ||
              'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
            "
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="用户名" width="120">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="120">
      </el-table-column>
      <el-table-column prop="createTime" label="注册时间" width="120">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleSelectRole(scope.row)"
          >分配角色</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :disabled="isLoading"
      :current-page.sync="pagination.current"
      :page-sizes="[5, 10, 20, 100]"
      :page-size="pagination.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    >
    </el-pagination>
    <el-dialog title="分配角色" :visible.sync="dialogFormVisible">
      <el-select v-model="selectedRoleIds" multiple placeholder="请选择">
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAllocRole"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { getUserPages } from '@/services/user'
import { getAllRoles, allocateUserRoles, getUserRoles } from '@/services/role'

export default Vue.extend({
  name: 'UserList',
  data () {
    return {
      users: [],
      pagination: {
        total: 0,
        current: 1,
        size: 5
      },
      filterParams: {
        phone: '',
        rangeDate: ''
      },
      isLoading: true,
      dialogFormVisible: false,
      roles: [],
      selectedRoleIds: [],
      currentUser: {}
    }
  },

  created () {
    this.loadUsers()
  },

  methods: {

    async loadUsers () {
      this.isLoading = true
      const { data } = await getUserPages({
        current: this.pagination.current,
        size: this.pagination.size,
        ...this.filterParams
      })
      this.isLoading = false
      this.pagination.total = data.data.total
      this.users = data.data.records
    },

    handleSizeChange (size: number) {
      this.pagination.current = 1
      this.pagination.size = size
      this.loadUsers()
    },

    handleCurrentChange (currentPage: number) {
      this.pagination.current = currentPage
      this.loadUsers()
    },

    handleEdit (item: any) {
      console.log(item)
    },

    handleQuery () {
      this.pagination.current = 1
      this.loadUsers()
    },

    handleReset () {
      (this.$refs['filter-form'] as Form).resetFields()
      this.loadUsers()
    },

    handleDelete (item: any) {
      console.log(item)
    },

    async handleSelectRole (row: any) {
      this.currentUser = row
      // 加载全部角色
      const { data } = await getAllRoles()
      const { data: { data: userRoles } } = await getUserRoles((this.currentUser as any).id)
      this.selectedRoleIds = userRoles.map((item: any) => item.id)
      this.roles = data.data
      this.dialogFormVisible = true
    },

    async handleAllocRole () {
      await allocateUserRoles({
        userId: (this.currentUser as any).id,
        roleIdList: this.selectedRoleIds
      })
      this.$message.success('分配成功')
      this.dialogFormVisible = false
    }
  }
})
</script>
