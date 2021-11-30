<template>
  <div class="course-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>课程列表</span>
        <el-button
          style="float: right; margin-top: -5px"
          type="primary"
          @click="$router.push({
            name: 'course-create'
          })"
        >添加课程</el-button>
      </div>
      <el-table
        v-loading="isLoading"
        :data="courses"
        style="width: 100%; margin-bottom: 20px"
      >
        <el-table-column prop="id" label="ID" width="100"> </el-table-column>

        <el-table-column prop="courseName" label="名称">
        </el-table-column>
        <el-table-column prop="price" label="价格">
        </el-table-column>
        <el-table-column prop="sortNum" label="排序" width="120">
        </el-table-column>
        <el-table-column prop="status" label="上架状态" width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
              @change="onStatusChange(scope.row)"
              :disabled="scope.row.isStatusLoading"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleContentManage(scope.row)"
              >内容管理</el-button
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
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getQueryCourses, changeState } from '@/services/course'
export default Vue.extend({
  name: 'CourseList',
  data () {
    return {
      courses: [],
      pagination: {
        total: 0,
        currentPage: 1,
        pageSize: 5
      },
      isLoading: true
    }
  },
  created () {
    this.loadCourses()
  },

  methods: {
    async loadCourses () {
      this.isLoading = true
      const { data } = await getQueryCourses({
        ...this.pagination
      })
      data.data.records.forEach((item: any) => {
        item.isStatusLoading = false
      })
      this.isLoading = false
      this.courses = data.data.records
      this.pagination.total = data.data.total
    },

    handleSizeChange (size: number) {
      this.pagination.currentPage = 1
      this.pagination.pageSize = size
      this.loadCourses()
    },

    handleCurrentChange (currentPage: number) {
      this.pagination.currentPage = currentPage
      this.loadCourses()
    },

    async onStatusChange (course: any) {
      course.isStatusLoading = true
      await changeState({
        courseId: course.id,
        status: course.status
      })
      course.isStatusLoading = false
      this.$message.success(`${course.status === 0 ? '下架' : '上架'}成功`)
    },

    handleEdit (course: any) {
      this.$router.push({
        name: 'course-edit',
        params: {
          courseId: course.id
        }
      })
    },

    handleContentManage (course: any) {
      this.$router.push({
        name: 'course-section',
        params: {
          courseId: course.id
        }
      })
    }
  }
})
</script>
