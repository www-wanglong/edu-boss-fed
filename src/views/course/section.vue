<template>
  <div class="course-section">
    <el-card>
      <div slot="header">

      </div>
      <el-tree
        :data="sections"
        :props="defaultProps"
        :allow-drop="handleAllowDrop"
        @node-drop="handleSort"
        draggable
      >
        <div class="inner" slot-scope="{ node, data }">
          <span>
            {{ node.label }}
          </span>
          <span class="actions" v-if="data.sectionName">
            <el-button>编辑</el-button>
            <el-button>添加课时</el-button>
            <el-button>状态</el-button>
          </span>
          <span class="actions" v-else>
            <el-button>编辑</el-button>
            <el-button
              @click="$router.push({
                name: 'course-video',
                params: {
                  courseId
                },
                query: {
                  sectionId: node.parent.id,
                  lessonId: data.id
                }
              })"
              type="success"
            >上传视频</el-button>
            <el-button>状态</el-button>
          </span>
        </div>
      </el-tree>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getSectionAndLesson, saveOrUpdateSection } from '@/services/course-section'
import { saveOrUpdateLesson } from '@/services/course-lesson'
export default Vue.extend({
  name: 'CourseSection',
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      sections: [],
      defaultProps: {
        children: 'lessonDTOS',
        label: (data: any) => {
          return data.sectionName || data.theme
        }
      }
    }
  },

  created () {
    this.loadSections()
  },

  methods: {
    async loadSections () {
      const { data } = await getSectionAndLesson(this.courseId)
      this.sections = data.data
      console.log(data)
    },

    /**
     * 拖拽节点
     *
     * draggingNode 拖动的节点
     * dropNode 放置的目标节点
     * type 参数有三种情况：'prev'、'inner' 和 'next'
     */
    handleAllowDrop (draggingNode: any, dropNode: any, type: string) {
      return draggingNode.data.sectionId === dropNode.data.sectionId && type !== 'inner'
    },

    async handleSort (before: any, after: any, inner: any, event: any) {
      try {
        const tasks = after.parent.childNodes.map((item: any, index: number) => {
          if (after.data.lessonDTOS) { // 是阶段
            return saveOrUpdateSection({
              id: item.data.id,
              orderNumber: index + 1
            })
          } else { // 更新章节
            return saveOrUpdateLesson({
              id: item.data.id,
              orderNumber: index + 1
            })
          }
        })
        await Promise.all(tasks)
        this.$message.success('排序成功')
      } catch (error) {
        console.log('排序失败', error)
        this.$message.error('排序失败')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 10px;
  border-bottom: 1px solid #ebeef5;
}
::v-deep .el-tree-node__content {
  height: auto;
}
</style>
