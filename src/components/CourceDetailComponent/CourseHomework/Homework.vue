<template>
  <div class="homework-table">
    <el-table :data="paginatedHomeworks" style="width: 100%">
      <el-table-column prop="title" label="作业标题" width="180">
        <template v-slot="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="startDate" label="作业开始" width="150" />
      <el-table-column prop="endDate" label="作业截止" width="150" />
      <el-table-column prop="submitted" label="提交人数" width="100" />
      <el-table-column prop="submissionTime" label="提交时间" width="180" />
      <el-table-column prop="score" label="得分" width="100" />
      <el-table-column prop="reviewStatus" label="批改状态" width="100" />
      <el-table-column label="操作" width="200">
        <template v-slot="{ row }">
          <el-button type="text" @click="viewFile(row.fileUrl)">查看</el-button>
          <el-button type="text" @click="openSubmitDialog(row)">提交</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页控件 -->
    <!-- 分页控件 -->
<div style="position: fixed; bottom: 0; width: 100%; text-align: center;  display: flex; justify-content: center;align-items: center;">
  <el-pagination
    background
    layout="prev, pager, next"
    :total="homeworks.length"
    :page-size="pageSize"
    :current-page.sync="currentPage"
    @current-change="handlePageChange"
  ></el-pagination>
</div>

    <!-- 提交作业的弹窗 -->
    <el-dialog title="交作业" v-model="dialogVisible" width="600px">
      <el-form>
        <el-form-item label="作业内容：" label-width="80px">
          <el-input
            type="textarea"
            v-model="homeworkContent"
            placeholder="请输入3000字以内的作业内容"
            rows="6"
          ></el-input>
        </el-form-item>

        <el-form-item label="上传文件：" label-width="80px">
          <el-upload
            class="upload-demo"
            action="/upload"
            :limit="1"
            :on-success="handleUploadSuccess"
            :on-remove="handleFileRemove"
            :file-list="fileList"
            accept=".ppt, .pptx, .doc, .docx, .pdf, .txt, .xls, .xlsx, .jpg, .jpeg, .png, .bmp, .gif, .mp3, .mp4, .avi, .wmv, .mov, .rmvb, .flv, .f4v, .rar, .zip"
          >
            <el-button size="small" type="primary">上传文件</el-button>
            <div slot="tip" class="el-upload__tip">
              附件支持ppt, pptx, doc, docx, pdf, txt, xls, xlsx, jpg, jpeg, png, bmp, gif, mp3, mp4, avi, wmv, mov, rmvb, flv, f4v, rar, zip格式，其他格式附件请压缩后进行上传。
            </div>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitHomework">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'CourseHomework',
  setup() {
    const homeworks = ref([
      {
        title: '2024-2025-1 实验报告2',
        startDate: '2024-10-01',
        endDate: '2024-11-01',
        submitted: '60/67',
        submissionTime: '2024-11-06 21:50:46',
        score: '未公布成绩',
        reviewStatus: '未批改',
        fileUrl: '/2411.02310v1.pdf',
      },
      {
        title: '2024-2025-1 作业1',
        startDate: '2024-10-01',
        endDate: '2024-10-20',
        submitted: '62/67',
        submissionTime: '2024-10-22 23:51:14',
        score: '未公布成绩',
        reviewStatus: '未批改',
        fileUrl: '/2411.02310v1.pdf',
      },
    ]);

    const pageSize = 5;
    const currentPage = ref(1);

    const dialogVisible = ref(false);
    const homeworkContent = ref('');
    const fileList = ref([]);

    const paginatedHomeworks = computed(() => {
      const start = (currentPage.value - 1) * pageSize;
      return homeworks.value.slice(start, start + pageSize);
    });

    const viewFile = (fileUrl) => {
      window.open(fileUrl, '_blank');
    };

    const openSubmitDialog = (row) => {
      console.log('Attempting to open submit dialog');
      dialogVisible.value = true;
      
      console.log('Dialog visible status:', dialogVisible.value); 
      homeworkContent.value = ''; // 清空之前的内容
      fileList.value = []; // 清空之前的上传文件
    };

    const handleUploadSuccess = (response, file, fileList) => {
      console.log('上传成功', response, file, fileList);
    };

    const handleFileRemove = (file, fileList) => {
      console.log('文件移除', file, fileList);
    };

    const submitHomework = () => {
      if (!homeworkContent.value) {
        alert('请填写作业内容');
        return;
      }
      console.log('作业内容:', homeworkContent.value);
      console.log('上传文件列表:', fileList.value);
      dialogVisible.value = false; // 提交后关闭对话框
    };

    const handlePageChange = (page) => {
      currentPage.value = page;
    };

    return {
      homeworks,
      pageSize,
      currentPage,
      dialogVisible,
      homeworkContent,
      fileList,
      paginatedHomeworks,
      viewFile,
      openSubmitDialog,
      handleUploadSuccess,
      handleFileRemove,
      submitHomework,
      handlePageChange,
    };
  },
};
</script>

<style scoped>
.homework-table {
  margin: 20px;
}
</style>