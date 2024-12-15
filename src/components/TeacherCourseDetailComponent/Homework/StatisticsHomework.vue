<template>
  <div class="statistics-homework-container">
    <el-table :data="homeworkList" style="width: 90%; margin-top: 20px">
      <el-table-column label="作业编号" prop="homeworkNum" width="300"></el-table-column>
      <el-table-column label="作业标题" prop="content" width="300"></el-table-column>
      <el-table-column label="提交人数" prop="totalSubmit" width="300"></el-table-column>
      <el-table-column label="均分" prop="avgGrade" width="300"></el-table-column>
      <el-table-column label="查看统计">
        <template #default="{ row }">
          <el-button type="primary" @click="handleStatistics(row)">查看统计</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="total-chart-container">
      <div class="chart-conainer pip-chart-container" style="height: 400px; width: 1000px">
        <v-chart
          autoresize
          :option="allScoreLineChartOption"
          style="height: 400px; width: 1100px"
        ></v-chart>
      </div>
    </div>
  </div>

  <el-dialog
    class="statistics-homework-content-dialog"
    v-model="statisticsHomeworkDialogVisible"
    width="90vw"
    height="85vh"
    title="作业成绩统计"
  >
    <div class="statistics-dialog-container" style="width: 85vw">
      <div class="chart-conainer pip-chart-container" style="width: 70vh">
        <v-chart
          autoresize
          :option="chartOptions"
          style="height: 400px; width: 700px"
        ></v-chart>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { getHomeworkStatics } from "@/api/CoursePageApi"
import axios from "axios";

// 获取路由信息
const route = useRoute();
const courseId = route.params.id;
const statisticsHomeworkDialogVisible = ref(false);
const homeworkList = ref([]);
const chartOptions = ref({
  title: {
    text: "分数比例分布",
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: "50%",
      data: [
        { value: 1048, name: "90 < score <= 100" },
        { value: 735, name: "80 < score <= 90" },
        { value: 580, name: "70 < score <= 80" },
        { value: 484, name: "60 < score <= 70" },
        { value: 300, name: "score <= 60" },
      ], // 默认值
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});

const allScoreLineChartOption = ref({
  title: {
    text: "作业均分变化趋势",
    subtext: "作业成绩分析",
    left: "center",
  },
  tooltip: {
    trigger: "axis", // 触发类型为轴触发
    axisPointer: {
      type: "line", // 直线指示器
    },
  },
  legend: {
    data: ["均分"],
    top: "10%",
  },
  xAxis: {
    type: "category", // 横轴为类目轴
    boundaryGap: false, // 从零开始
    data: [], // 动态填充作业编号
  },
  yAxis: {
    type: "value", // 纵轴为数值轴
    axisLabel: {
      formatter: "{value}", // 显示格式，显示均分
    },
  },
  series: [
    {
      name: "均分", // 系列名称
      type: "line", // 图表类型：折线图
      data: [], // 动态填充均分数据
      smooth: true, // 平滑曲线
    },
  ],
});

// 获取作业列表和统计数据
const fetchHomeworkList = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/teacher/course/${courseId}/homeworkList`
    );
    
    const homeworkData = response.data.homeworkList;
    const homeworkStats = response.data.homeworkStats;

    // 将统计信息与作业数据结合
    homeworkList.value = homeworkData.map(homework => {
      const stats = homeworkStats.find(stat => stat.homeworkNum === homework.homeworkNum);
      const totalSubmit = stats ? `${stats.alreadySubmit}/${stats.totalNum}` : "0/0";
      const avgGrade = stats ? stats.avgGrade : 0;
      return { ...homework, totalSubmit, avgGrade };
    });

    // 更新折线图数据
    allScoreLineChartOption.value.xAxis.data = homeworkList.value.map(homework => homework.homeworkNum);
    allScoreLineChartOption.value.series[0].data = homeworkList.value.map(homework => homework.avgGrade);

  } catch (error) {
    ElMessage.error("获取作业列表失败，请稍后再试");
  }
};

// 处理查看统计按钮点击
async function handleStatistics(row) {
  const response = await getHomeworkStatics(row.courseId, row.homeworkNum);
  const stats = response;

  statisticsHomeworkDialogVisible.value = true;

  // 更新饼图数据
  chartOptions.value.series[0].data = [
    { value: stats.grade_100_90, name: "100 < score <= 90" },
    { value: stats.grade_90_80, name: "90 < score <= 80" },
    { value: stats.grade_80_70, name: "80 < score <= 70" },
    { value: stats.grade_70_60, name: "70 < score <= 60" },
    { value: stats.grade_60_0, name: "score <= 60" },
  ];
}

onMounted(() => {
  fetchHomeworkList();
});
</script>

<style lang="scss" scoped>
.statistics-homework-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 10px;
  gap: 30px;
}

.statistics-homework-content-dialog {
  height: 75vh;
}

.statistics-dialog-container {
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.avarage-score-container {
  font-size: 1.8rem;
}
</style>
