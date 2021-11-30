<template>
  <div ref="editor" class="text-edtior">

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { uploadCourseImage } from '@/services/course'
import E from 'wangeditor'
export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  mounted () { // 组件已经渲染好 可以初始化操作
    this.initEditor()
  },
  methods: {
    initEditor () {
      const editor = new E(this.$refs.editor as any)
      // 配置 onchange 回调函数
      editor.config.onchange = (value: string) => {
        this.$emit('input', value)
      }
      editor.config.customUploadImg = async function (resultFiles: any, insertImgFn: any) {
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await uploadCourseImage(fd)
        // 上传图片，返回结果，将图片插入到编辑器中
        insertImgFn(data.data.name)
      }
      editor.create()
      editor.txt.html(this.value)
    }
  }
})
</script>
