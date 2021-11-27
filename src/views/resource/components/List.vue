<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form :inline="true" :model="form" ref="form"  class="demo-form-inline">
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryId">
          <el-select
            clearable
            v-model="form.categoryId"
            placeholder="资源分类"
          >
            <el-option
              :label="item.name"
              :value="item.id"
              :key="item.id"
              v-for="item in resourceCategories"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button :disabled="isLoading" type="primary" @click="onSubmit">查询</el-button>
          <el-button :disabled="isLoading" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table v-loading="isLoading" :data="resources" style="width: 100%; margin-bottom: 20px">
      <el-table-column fixed label="编号" width="60" type="index">
      </el-table-column>
      <el-table-column prop="name" label="名称" width="180"> </el-table-column>
      <el-table-column prop="url" label="路径" width="180"> </el-table-column>
      <el-table-column prop="updatedTime" label="更新时间" width="180">
      </el-table-column>
      <el-table-column prop="description" label="描述" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
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
      :current-page.sync ="pagination.current"
      :page-sizes="[5, 10, 20, 100]"
      :page-size="pagination.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    >
    </el-pagination>
  </el-card>
</template>
<script lang="ts">
import Vue from 'vue'
import { getResourcePages } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'
export default Vue.extend({
  name: 'ResourceList',
  data () {
    return {
      resources: [], // 资源列表
      pagination: {
        total: 0,
        current: 1,
        size: 5
      },
      form: {
        name: '',
        url: '',
        categoryId: null
      },
      isLoading: true,
      resourceCategories: [] // 资源分类列表
    }
  },
  created () {
    this.loadResourcePages()
    this.loadResourceCategories()
  },
  methods: {

    onSubmit () {
      this.loadResourcePages()
    },

    onReset () {
      this.$refs.form.resetFields()
      this.pagination.current = 1
      this.loadResourcePages()
    },

    async loadResourcePages () {
      this.isLoading = true
      const { data } = await getResourcePages({
        current: this.pagination.current,
        size: this.pagination.size,
        ...this.form
      })
      this.isLoading = false
      this.pagination.total = data.data.total
      this.resources = data.data.records
    },

    async loadResourceCategories () {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },

    handleSizeChange (size: number) {
      this.pagination.current = 1
      this.pagination.size = size
      this.loadResourcePages()
    },
    handleCurrentChange (currentPage: number) {
      this.pagination.current = currentPage
      this.loadResourcePages()
    },
    handleEdit (item: any) {
      console.log(item)
    },
    handleDelete (item: any) {
      console.log(item)
    }
  }
})
</script>
