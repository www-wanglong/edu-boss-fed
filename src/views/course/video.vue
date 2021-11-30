<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <div>课程：</div>
        <div>阶段：</div>
        <div>课时：</div>
      </div>
      <el-form label-width="40px">
        <el-form-item label="视频">
          <input
            ref="video-file"
            type="file"
          >
        </el-form-item>
        <el-form-item label="封面">
          <input
            ref="image-file"
            type="file"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleUpload"
          >开始上传</el-button>
          <el-button>返回</el-button>
        </el-form-item>
        <el-form-item>
          <p>视频上传中：{{ uploadPercent }}%</p>
          <p v-if="isUploadSuccess">视频转码中：{{ isTranscodeSuccess ? '完成' : '正在处理，请稍等' }}</p>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from 'vue'
import {
  aliyunImagUploadAddressAdnAuth,
  aliyunVideoUploadAddressAdnAuth,
  getAliyunTransCodePercent,
  transCodeVideo
} from '@/services/aliyun-upload'
export default Vue.extend({
  name: 'CourseVideo',
  data () {
    return {
      uploader: null,
      videoId: null,
      imageUrl: '',
      fileName: '',
      uploadPercent: 0,
      isUploadSuccess: false,
      isTranscodeSuccess: false
    }
  },
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  computed: {
    video () {
      return this.$refs['video-file']
    },
    image () {
      return this.$refs['image-file']
    }
  },
  created () {
    this.initUploader()
  },
  methods: {
    initUploader () {
      this.uploader = new window.AliyunUpload.Vod({
        // 阿里账号ID，必须有值 ，值的来源https://help.aliyun.com/knowledge_detail/37196.html
        userId: 1618139964448548,
        // 上传到点播的地域， 默认值为'cn-shanghai',//eu-central-1,ap-southeast-1
        region: 'cn-shanghai',
        // 分片大小默认1M，不能小于100K
        partSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 开始上传
        onUploadstarted: async (uploadInfo: any) => {
          console.log('onUploadstarted', uploadInfo)
          let uploadArrressAndAuth
          // 1. 获取文件上传凭证
          if (uploadInfo.isImage) {
            // 获取图片上传凭证
            const { data } = await aliyunImagUploadAddressAdnAuth()
            this.imageUrl = data.data.imageUrl
            uploadArrressAndAuth = data.data
          } else {
            // 获取视频上传凭证
            const { data } = await aliyunVideoUploadAddressAdnAuth({
              fileName: uploadInfo.file.name,
              imageUrl: this.imageUrl
            })
            uploadArrressAndAuth = data.data
          }
          // 2. 设置凭证
          this.uploader.setUploadAuthAndAddress(
            uploadInfo,
            uploadArrressAndAuth.uploadAuth,
            uploadArrressAndAuth.uploadAddress.
            uploadArrressAndAuth.imageId || uploadArrressAndAuth.videoId
          )
          // 3. 上传进度
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo: any) {
          console.log('onUploadSucceed', uploadInfo)
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo: any, code: any, message: any) {
          console.log('onUploadFailed')
        },
        // 文件上传进度，单位：字节
        onUploadProgress: (uploadInfo: any, totalSize: any, loadedPercent: any) => {
          if (!uploadInfo.isImage) {
            this.uploadPercent = Math.floor(loadedPercent * 100)
          }
        },
        // 上传凭证超时
        onUploadTokenExpired: function (uploadInfo: any) {
          console.log('onUploadTokenExpired')
        },
        // 全部文件上传结束
        onUploadEnd: async (uploadInfo: any) => {
          this.isUploadSuccess = true
          console.log(uploadInfo)
          console.log({
            lessonId: this.$route.query.lessonId,
            fileId: this.videoId,
            coverImageUrl: this.imageUrl,
            fileName: this.fileName
          })
          const { data } = await transCodeVideo({
            lessonId: this.$route.query.lessonId,
            fileId: this.videoId,
            coverImageUrl: this.imageUrl,
            fileName: this.fileName
          })
          console.log(data)
          // 轮训查询进度
          const timer = setInterval(async () => {
            const { data } = await getAliyunTransCodePercent(this.$route.query.lessonId)
            console.log('转码进度', data)
            if (data.data === 100) {
              window.clearInterval(timer)
              this.isTranscodeSuccess = true
            }
          }, 3000)
        }
      })
    },

    handleUpload () {
      // 获取上传的文件
      this.isUploadSuccess = false
      this.isUploadSuccess = false,
      this.isTranscodeSuccess = false
      const videoFile = (this.video as any).files[0]
      const imageFile = (this.image as any).files[0]
      const uploader = this.uploader as any
      // 将用户所选的文件添加到列表中
      uploader.addFile(imageFile, null, null, null, '{"Vod": {}}')
      uploader.addFile(videoFile, null, null, null, '{"Vod": {}}')

      uploader.startUpload()
    }
  }
})
</script>
